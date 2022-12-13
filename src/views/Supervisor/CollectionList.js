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
  Modal,
  Alert,
  
  Image,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import DateTimePickerModal from "react-native-modal-datetime-picker";

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
import {responsiveScale} from './../../utils';
const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const keyExtractor = item => item?.station_code;
const CollectionList = ({navigation}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date('Y-m-d'));
    hideDatePicker();
  };
  const [toggleCheckBox, setToggleCheckBox] = useState(false)
  const [ToggleCheckBoxCash, setToggleCheckBoxCash] = useState(false)
  const [toggleCheckBoxCredit, setToggleCheckBoxCredit] = useState(false)
  
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
      <View style={{flex: 0.34}}>
          <TouchableOpacity
           onPress={() => setModalVisible(true)}
            style={{
              height: scale(34),
              borderRadius: scale(18),
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: colors.primary,
              backgroundColor: colors.primary,
              flexDirection: 'row',
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: scale(13),
                color: colors.background,
                marginRight: scale(0),
              }}>
              Filter &nbsp; <Image
            
              source={require('./../../assets/icons/filter.png')}
            /> 
            </Text>
          </TouchableOpacity>
        </View>
          </View>
      {/* modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          
          {/*<Button  onPress={showDatePicker} ><Text style={{fontFamily: FONT_FAMILY.bold,
                fontSize: scale(12),
                color: colors.background,
                marginRight: scale(0),}}>Date</Text></Button>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
          />*/}
        
          <Text
            numberOfLines={1}
            style={{
              fontSize: scale(20),
              fontFamily: FONT_FAMILY.bold,
              //textAlign: 'left',
              //paddingBottom: scale(3),
              marginTop:8,
              color: colors.secondary,
              
            }}>
            service type
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={toggleCheckBox} 
                  onValueChange={(newValue) => setToggleCheckBox(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
               
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: toggleCheckBox ? '#F15927' : colors.secondary,
                marginLeft: scale(10)}}>MADA</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={ToggleCheckBoxCash} height={30} width={30}
                  onValueChange={(newValue) => setToggleCheckBoxCash(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: ToggleCheckBoxCash ? '#F15927' : colors.secondary,
                marginLeft: scale(10),}}>Cash</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start',}}>
              <CheckBox disabled={false} value={toggleCheckBoxCredit} height={30} width={30}
                  onValueChange={(newValue) => setToggleCheckBoxCredit(newValue)}
                  tintColors={{ true: '#F15927', false: colors.secondary }}
                /> 
              <Text style={{fontFamily: FONT_FAMILY.regular,
                fontSize: scale(15),
                color: toggleCheckBoxCredit ? '#F15927' : colors.secondary,
                marginLeft: scale(10),}}>Credit Card</Text>
                </View>
             


            <View style={{width: '100%',height:81,marginTop:10,}}>
            <Button onPress={() => setModalVisible(!modalVisible)}>
              <Text style={{fontFamily: FONT_FAMILY.bold,
                fontSize: scale(15),
                color: colors.background,
                marginRight: scale(0),}}>APPLY FILTER</Text>
            </Button>
         
        </View>
            
          </View>
        </View>
      </Modal>
        
        
       

       
      </View>
      
    </View>
  );
};
const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: 'center',
    position:'absolute',
    width:'25%',
   height:70,
    fontFamily: FONT_FAMILY.bold,
    marginBottom:20,
    marginTop:380,
   
  },
 
    centeredView: {
      flex: 1,
      justifyContent: "center",
      //alignItems: "center",
      //marginTop: 100,
      //activeOpacity:0.9,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      height: '100%',
      width:'100%'
    },
    modalView: {
      marginTop:520,
      margin: 1,
      backgroundColor: "white",
      borderTopLeftRadius:30,
      borderTopRightRadius:30,
     // borderRadius: 20,
      padding: 20,
      //alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      height:435,
    },
    
    
    
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    

});
export default CollectionList;
