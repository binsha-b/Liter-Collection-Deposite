import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../../utils/theme';
import ImageView from 'react-native-image-viewing-rtl';
import Button from '../../common/Button';
import {commonStyles} from '../../utils/commonStyles';
import {responsiveScale} from '../../utils';
import {hideMessage, showMessage} from 'react-native-flash-message';
import {submitSurvey, uploadImage} from '../../api';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const SurveyConfirm = ({navigation, route}) => {
  // const [imageIndex, setImageIndex] = useState(0);
  // const [viewImage, setViewImage] = useState(false);
  const {stationName} = route.params;
  const [submitLoader, setSubmitLoader] = useState(false);

  // const onCloseImageView = () => {
  //   setViewImage(false);
  // };
  const onSubmit = async () => {
    setSubmitLoader(true);
    let surveyResponse = {};
    await Promise.all(
      Object.keys(route?.params?.details).map(async ques => {
        surveyResponse[ques] = await Promise.all(
          route?.params?.details[ques].map(async s => {
            let images = [];
            if (s?.images?.length) {
              showMessage({
                message: 'Uploading in Progress',
                description: 'Please hold on while we upload the attachment',
                autoHide: false,
              });
              images = await Promise.all(
                s.images.map(async image => {
                  let formData = new FormData();
                  formData.append('fileName', {
                    uri: image?.uri,
                    name: 'Survey.jpeg',
                    type: image?.type,
                  });
                  try {
                    let {data} = await uploadImage(formData);
                    return {uri: data, imgname: image?.id + '-survey'};
                  } catch (error) {
                    setSubmitLoader(false);
                    showMessage({
                      message: 'Oops! Something went wrong',
                      description:
                        'Failed to upload the image. Please try again later',
                    });
                    return false;
                  }
                }),
              );
              hideMessage();
            }
            return {
              ...s,
              question_id: s.id,
              label_answer: s.buttonValue,
              notes: s.notes,
              images: JSON.stringify(images),
            };
          }),
        );
      }),
    );
    const body = {
      station_id: route?.params?.stationID,
      survey_response: JSON.stringify(surveyResponse),
      surveyType: route?.params?.surveyType,
    };

    submitSurvey(body)
      .then(res => {
        console.log(res);
        if (typeof res?.data === 'string') {
          Alert.alert(
            `Survey - ${res?.data} Submitted`,
            `Your survey no ${res?.data} has been submitted successfully`,
            [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.navigate('Survey');
                },
              },
            ],
            {cancelable: false},
          );
        } else {
          Alert.alert(
            'Failed to submit the survey',
            "Sorry we could'nt submit your survey. Please try again!",
            [
              {
                text: 'Ok',
              },
            ],
            {cancelable: true},
          );
        }
        setSubmitLoader(false);
      })
      .catch(err => {
        console.log(err.response);
        showMessage({
          message: 'Oops! Something went wrong',
          description: 'Failed to submit the  survey. Please try again later',
        });
        setSubmitLoader(false);
      });
  };

  const ButtonLabel = ({label = '', selected = false, onPress}) => {
    return (
      <TouchableOpacity
        style={{
          width: scale(70),
          borderRadius: scale(5),
          paddingHorizontal: scale(3),
          alignItems: 'center',
          borderWidth: 1,
          borderColor:
            label === 'Bad' || label === 'No'
              ? colors.primaryLight
              : colors.buttonSuccess,
          backgroundColor:
            label === 'Bad' || label === 'No'
              ? colors.primaryLight
              : colors.buttonSuccess,
          marginHorizontal: scale(15),
          onPress: {onPress},
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(14),
            color: '#000',
          }}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  const questionCategories = useMemo(
    () => Object.keys(route?.params?.details),
    [route?.params?.details],
  );

  let questions = route?.params?.details[questionCategories?.[0]];

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

  const _renderItems = useCallback(({item}) => {
    let question = route?.params?.details?.[item];
    // console.log(question?.[0]?.images);
    console.log(question?.[0]?.buttonValue);
    return (
      <View style={{paddingLeft: scale(10), paddingTop: scale(5)}}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.bold,
              fontSize: scale(16),
              color: '#252724',
              textAlign: 'left',
            }}>
            {question?.[0]?.question_category}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: colors.secondary2,

            paddingTop: scale(15),
            paddingBottom: scale(5),
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontFamily: FONT_FAMILY.regular,
              fontSize: scale(12),
              color: '#252724',
              textAlign: 'left',
            }}>
            {question?.[0]?.question}
          </Text>
          {question?.[0]?.buttonValue ? (
            <ButtonLabel label={question?.[0]?.buttonValue} />
          ) : (
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(12),
                color: colors.primaryLight,
                marginLeft: scale(10),
              }}>
              {' '}
              Not Answered{' '}
            </Text>
          )}
        </View>
        <View style={{marginBottom: scale(10)}}>
          {/* <ImageView
            images={imagesArray}
            imageIndex={imageIndex}
            visible={viewImage}
            onRequestClose={onCloseImageView}
          /> */}
          <ScrollView
            contentContainerStyle={{
              paddingTop: scale(20),
            }}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {question?.[0]?.images.map((m, index) => (
              <TouchableOpacity
                key={m?.id}
                // onPress={() => {
                //   setImageIndex(index);
                //   setViewImage(true);
                // }}
                style={{
                  width: width / 2.2 - scale(14),
                  height: height * 0.14,
                  borderRadius: scale(10),
                  backgroundColor: 'grey',
                  marginRight: scale(10),
                  overflow: 'hidden',
                }}>
                <Image
                  source={{uri: m?.uri}}
                  style={{height: '100%', width: '100%'}}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
          <View
            style={{
              paddingHorizontal: scale(0),
              marginTop: scale(15),
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(12),
                color: colors.secondary,
                marginTop: scale(3),
              }}>
              {question?.[0]?.notes}
            </Text>
          </View>
        </View>
      </View>
    );
  }, []);

  return (
    <View style={commonStyles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: scale(10)}}
        data={questionCategories}
        // keyExtractor={keyExtractor}
        renderItem={_renderItems}
        ListFooterComponent={
          <View
            style={{
              paddingHorizontal: scale(10),
              marginTop: scale(25),
            }}>
            <Button onPress={onSubmit} disabled={submitLoader}>
              {submitLoader ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text
                  style={{
                    fontSize: scale(15),
                    color: '#fff',
                    fontFamily: FONT_FAMILY.regular,
                  }}>
                  Submit
                </Text>
              )}
            </Button>
          </View>
        }
      />
    </View>
  );
};

export default SurveyConfirm;
