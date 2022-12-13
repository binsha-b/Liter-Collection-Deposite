import React, {memo, useState} from 'react';
import {
  Alert,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';
import {myDefaultTheme} from '../utils/theme';
import {observer} from 'mobx-react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale, moderateScale} from 'react-native-size-matters';
import {appFont} from '../utils';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../common/Button';
import userStore from '../stores/userStore';
import {FONT_FAMILY} from '../assets/fonts';


const {height} = Dimensions.get('window');
const {colors} = myDefaultTheme;

const AccountCard = memo(({name, icon, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.45}
      style={styles.accountContainer}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            padding: scale(9),
            borderRadius: scale(10),
            backgroundColor: colors.secondary2,
            alignSelf: 'flex-start',
          }}>
          {/* <Feather name={icon} color={colors.primary} size={scale(19)} /> */}
          <Image
            resizeMode="contain"
            source={icon}
            style={[styles.cardicons, {tintColor: colors.primary}]}
          />
        </View>
        <Text style={styles.accountTabTitle}>{name}</Text>
        <Feather
          size={scale(22)}
          name={'chevron-right'}
          color={colors.disableText}
        />
      </View>
    </TouchableOpacity>
  );
});

const MyAccount = ({navigation}) => {
  const {user, setUser} = userStore;

  const [loader, setLoader] = useState(false);
  const insets = useSafeAreaInsets();

  const onLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout from Liter?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Ok',
          onPress: () => {
            navigation.replace('IntroScreen');
            setUser(null);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.headerContainer}>
        <View
          style={[
            {
              alignItems: 'center',
              flex: 1,
              flexDirection: 'row',
              marginTop: scale(50),
            },
          ]}>
          <View style={styles.profilePicContainer}>
            <Image
              resizeMode={'cover'}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: moderateScale(8),
              }}
              source={
                user?.profile_pic
                  ? {
                      uri: user?.profile_pic,
                    }
                  : require('../assets/images/placeholder.png')
              }
            />
          </View>
          <View>
            <Text style={styles.Title}>{user?.firstname}</Text>
            <Text style={styles.loginType}>{user?.login_type}</Text>
          </View>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: scale(8),
          backgroundColor: colors.background1,
          height: height,
        }}
        showsVerticalScrollIndicator={false}>
        <AccountCard
          name={'My Profile'}
          icon={require('../assets/icons/Account.png')}
          onPress={() => navigation.navigate('MyAccount')}
        />
        <AccountCard
          name={'Completed Surveys'}
          icon={require('../assets/icons/Survey.png')}
          onPress={() => navigation.navigate('CompletedSurveys')}
        />
        <AccountCard
          name={'Foreman'}
          icon={require('../assets/icons/Survey.png')}
          onPress={() => navigation.navigate('ForemanFuelType')}
        />

        <View style={{padding: scale(30)}}>
          <Button disabled={loader} onPress={onLogout}>
            <Text style={styles.buttonLabel}>Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default observer(MyAccount);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: height * 0.2,
    paddingHorizontal: scale(15),
    overflow: 'hidden',
    backgroundColor: colors.primary,
    color: colors.background,
  },
  profilePicContainer: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(8),
    backgroundColor: '#fff',
    marginRight: scale(13),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Title: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(18),
    textAlign: 'left',
    includeFontPadding: false,
    color: colors.background,
  },
  loginType: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(11),
    textAlign: 'left',
    includeFontPadding: false,
    marginTop: scale(3),
    color: colors.background,
  },
  accountContainer: {
    paddingVertical: scale(7),
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    marginBottom: scale(2),
    backgroundColor: '#fff',
  },
  accountTabTitle: {
    flex: 1,
    fontFamily: FONT_FAMILY.regular,
    paddingLeft: scale(10),
    fontSize: scale(14),
    color: colors.secondary,
    includeFontPadding: false,
    textAlign: 'left',
  },
  buttonLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(14),
    color: '#FFFFFF',
    includeFontPadding: false,
  },
  cardicons: {
    height: scale(22),
    width: scale(22),
  },
});
