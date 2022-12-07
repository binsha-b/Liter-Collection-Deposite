/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TextInput, I18nManager} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../utils/theme';
import Clipboard from '@react-native-clipboard/clipboard';
import {FONT_FAMILY} from '../assets/fonts';
const {colors} = myDefaultTheme;
export default function Input(props) {
  const copyText = () => {
    Clipboard.setString(props.value);
  };

  return (
    <View
      // pointerEvents={props.disabled ? 'none' : 'auto'}
      style={{width: '90%', alignSelf: 'center', ...props.style}}>
      {props.label ? (
        <Text
          style={{
            fontFamily: FONT_FAMILY.medium,
            fontSize: scale(11),
            color: props.error ? 'red' : colors.secondary,
            textAlign: 'left',
            marginTop: scale(16),
          }}>
          {props.label}
        </Text>
      ) : null}

      <TextInput
        onLongPress={copyText}
        textAlignVertical="center"
        placeholderTextColor={'#686E82'}
        {...props}
        style={{
          fontSize: scale(12),
          fontFamily: FONT_FAMILY.regular,
          paddingHorizontal: scale(15),
          paddingVertical: scale(10),
          borderRadius: scale(10),
          textAlign: I18nManager.isRTL ? 'right' : 'left',
          ...props.inputStyle,
        }}
      />
    </View>
  );
}
