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

import {myDefaultTheme} from '../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
//import HeaderBackIcon from '../../common/HeaderBackIcon';
//import Button from '../../common/Button';
//import DashedLine from 'react-native-dashed-line';
//import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../assets/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const CollectionCard = () => {
const [loadingCount, setLoadingCount] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  return (
<TouchableOpacity
          style={{
            width: '95%',
            marginTop: scale(10),
            alignSelf: 'center',
            backgroundColor: '#fff',
            borderRadius: scale(10),
            padding: scale(10),
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(13),
              fontFamily: FONT_FAMILY.semibold,
              textAlign: 'left',
              //paddingBottom: scale(3),
              color: colors.secondary,
              
            }}>
              #5826284562312355
            </Text>
            <Text
            numberOfLines={1}
            style={{
              fontSize: scale(12),
              fontFamily: FONT_FAMILY.semibold,
              textAlign: 'left',
              //paddingBottom: scale(1),
            }}>
              BNC Fuel station
            </Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between',borderBottomWidth:1,borderBottomColor:colors.disableText}}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: scale(11),
                  fontFamily: FONT_FAMILY.semibold,
                  textAlign: 'left',
                  //paddingBottom: scale(3),
                }}>
                Station code: 2568565669
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                //marginBottom: 2,
              }}>
              <View
                style={{
                 // backgroundColor: colors.background2,
                  borderRadius: scale(10),
                  paddingVertical: scale(5),
                 // width: '100%',
                  alignSelf: 'center',
                }}>
                <FontAwesome
                  size={scale(12)}
                  name="calendar"
                  color={colors.secondary}
                >&nbsp;&nbsp;
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.semibold,
                    fontSize: scale(11),
                    alignSelf: 'center',
                    color: colors.secondary,
                    marginBottom: 2,
                  }}>
                  14 Oct 2021
                </Text>
                </FontAwesome>
              </View>
            </View>
          </View>
        
          <View style={{flexDirection: 'row', justifyContent: 'space-between',marginTop:10,}}>
            <View style={{flex: 0.7, marginBottom: 8}}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.bold,
                  fontSize: scale(13),
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
                  paddingVertical: scale(2),
                  width: '100%',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: FONT_FAMILY.bold,
                    fontSize: scale(12),
                    alignSelf: 'center',
                    color: colors.secondary,
                   
                  }}>
                  600
                </Text>
              </View>
            </View>
          </View>
      </TouchableOpacity>
      );
    };
    
    export default CollectionCard;
    