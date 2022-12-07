import {useIsFocused} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CollectionCard from './../../common/CollectionCard'
import { positionStyle } from 'react-native-flash-message';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const keyExtractor = item => item?.station_code;
const CollectionList = ({navigation}) => {
  const [loadingCount, setLoadingCount] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
 
  const [loadingStations, setLoadingStations] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const focusedScreen = useIsFocused();

  const onRefresh = () => {
    setRefreshing(true);
  };

  const _renderItem = ({item}) => {
    return <CollectionCard item={item} navigation={navigation} />;
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);
  const fmrStations = [
    {
      id: 1,
      station_code: '2343534534',
      station_name: 'Aston Fuel Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
    {
      id: 2,
      station_code: '234353453448',
      station_name: 'Aston Fuel Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
    {
      id: 3,
      station_code: '234353457748',
      station_name: 'Aston Fuel Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
    {
      id: 4,
      station_code: '234353458558',
      station_name: 'Aston Fuel Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
  ];
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
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshingPage || (focusedScreen && refreshing)}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            titleColor={colors.primary}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: colors.background1,
          paddingBottom: scale(10),
        }}
        ListHeaderComponent={
          <>
       
         
       
        
        
        </>
      }
        ListEmptyComponent={
          loadingStations ? (
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: scale(40),
              }}>
              <Text
                style={{
                  fontFamily: FONT_FAMILY.regular,
                  fontSize: scale(12.5),
                  color: colors.secondary,
                  textAlign: 'center',
                }}>
                {
                  'Sorry! There are no Collection available for you. Please try again later.'
                }
              </Text>
            </View>
          )
        }
        
        keyExtractor={keyExtractor}
        data={fmrStations}
        renderItem={_renderItem}
      />
      
      <View style={styles.buttonContainer}>
            <Button style={styles.buttonContainer}>
              <Text style={({color: colors.background,})}>
                Filter &nbsp; <FontAwesome
                  size={scale(14)}
                  name="sliders"
                  color={colors.background}
                />
              </Text>
            </Button>
          </View>
      {/*<TouchableOpacity<CollectionCard></CollectionCard>
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
              #45343534534545
            </Text>
            <Text
            numberOfLines={1}
            style={{
              fontSize: scale(12),
              fontFamily: FONT_FAMILY.regular,
              textAlign: 'left',
              //paddingBottom: scale(1),
            }}>
              BNC Fuel station
            </Text>
            
            <View style={{flexDirection: 'row', justifyContent: 'space-between',borderBottomWidth:1,borderBottomColor:colors.disableText}}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text
                style={{
                  fontSize: scale(12),
                  fontFamily: FONT_FAMILY.regular,
                  textAlign: 'left',
                  //paddingBottom: scale(3),
                }}>
                Station Code : 1212132
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
                  11 Oct 2022
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
                  paddingVertical: scale(5),
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
         */}
        
        
       

       
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.bold,
    borderRadius: scale(30),
    paddingHorizontal: 8,
        paddingVertical: 6,
        elevation: 6
   // fontSize: scale(16),
   // includeFontPadding: false,
   
  },
  buttonContainer: {
    //backgroundColor: colors.background,
    //paddingHorizontal: scale(18),
    //borderRadius: scale(15),
    alignSelf: 'center',
   // flexDirection: 'row',
    position:'absolute',
    width:'20%',
   //height:10,
    fontFamily: FONT_FAMILY.bold,
    marginBottom:20,
    marginTop:380,
  },
});
export default CollectionList;
