import {calendarFormat} from 'moment';
import React, {useLayoutEffect,useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/InputOld';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const FuelOrderType = ({navigation}) => {
 
const toSubmit = () => {
    navigation.navigate('FuelOrderType');
};
const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    //Alert("gfhfhgf");
    console.log(date);
    console.warn("A date has been picked: ", date);
   
    hideDatePicker();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Liter Gas Station',
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
    <View style={(commonStyles.container, {backgroundColor: colors.background1})}>
      <View 
        contentContainerStyle={{
          padding: scale(8),
          height: height,
         
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.fuelTitle}>
        <Text style={{fontFamily: FONT_FAMILY.bold,
    fontSize: scale(11),marginTop:5}}>You don't have to worry</Text>
          <Text style={styles.boldText}>Fuel Type</Text>
          <View style={styles.dieselStyle}>
            <Text style={styles.fuelLabelDisable}>Diesel</Text>
            
            </View>

            <View style={styles.petrolStyle}>
            <Text style={styles.fuelLabelActive}>Petrol</Text>
            
            </View>

                <View style={styles.lpgStyle}>
                    <Text style={styles.fuelLabelDisable}>LPG</Text>
                </View>
        </View>

        
       

        <View style={styles.quantityContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.quantityLabel}>Tanker Capacity</Text>
            </View>
          </View>

            <View style={styles.description}>
                <View style={{flexDirection:'row',fontFamily: FONT_FAMILY.bold,width:348,}}>
                    <Input
                    inputStyle={{
                        minHeight: scale(10),
                        marginTop: scale(10),
                        width:'100%',
                        backgroundColor: colors.secondary2,
                    }}
                    style={{width: '100%', fontFamily: FONT_FAMILY.bold, fontSize:15}}
                    multiline={true}
                    numberOfLines={1}
                    placeholder={'Capacity'}
                    // value="150 L"
                    textAlignVertical="top"
                    
                    />
                    <Image
                    style={{marginTop:30,marginLeft:-30,padding:5,}}
                    source={require('./../../assets/icons/rightArrow.png')}
                /> 
                
                
                </View>
            </View>
        </View>
        <View style={styles.quantityContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.quantityLabel}>Select Date</Text>
            </View>
          </View>

            <View style={styles.description}>
                <Pressable onPress={showDatePicker}>
                <View style={{flexDirection:'row',fontFamily: FONT_FAMILY.bold,
                width:348, backgroundColor:colors.secondary2,
                height:scale(42),marginTop:10,
                borderRadius:10}}>
                
                    <Text style={{marginTop:10,marginLeft:15,fontFamily: FONT_FAMILY.regular,
                    fontSize: scale(12),}}>Date
  </Text>
                
                   
                     
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
                
                
                </View></Pressable> 
            </View>
           
          
        </View>


        </View>
          <View style={styles.buttonContainer}>
            <Button onPress={toSubmit}>
              <Text style={styles.buttonSubmit}>
                SUBMIT
              </Text>
            </Button>
          </View>
        
     
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(14),
    includeFontPadding: false,
    color: colors.background,
  },
  buttonContainer: {
    marginTop:70,
    width: '95%',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  quantityLabel: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
  },
  quantityContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    paddingVertical: scale(10),
   // width: '100%',
    alignSelf: 'center',
    marginTop:15,
    marginRight:10,
    marginLeft:10,
  },
  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(16),
    color: colors.secondary,
    marginTop:-8,
  },
  fuelTitle: {
    marginTop: scale(15),
    backgroundColor: colors.background,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    marginRight:10,
    marginLeft:10,
  },
  fuelLabelDisable: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    color: colors.secondary,
   
  },
  fuelLabelActive: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(12),
    color: colors.background,
  },
  dieselStyle: {
    width: 75,
    height: 32,
    marginLeft: 22,
    marginTop: 25, 
    borderColor:'#CDCDCD',
    borderWidth:1,
    borderRadius: 4,
    alignItems: 'center',
  },
  petrolStyle : {
    width: 75,
    height: 32,
    marginLeft: 140,
    marginTop: -31,
    backgroundColor: '#F15A22',
    borderColor:'#F15A22',
    borderRadius: 4,
    alignItems: 'center',
    borderWidth:1,
    padding:2,
  },
  lpgStyle : {
    width: 75,
    height: 32,
    marginLeft: 260,
    marginTop: -32,
    borderColor:'#CDCDCD',
    borderWidth:1,
    borderRadius: 4,
    marginBottom:10,
    alignItems: 'center',
  },
  description: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(8),
    borderRadius: scale(10),
    width: '100%',
    alignSelf: 'center',
  },
});
export default FuelOrderType;
