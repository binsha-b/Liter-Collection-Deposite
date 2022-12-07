import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import StationCard from '../../common/StationCard';
import {getSurveyCount, getSurveyStations} from '../../api';
import {showMessage} from 'react-native-flash-message';
import {commonStyles} from '../../utils/commonStyles';
import {FONT_FAMILY} from '../../assets/fonts';
import CountBox from '../../common/CountBox';

const {colors} = myDefaultTheme;

const keyExtractor = item => item?.station_code;

const Surveys = ({navigation}) => {
  const [counts, setCounts] = useState({});
  const [surveyStations, setSurveyStations] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshingPage, setRefreshingPage] = useState(false);
  const [loadingCount, setLoadingCount] = useState(false);
  const [loadingStations, setLoadingStations] = useState(false);
  const focusedScreen = useIsFocused();

  useEffect(() => {
    setLoadingStations(true);

    getDatas(true);
  }, []);

  const getDatas = (intial = false) => {
    getSurveyCount()
      .then(res => {
        setCounts(res.data);
        intial ? setLoadingCount(false) : setRefreshingPage(false);
        setRefreshing(false);
      })
      .catch(() => {
        intial ? setLoadingCount(false) : setRefreshingPage(false);
        setRefreshing(false);
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the survey count. Please try again later',
        });
      });

    getSurveyStations()
      .then(res => {
        let data = res.data.map(s => {
          return {
            ...(s.station_details.length
              ? s.station_details[0]
              : s.station_details),
          };
        });

        setSurveyStations(data);
        intial ? setLoadingStations(false) : setRefreshingPage(false);
        setRefreshing(false);
      })
      .catch(() => {
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the survey stations. Please try again later',
        });
        intial ? setLoadingStations(false) : setRefreshingPage(false);
        setRefreshing(false);
      });
  };
  const onRefresh = () => {
    setLoadingStations(true);
    setRefreshing(true);
    getDatas();
  };

  const _renderItem = ({item}) => {
    return (
      <StationCard
        item={item}
        navigation={navigation}
        navigateScreenName={'SurveyType'}
      />
    );
  };

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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              padding: scale(10),
            }}>
            <CountBox
              loading={loadingCount}
              count={counts?.count_completed}
              label={'Today Completed'}
            />
            <CountBox
              loading={loadingCount}
              count={counts?.count_pending}
              label={'Today Pending'}
              color={colors.rippleColor}
              textColor={colors.primary}
            />
          </View>
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
                Sorry! There are no station available for you. Please try again
                later.
              </Text>
            </View>
          )
        }
        keyExtractor={keyExtractor}
        data={surveyStations}
        renderItem={_renderItem}
      />
    </View>
  );
};

export default Surveys;
