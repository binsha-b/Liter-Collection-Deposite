/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  View,
  StyleSheet,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;
export default function Button(props) {
  if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity
        {...props}
        style={{
          backgroundColor: props?.color ? props?.color : colors.primary,
          borderRadius: scale(10),
          alignItems: 'center',
          paddingVertical: scale(13),
          alignSelf: 'center',
          width: '90%',
          marginTop: scale(22),
        }}>
        {props.children}
      </TouchableOpacity>
    );
  } else {
    return (
      <View
        style={{
          borderRadius: scale(10),
          width: '100%',
          alignSelf: 'center',
          marginTop: scale(22),
          backgroundColor: props?.color ? props?.color : colors.primary,
        }}>
        <TouchableNativeFeedback
          {...props}
          style={{width: '100%'}}
          background={TouchableNativeFeedback.Ripple(colors.rippleColor, true)}>
          <View style={{alignItems: 'center', paddingVertical: scale(13)}}>
            {props.children}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    borderRadius: scale(10),
    width: '100%',
    alignSelf: 'center',
    marginTop: scale(22),
    backgroundColor: colors.secondary,
  },
  iosContainer: {
    backgroundColor: colors.primary,
    borderRadius: scale(10),
    alignItems: 'center',
    paddingVertical: scale(13),
    alignSelf: 'center',
    width: '90%',
    marginTop: scale(22),
  },
});
