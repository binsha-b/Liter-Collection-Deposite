import moment from 'moment/moment';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {scale} from 'react-native-size-matters';
import {getCompletedSurveys} from '../../api';
import {FONT_FAMILY} from '../../assets/fonts';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');
const keyExtractor = item => item.survey_no;

const SurveyCard = React.memo(({navigation, item}) => {
  const onPress = () => {
    navigation.navigate('SurveyResponse', {details: item});
  };
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={{
        padding: scale(15),
        borderRadius: scale(10),
        marginTop: scale(15),
        backgroundColor: '#fff',
      }}>
      <View>
        <Text
          style={{
            fontFamily: FONT_FAMILY.bold,
            fontSize: scale(14),
            textAlign: 'left',
          }}>
          {item?.survey_no ? item?.survey_no : ' #1238713847913484'}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(8),
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.medium,
            fontSize: scale(13),
            textAlign: 'left',
          }}>
          {item?.station_name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: scale(5),
          alignItems: 'center',
        }}>
        <View style={{flex: 0.7}}>
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(11),
              textAlign: 'left',
            }}>
            {'Station Code'} :{' '}
            {item?.station_code ? item?.station_code : ': 2568495780'}
          </Text>
        </View>
        <View
          style={{
            flex: 0.3,
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <Image
            style={{height: scale(12), width: scale(12)}}
            source={require('../../assets/icons/date.png')}
          />
          <Text
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(11),
              color: '#2C2627',
              textAlign: 'left',
              marginLeft: scale(5),
            }}>
            {moment(item?.date).format('DD MMM YYYY')}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});

const CompletedSurveys = ({navigation}) => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresing, setRefreshing] = useState(false);
  const [startDate, setStartDate] = useState(moment().startOf('month'));
  const [endDate, setEndDate] = useState(moment().endOf('month'));

  useEffect(() => {
    //console.log(height);
    setLoading(true);
    getData(true);
  }, [startDate]);

  const getData = (intial = false) => {
    getCompletedSurveys({
      startDate: moment(startDate).format('YYYY-MM-DD'),
      endDate: moment(endDate).format('YYYY-MM-DD'),
    })
      .then(res => {
        const data = res.data.map(s => {
          return {
            ...s,
            survey_response:
              s.survey_response.length && JSON.parse(s.survey_response),
          };
        });

        setSurveys(data);

        intial ? setLoading(false) : setRefreshing(false);
      })
      .catch(() => {
        intial ? setLoading(false) : setRefreshing(false);
        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the completed surveys. Please try again later',
        });
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    getData();
  };
  const _renderItems = ({item}) => {
    return <SurveyCard navigation={navigation} item={item} />;
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Completed Surveys',
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);
  if (loading) {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator color={colors.primary} />
        </View>
      </View>
    );
  }

  return (
    <View
      style={
        (commonStyles.container,
        {backgroundColor: colors.background1, height: height})
      }>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refresing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            titleColor={colors.primary}
          />
        }
        contentContainerStyle={{flexGrow: 1, paddingHorizontal: scale(15)}}
        data={surveys}
        keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListEmptyComponent={
          <View style={commonStyles.emptyStateContainer}>
            <Text
              style={(commonStyles.emptyStateText, {color: colors.secondary})}>
              Sorry! There are no completed surveys for you. Please try again
              later.
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default CompletedSurveys;
