/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../utils/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveScale} from '../utils';
import {FONT_FAMILY} from '../assets/fonts';
const {colors} = myDefaultTheme;

const StationCard = ({
  navigation,
  showHeader = true,
  navigateScreenName = 'SurveyStartStation',
  item,
  onClickDetails = '',
  editable = true,
}) => {
   const onClickList = () => {
    navigation.navigate('CollectionList', {
      /*stationName: item?.station_name,
      stationID: item?.id,
      details: item,
      editable,*/
    });
  };
  const onStart = () => {
    navigation.navigate(navigateScreenName, {
      stationName: item?.station_name,
      stationID: item?.id,
      details: item,
      editable,
    });
  };
 

  const onPhone = () => {
    Linking.openURL(`tel:${item?.phone}`);
  };

  const onMap = () => {
    const scheme = Platform.select({ios: 'maps:0,0?q=', android: 'geo:0,0?q='});
    const latLng = `${item?.lat},${item?.lng}`;
    const label = item?.station_name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    Linking.openURL(url);
  };

  //   const onDetails = () => {
  //     navigation.navigate(onClickDetails, {
  //       station_details: item,
  //     });
  //   };

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('CollectionList')}
      //onPress={onClickList}
      //onPress={onDetails}
      // disabled={!onClickDetails}
      style={{
        width: '95%',
        marginTop: scale(10),
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderRadius: scale(10),
        padding: scale(12),
      }}>
      {showHeader && (
        <Text
          numberOfLines={1}
          style={{
            fontSize: scale(15),
            fontFamily: FONT_FAMILY.bold,
            textAlign: 'left',
            paddingBottom: scale(10),
          }}>
          {item?.station_name}
        </Text>
      )}
      <View style={{paddingBottom: scale(10), flexDirection: 'row'}}>
        <View>
          <Image
            style={{
              height: scale(115),
              width: scale(130),
              borderRadius: scale(10),
            }}
            source={
              item?.image
                ? {uri: item?.image}
                : require('../assets/images/sampleDesign/petrolPumb.png')
            }
          />
        </View>
        <View style={{paddingLeft: scale(10)}}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(11),
              textAlign: 'left',
            }}>
            {showHeader ? 'Station Code' : 'Request Number'}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: scale(13),
              textAlign: 'left',
            }}>
            {showHeader ? item?.station_code : item?.report_num}
          </Text>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(11),
              marginTop: scale(5),
              textAlign: 'left',
            }}>
            {'Address'}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: scale(13),
              textAlign: 'left',
            }}>
            {item?.address}
          </Text>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(11),
              marginTop: scale(5),
              textAlign: 'left',
            }}>
            {'Region'}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: scale(13),
              textAlign: 'left',
            }}>
            {item?.region}
          </Text>
        </View>
      </View>
      <View
        style={{
          height: scale(1.5),
          width: '95%',
          backgroundColor: colors.secondary2,
        }}
      />
      <View
        style={{
          paddingTop: scale(10),
          flexDirection: 'row',
        }}>
        <View style={{flex: 0.7, flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={onPhone}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 10}}
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: scale(100),
              backgroundColor: colors.secondary2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FontAwesome
              size={scale(16)}
              name="phone"
              color={colors.secondary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onMap}
            hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
            style={{
              width: scale(30),
              height: scale(30),
              borderRadius: scale(100),
              backgroundColor: colors.secondary2,
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: scale(20),
            }}>
            <FontAwesome
              size={scale(16)}
              name="location-arrow"
              color={colors.secondary}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 0.3}}>
          <TouchableOpacity
            onPress={onStart}
            hitSlop={{top: 20, bottom: 20, left: 10, right: 20}}
            style={{
              height: scale(36),
              borderRadius: scale(18),
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: scale(15),
              borderWidth: scale(1.5),
              borderColor: colors.primary,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.semibold,
                fontSize: scale(13),
                color: colors.primary,
                marginRight: scale(10),
              }}>
              {editable ? 'Start' : 'View'}
            </Text>
            <Image
              style={{height: responsiveScale(14), width: responsiveScale(11)}}
              source={require('../assets/icons/startRight.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default StationCard;
