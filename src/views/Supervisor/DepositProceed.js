import {useIsFocused} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Button from '../../common/Button';
import DashedLine from 'react-native-dashed-line';
import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const DepositProceed = ({navigation}) => {
  const [loadingCount, setLoadingCount] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const onPressCollapse = () => {
    setCollapsed(prevCollapse => !prevCollapse);
  };

  const onProceed = () => {
    navigation.navigate('DepositConfirm');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Deposit',
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: scale(10),
          }}>
          <CountBox
            loading={loadingCount}
            countSmall={'SAR 50,000'}
            color={colors.rippleColor}
            textColor={colors.primary}
            label={'Cash in Hand'}
            textAlign={'center'}
          />
        </View>
      </>
      <View style={{backgroundColor: colors.background1, height: height}}>
        <TouchableOpacity
          onPress={onPressCollapse}
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            borderRadius: scale(10),

            marginTop: scale(15),
            width: '92%',
            alignSelf: 'center',

            backgroundColor: colors.primary,
            paddingVertical: scale(10),
            paddingHorizontal: scale(5),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/bank.png')}
              style={{
                height: scale(22),
                width: scale(22),
                tintColor: '#fff',
                marginHorizontal: scale(2),
              }}
            />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: scale(13),
                flex: 1,
                textAlign: 'left',
                color: colors.background,
              }}>
              Select Bank
            </Text>
            <View
              style={{
                width: scale(26),
                height: scale(26),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: scale(15),
                  height: scale(15),
                  borderRadius: scale(50),
                  backgroundColor: '#fff',
                  paddingVertical: scale(2),
                }}>
                <Feather
                  style={{alignSelf: 'center'}}
                  color={colors.primary}
                  size={scale(10)}
                  name={!collapsed ? 'chevron-down' : 'chevron-up'}
                />
              </View>
            </View>
          </View>
          {collapsed && (
            <View>
              <Text>SBI</Text>
            </View>
          )}
        </TouchableOpacity>

        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{marginTop: scale(25), marginHorizontal: scale(15)}}
          dashColor={colors.disableText}
        />
        <View
          style={{
            backgroundColor: colors.background1,
            paddingHorizontal: scale(15),
            borderRadius: scale(10),
            paddingVertical: scale(20),
            width: '95%',
            alignSelf: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: scale(12),
                  color: colors.secondary,
                }}>
                Amount
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginBottom: 10,
              }}>
              <View
                style={{
                  backgroundColor: colors.background2,
                  borderRadius: scale(10),
                  paddingVertical: scale(5),
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.regular,
                    fontSize: scale(12),
                    alignSelf: 'center',
                    color: colors.secondary,
                  }}>
                  600
                </Text>
              </View>
            </View>
          </View>
        </View>
        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{marginHorizontal: scale(15)}}
          dashColor={colors.disableText}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            borderRadius: scale(10),

            marginTop: scale(15),
            width: '90%',
            alignSelf: 'center',

            backgroundColor: colors.background2,
            paddingVertical: scale(10),
            paddingHorizontal: scale(5),
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              color={colors.primary}
              size={scale(20)}
              name={'file-text'}
            />
            <Text
              numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: scale(13),
                flex: 1,
                textAlign: 'left',
                color: colors.disableText,
                marginHorizontal: scale(10),
              }}>
              Attachment
            </Text>
            <View
              style={{
                width: scale(26),
                height: scale(26),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: scale(15),
                  height: scale(15),
                  borderRadius: scale(50),
                  backgroundColor: colors.secondary,
                  paddingVertical: scale(2),
                }}>
                <Feather
                  style={{alignSelf: 'center'}}
                  color={colors.background}
                  size={scale(10)}
                  name={'plus'}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>

        <View
          style={{
            marginHorizontal: scale(10),
            marginTop: scale(50),
            paddingVertical: scale(12),
          }}>
          <Button onPress={onProceed}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(14),
                color: colors.background,
                includeFontPadding: false,
              }}>
              PROCEED
            </Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DepositProceed;
