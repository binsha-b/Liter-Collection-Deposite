/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  View,
  Text,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {myDefaultTheme} from '../utils/theme';
import {FONT_FAMILY} from '../assets/fonts';
const {width} = Dimensions.get('window');
const {colors} = myDefaultTheme;
const getIcon = label => {
  if (label === 'FMR') {
    return require('../assets/icons/FMR.png');
  }
  if (label === 'Survey') {
    return require('../assets/icons/Survey.png');
  }
  if (label === 'Collection') {
    return require('../assets/icons/Collection.png');
  }
  if (label === 'Deposit') {
    return require('../assets/icons/Deposit.png');
  }
  if (label === 'Account') {
    return require('../assets/icons/Account.png');
  }
};

const BottomNavbar = ({state, descriptors, navigation}) => {
  const {refreshing, setRefreshing} = useState(false);
  const focusedOptions = descriptors[state.routes[state.index].key].options;
  const animRef = useRef(null);
  const insets = useSafeAreaInsets();
  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View
      // resizeMode="cover"
      // source={require('../assets/images/bottomBG.png')}
      style={[styles.container, {height: scale(55) + insets.bottom}]}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={label}
            activeOpacity={0.6}
            style={{
              alignItems: 'center',
              flex: 0.4,
            }}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}>
            <Image
              resizeMode="contain"
              source={getIcon(label)}
              style={[
                styles.footericon,
                {tintColor: isFocused ? colors.secondary : '#AAAAAA'},
              ]}
            />
            <Text
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: scale(10),
                color: isFocused ? colors.secondary : '#AAAAAA',
              }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: scale(55),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  footericon: {
    height: scale(22),
    width: scale(22),
  },
  plusButtonStyle: {
    height: scale(60),
    width: scale(60),
    // borderRadius: scale(100),
    // backgroundColor: ,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: width / 2 - scale(30.5),
  },
});

export default BottomNavbar;
