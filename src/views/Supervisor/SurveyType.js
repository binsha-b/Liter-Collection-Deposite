import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import {View} from 'react-native-animatable';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import {getSurveyStatus} from '../../api';
import {showMessage} from 'react-native-flash-message';
import HeaderBackIcon from '../../common/HeaderBackIcon';

const {colors} = myDefaultTheme;

const SurveyType = ({navigation, route}) => {
  const {stationID, stationName} = route.params;
  const [surveyTypes, setSurveyTypes] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(true);

  const SurveyTypeCard = ({type, status}) => {
    const getSurveyQuestions = () => {
      navigation.navigate('SurveyQuestions', {
        surveyType: type,
        stationID,
        stationName,
      });
    };

    return (
      <TouchableOpacity
        disabled={status === 'Completed' ? true : false}
        onPress={getSurveyQuestions}
        style={{
          height: scale(70),
          backgroundColor:
            status === 'Completed' ? colors.background2 : colors.rippleColor,
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: scale(10),
          overflow: 'hidden',
          marginBottom: scale(10),
          width: '100%',
        }}>
        <Text
          style={{
            fontSize: scale(15),
            alignSelf: 'center',
            color:
              status === 'Completed' ? colors.disableText : colors.secondary,
          }}>
          {type} Survey
        </Text>
        {status === 'Completed' && (
          <Text
            style={{
              fontSize: scale(8),
              alignSelf: 'center',
              color: colors.primary,
            }}>
            You already done
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: stationName,
      headerShown: true,
      headerRightContainerStyle: commonStyles.headerRightContainerStyle,
      headerLeftContainerStyle: commonStyles.headerLeftContainerStyle,
      headerBackTitleVisible: false,
      headerTitleAlign: 'center',
      headerTitleStyle: commonStyles.headerTitle,
      headerBackImage: () => <HeaderBackIcon icon={'chevron-left'} />,
    });
  }, [navigation]);
  useEffect(() => {
    const body = {
      station_id: stationID,
    };
    getSurveyStatus(body)
      .then(res => {
        setSurveyTypes(res.data);
        setLoadingTypes(false);
      })
      .catch(err => {
        console.log(err.response);

        showMessage({
          message: 'Oops! Something went wrong',
          description:
            'Failed to fetch the survey status. Please try again later',
        });
      });
  }, []);

  return (
    <View style={commonStyles.container}>
      <View style={{paddingTop: scale(15), paddingHorizontal: scale(15)}}>
        {loadingTypes ? (
          <View style={commonStyles.emptyStateContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          surveyTypes.map(types => {
            return <SurveyTypeCard type={types?.type} status={types?.status} />;
          })
        )}
      </View>
    </View>
  );
};

export default SurveyType;
