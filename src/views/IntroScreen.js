import React, {useEffect, useRef} from 'react';
import {Image, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {scale} from 'react-native-size-matters';
import {observer} from 'mobx-react';
import userStore from '../stores/userStore';

const IntroScreen = ({navigation}) => {
  const animRef = useRef(null);
  const {loadUser} = userStore;

  useEffect(() => {
    animRef.current.zoomIn();
    setTimeout(() => {
      getUser();
    }, 2000);
  }, []);

  const getUser = async () => {
    let alreadyLogged = await loadUser();
    if (!alreadyLogged) {
      navigation.replace('Login');
    } else {
      const {user} = userStore;
      if (user.login_type === 'Supervisor') {
        navigation.replace('Home', {screen: 'SupervisorStack'});
        return false;
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animatable.Image
        easing="ease-out"
        ref={animRef}
        resizeMode="contain"
        style={{width: scale(200), height: scale(200)}}
        source={require('../assets/images/logoUp.png')}
      />

      <Image
        resizeMode="cover"
        source={require('../assets/images/introImage.png')}
        style={{
          width: scale(250),
          height: scale(250),
          position: 'absolute',
          bottom: 0,
          right: 0,
          zIndex: -1,
        }}
      />
    </View>
  );
};

export default observer(IntroScreen);
