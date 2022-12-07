/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../utils/theme';
import Feather from 'react-native-vector-icons/Feather';
import {FONT_FAMILY} from '../assets/fonts';
const {colors} = myDefaultTheme;
const Header = ({
  navigation,
  showBack = false,
  title = '',
  showMenu = false,
  color = '',
  icon = false,
  userStore,
}) => {
  const insets = useSafeAreaInsets();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.headerContainer,
        {
          backgroundColor: color,
          borderBottomWidth: scale(1.5),
          borderBottomColor: colors.secondary2,
          paddingTop: scale(10) + insets.top,
        },
      ]}>
      {/* {showBack && (
        <StatusBar
          animated={true}
          barStyle="dark-content"
          backgroundColor="#fff"
        />
      )}
      {showMenu && (
        <StatusBar
          animated={true}
          barStyle="light-content"
          backgroundColor={colors.primary}
        />
      )} */}
      <View style={{flex: 0.3}}>
        {showBack && (
          <TouchableOpacity
            onPress={goBack}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={{
              height: scale(22),
              width: scale(22),
              borderRadius: scale(11),
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{height: scale(15), width: scale(15), tintColor: '#fff'}}
              source={require('../assets/icons/backLeft.png')}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={{flex: 0.5}}>
        {title === 'Surveys' ? (
          <Image
            style={{
              tintColor: '#fff',
              height: scale(40),
              width: scale(100),
            }}
            source={require('../assets/images/logoUp.png')}
          />
        ) : (
          <Text
            numberOfLines={1}
            style={{
              textAlign: 'center',
              fontSize: scale(17),
              fontFamily: FONT_FAMILY.bold,
              color: '#000000',
            }}>
            {title}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: scale(10),
    paddingBottom: scale(15),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});

export default Header;
