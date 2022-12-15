import {useIsFocused} from '@react-navigation/native';
import React, {useLayoutEffect,useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import {FONT_FAMILY} from '../../assets/fonts';
import CountBox from '../../common/CountBox';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';

const {colors} = myDefaultTheme;



const FuelOrder = ({navigation}) => {
    const [loadingCount, setLoadingCount] = useState(false);
  
 
  
  const [loadingStations, setLoadingStations] = useState(false);
  const focusedScreen = useIsFocused();
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
    <>
   
    <View style={(commonStyles.container,{backgroundColor:colors.background1})}>
      <ScrollView  showsVerticalScrollIndicator={false}>
      <View style={(commonStyles.container, {backgroundColor:colors.background1})}>
      
          <View style={styles.countContainer}>
             <CountBox 
            loading={loadingCount}
            count={'2'}
            label={'Processing'}
            textAlign={'left'}
          />
          <CountBox
            loading={loadingCount}
            count={4}
            label={'Completed'}
            textAlign={'left'}
          />
          </View>
        </View>
        
        <View style={{ alignItems: "center",
    justifyContent: "center",
    color:'black',
    borderColor:'black',
    marginTop:10,}}>
      <TouchableOpacity style={{backgroundColor:colors.background,
                      height:190,width:"95%",marginTop:8,
                      borderRadius: 12, marginBottom:10,padding:14,
                      }}>
                <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
                fontSize: scale(14),color:"black"}}>#4569874523658</Text>


                <View style={styles.containertab}>
                    <View style={styles.tableContainer}>
                      
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.textLineItem}>Fuel Type</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Tanker Capacity</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Date </Text>
                          </View>
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.categoryStyle}>95</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>40000</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>10 Oct 2021 </Text>
                          </View>
                      </View> 
                      
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>Status</Text>
                    </View>
                </View>    
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.statusStyle}>Ongoing</Text>
                    </View>
                </View>
                          
                      
  
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:colors.background,
                      height:190,width:"95%",marginTop:8,
                      borderRadius: 12, marginBottom:10,padding:14,
                      }}>
                <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
                fontSize: scale(14),color:"black"}}>#4569874523658</Text>


                <View style={styles.containertab}>
                    <View style={styles.tableContainer}>
                      
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.textLineItem}>Fuel Type</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Tanker Capacity</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Date </Text>
                          </View>
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.categoryStyle}>95</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>40000</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>10 Oct 2021 </Text>
                          </View>
                      </View> 
                      
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>Status</Text>
                    </View>
                </View>    
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.statusStyle}>Ongoing</Text>
                    </View>
                </View>
                          
                      
  
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:colors.background,
                      height:190,width:"95%",marginTop:8,
                      borderRadius: 12, marginBottom:10,padding:14,
                      }}>
                <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
                fontSize: scale(14),color:"black"}}>#4569874523658</Text>


                <View style={styles.containertab}>
                    <View style={styles.tableContainer}>
                      
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.textLineItem}>Fuel Type</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Tanker Capacity</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Date </Text>
                          </View>
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.categoryStyle}>95</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>40000</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>10 Oct 2021 </Text>
                          </View>
                      </View> 
                      
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>Status</Text>
                    </View>
                </View>    
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.statusStyle}>Ongoing</Text>
                    </View>
                </View>
                          
                      
  
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:colors.background,
                      height:190,width:"95%",marginTop:8,
                      borderRadius: 12, marginBottom:10,padding:14,
                      }}>
                <Text style={{padding:0,fontFamily: FONT_FAMILY.bold,
                fontSize: scale(14),color:"black"}}>#4569874523658</Text>


                <View style={styles.containertab}>
                    <View style={styles.tableContainer}>
                      
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.textLineItem}>Fuel Type</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Tanker Capacity</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.textLineItem}>Date </Text>
                          </View>
                      </View>
                      <View style={styles.tableRow}>
                          <View style={styles.tableColumnClockInOutTimes}>
                            <Text style={styles.categoryStyle}>95</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>40000</Text>
                          </View>
                          <View style={styles.tableColumnTotals}>
                            <Text style={styles.categoryStyle}>10 Oct 2021 </Text>
                          </View>
                      </View> 
                      
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.textLineItem}>Status</Text>
                    </View>
                </View>    
                <View style={styles.tableRow}>
                    <View style={styles.tableColumnClockInOutTimes}>
                        <Text style={styles.statusStyle}>Ongoing</Text>
                    </View>
                </View>
                          
                      
  
              </TouchableOpacity>
              
              </View>  
       </ScrollView>    
    </View>
     
    </>
  );
};
const styles = StyleSheet.create({
    countContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: '#fff',
      padding: scale(10),
      fontSize: scale(18),
      
    },
    containertab: {
        flex: 1,
        marginTop:0,
        maxHeight:85,
        //padding: 10
       // borderBottomWidth:1,
       // borderBottomColor:"#b3b9b7",
     },
     
     tableColumnClockInOutTimes: {
        flex: .4,
       // justifyContent: "center",
        margin: 1,
        
     },
     tableColumnTotals: {
       // alignItems: "center",
       // backgroundColor: "#000000",
        flex: .8,
       // justifyContent: "center",
        margin: 1
     },
     tableRow: {
        //flex: .8,
        flexDirection: "row",
        maxHeight: 35,
       
     },
     
     tableContainer: {
       // backgroundColor: "blue",
        borderRadius: 5,
        flex: 1,
        marginTop: 0,
        padding: 5,
       
     },
      textLineItem: {
        fontFamily: FONT_FAMILY.semibold,
         fontSize: scale(11),
        color: colors.secondary1,
        //alignItems:'flex-start'
        textAlign:'left',
       // width:'80%'
      },
      categoryStyle:{
       // borderWidth: 1,
       // borderColor: "#F0F2F5",
        fontFamily: FONT_FAMILY.semibold,
        fontSize: scale(14),
        color:"black",
        backgroundColor:"#F0F2F5",
        borderRadius:8,
        alignItems: 'center',
        width: "80%",
        height:32,
        textAlign:'center',
        marginTop:4,
      },
      statusStyle:{
          fontFamily: FONT_FAMILY.semibold,
          fontSize: scale(14),
          color:"#00396D",
          backgroundColor:"rgba(90, 139, 234, 0.2);",
          borderRadius: 8,
          alignItems: 'center',
          //padding: 6,
          width: "60%",
          height:35,
          textAlign:'center',
          marginTop:4,
      }
});
export default FuelOrder;
