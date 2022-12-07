import {useIsFocused} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import StationCard from '../../common/StationCard';
import {commonStyles} from '../../utils/commonStyles';
import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const keyExtractor = item => item?.station_code;
const Collection = ({navigation}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const focusedScreen = useIsFocused();

  const onRefresh = () => {
    setRefreshing(true);
  };

  const _renderItem = ({item}) => {
    return (
      <StationCard
        item={item}
        navigation={navigation}
        navigateScreenName={'CollectionApproval'}
      />
    );
  };

  const collectionStations = [
    {
      id: 1,
      station_code: '2343534534',
      station_name: 'Liter Gas Station',
      address: 'sheikh zayed road',
      region: 'North',
    },
    {
      id: 2,
      station_code: '3453453454',
      station_name: 'Liter Gas Station',
      address: 'Hala station road',
      region: 'North',
    },
    {
      id: 3,
      station_code: '6456575656',
      station_name: 'Liter Gas Station',
      address: 'Hala station road',
      region: 'North',
    },
  ];

  return (
    <View
      style={(commonStyles.container, {backgroundColor: colors.background1})}>
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
        contentContainerStyle={{flexGrow: 1, marginBottom: scale(15)}}
        ListHeaderComponent={
          <>
            <View style={styles.countContainer}>
              <CountBox
                loading={loadingCount}
                count={22}
                label={'Total Request'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                count={22}
                label={'Pending Request'}
                textAlign={'left'}
              />
            </View>
            <View style={styles.countContainer}>
              <CountBox
                loading={loadingCount}
                countSmall={'SAR 50,000'}
                label={'Collection in Hand'}
                textAlign={'left'}
              />
              <CountBox
                loading={loadingCount}
                countSmall={'SAR 100,000'}
                label={'Total Collection'}
                color={colors.rippleColor}
                textColor={colors.primary}
                textAlign={'left'}
              />
            </View>
            <View style={styles.countSection}>
              <CountBox
                loading={loadingCount}
                countSmall={'SAR 50,000'}
                label={'Collection Transferred'}
                textAlign={'center'}
              />
            </View>
          </>
        }
        ListEmptyComponent={
          loadingStations ? (
            <View style={commonStyles.emptyStateContainer}>
              <ActivityIndicator color={colors.primary} />
            </View>
          ) : (
            <View style={commonStyles.emptyStateContainer}>
              <Text
                style={
                  (commonStyles.emptyStateText, {color: colors.secondary})
                }>
                {
                  'Sorry! There are no station available for you. Please try again later.'
                }
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={collectionStations}
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  countSection: {
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: scale(10),
  },
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: scale(10),
  },
});

export default Collection;
