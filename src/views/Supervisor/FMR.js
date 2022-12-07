import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import CountBox from '../../common/CountBox';
import FMRCard from '../../common/FMRCard';
import {FONT_FAMILY} from '../../assets/fonts';
const {colors} = myDefaultTheme;

const keyExtractor = item => item?.station_code;
const FMR = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const focusedScreen = useIsFocused();

  const onRefresh = () => {
    setRefreshing(true);
  };

  const _renderItem = ({item}) => {
    return <FMRCard item={item} navigation={navigation} />;
  };

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
      station_code: '3453453454',
      station_name: 'BNC Station',
      address: 'Hala station road',
      region: 'North',
    },
  ];
  return (
    <View style={commonStyles.container}>
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
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                paddingHorizontal: scale(10),
                marginTop: scale(10),
              }}>
              <CountBox
                loading={loadingCount}
                count={2}
                label={'New'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                count={2}
                label={'Assigned'}
                textAlign={'left'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                padding: scale(10),
              }}>
              <CountBox
                loading={loadingCount}
                count={5}
                label={'Ongoing'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                count={2}
                label={'Delay Processing'}
                textAlign={'left'}
              />
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                backgroundColor: '#fff',
                paddingHorizontal: scale(10),
                paddingBottom: scale(10),
              }}>
              <CountBox
                loading={loadingCount}
                count={3}
                label={'Material Request'}
                textAlign={'left'}
                color={colors.rippleColor}
                textColor={colors.primary}
              />
            </View>
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
                  'Sorry! There are no station available for you. Please try again later.'
                }
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={fmrStations}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default FMR;
