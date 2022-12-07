import React from 'react';
import {ActivityIndicator, Dimensions, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../assets/fonts';
import {appFont} from '../utils';
import {myDefaultTheme} from '../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const CountBox = ({
  count = 0,
  countSmall = 0,
  label = '',
  loading = true,
  color = colors.secondary2,
  textColor = colors.secondary,
  textAlign = 'left',
}) => {
  return (
    <View
      style={{
        flex: textAlign === 'center' ? 1 : 0.48,
        borderColor: colors.secondary,
        borderRadius: scale(10),
        padding: scale(14),
        justifyContent: 'center',
        paddingVertical: scale(10),
        backgroundColor: color,
      }}>
      <View style={{height: scale(35), justifyContent: 'center'}}>
        {!loading ? (
          count ? (
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: scale(22),
                color: textColor,
                textAlign: textAlign,
              }}>
              {count}
            </Text>
          ) : (
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: scale(18),
                color: textColor,
                textAlign: textAlign,
              }}>
              {countSmall}
            </Text>
          )
        ) : (
          <ActivityIndicator color={colors.primary} />
        )}
      </View>
      <Text
        style={{
          fontFamily: FONT_FAMILY.regular,
          fontSize: scale(12),
          color: textColor,
          textAlign: textAlign,
        }}>
        {label}
      </Text>
    </View>
  );
};
export default CountBox;
