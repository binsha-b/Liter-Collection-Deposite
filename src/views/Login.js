import React, {useState} from 'react';
import {observer} from 'mobx-react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {loginUser} from '../api';
import Button from '../common/Button';
import Input from '../common/InputOld';
import {appFont} from '../utils/theme';
import userStore from '../stores/userStore';
import {FONT_FAMILY} from '../assets/fonts';

const Login = ({navigation}) => {
  const {setUser} = userStore;
  const insets = useSafeAreaInsets();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setloading] = useState(false);

  const [type, setType] = useState('Supervisor');

  const onSubmit = async () => {
    Keyboard.dismiss();
    if (!username && !password) {
      showMessage({
        message: 'Validation Error',
        description:
          'Username and password cannot be empty. Please provide a value',
      });
      return false;
    }
    if (!username) {
      showMessage({
        message: 'Validation Error',
        description: 'Username  cannot be empty. Please provide a value',
      });
    }
    if (!password) {
      showMessage({
        message: 'Validation Error',
        description: 'Password cannot be empty. Please provide a value',
      });
      return false;
    }

    try {
      setloading(true);

      const body = {
        username: username,
        password,
        api_token: 'test',
      };

      let {data} = await loginUser(body);

      if (data === 'Invalid login details') {
        setloading(false);
        showMessage({
          message: data,
          type: 'danger',
        });

        return false;
      }
      const {user_details} = data;

      if (user_details.length) {
        let user = user_details[0];
        if (user.login_type === 'Supervisor') {
          await AsyncStorage.setItem('token', user.api_token);
          setUser(user);

          navigation.replace('Home', {screen: 'SupervisorStack'});
          return false;
        }
      }

      setloading(false);
    } catch (error) {
      //console.error(error);
      showMessage({
        message: 'Something went wrong !',
        description: '' + error,
        type: 'danger',
      });
      setloading(false);
    }

    return false;

    // if (type === 'Supervisor') {
    //   navigation.replace('Home');
    // }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top ? insets.top : 0,
      }}>
      <View
        style={{
          flex: 0.45,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          style={{
            width: scale(152),
            height: scale(93),
          }}
          source={require('../assets/images/logoUp.png')}
        />
      </View>
      <KeyboardAvoidingView
        style={{
          flex: 0.35,
          backgroundColor: '#fff',
        }}>
        <View>
          <Input
            inputStyle={{
              minHeight: scale(48),
              backgroundColor: '#f1f3f7',
              color: '#686E82',
            }}
            placeholder={'Username'}
            value={username}
            onChangeText={setUsername}
            placeholderTextColor={'#686E82'}
          />
          <Input
            inputStyle={{
              minHeight: scale(48),
              backgroundColor: '#f1f3f7',
              marginVertical: scale(16),
              color: '#686E82',
            }}
            placeholder={'Password'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#686E82'}
          />
        </View>
        <View style={{marginHorizontal: scale(16)}}>
          <Button onPress={onSubmit} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text
                style={{
                  fontSize: scale(15),
                  color: '#fff',
                  fontFamily: FONT_FAMILY.medium,
                }}>
                Login
              </Text>
            )}
          </Button>
        </View>
        <TouchableOpacity
          style={{alignSelf: 'center'}}
          disabled={loading}
          hitSlop={{top: 10, bottom: 10, left: 15, right: 10}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(12),
              marginTop: scale(16),
              textAlign: 'center',
              color: '#323232',
            }}>
            {'Forgot Password?'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </View>
  );
};

export default observer(Login);
