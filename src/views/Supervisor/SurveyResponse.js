import React, {useLayoutEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScrollView} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing-rtl';
import {commonStyles} from '../../utils/commonStyles';
import moment from 'moment';
import {API_URL} from '../../utils';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;

const {height, width} = Dimensions.get('window');

const keyExtractor = item => item;

const questionKeyExtractor = item => item.id.toString();

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
const SurveyAnswers = React.memo(({title, questions}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [viewImage, setViewImage] = useState(false);
  const renderItem = ({item, index}) => {
    const imagesArray =
      item?.images.length && item?.images[0] === '['
        ? JSON.parse(item.images)
        : [];

    const onCloseImageView = () => {
      setViewImage(false);
    };

    return (
      <View style={{marginBottom: scale(10)}}>
        <ImageView
          images={imagesArray}
          imageIndex={imageIndex}
          visible={viewImage}
          onRequestClose={onCloseImageView}
        />
        <View style={{paddingHorizontal: scale(15)}}>
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
              {item?.question_category}
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
              {item?.question}
            </Text>
            {item?.buttonValue ? (
              <ButtonLabel label={item?.buttonValue} />
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
            <ScrollView
              contentContainerStyle={{
                paddingTop: scale(20),
              }}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {imagesArray.map((m, index) => (
                <TouchableOpacity
                  key={m?.id}
                  onPress={() => {
                    setImageIndex(index);
                    setViewImage(true);
                  }}
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
                {item?.notes}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{paddingBottom: scale(15)}}>
      <View>
        <FlatList
          keyExtractor={questionKeyExtractor}
          data={questions}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
});
const SurveyResponse = ({navigation, route}) => {
  const {details} = route.params;

  const _renderItem = ({item}) => {
    return (
      <View style={{paddingLeft: scale(10), paddingTop: scale(5)}}>
        <SurveyAnswers
          title={item}
          questions={details?.survey_response[item]}
        />
      </View>
    );
  };

  const printReport = () => {
    navigation.navigate('PDFViewer', {
      uri: `${API_URL}get_survey_response?survey_id=${details?.survey_id}`,
    });
  };

  let surveyQuestions = useMemo(
    () => Object.keys(details?.survey_response),
    [details?.survey_response],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: details?.station_name,
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
    <View style={commonStyles.container}>
      <TouchableOpacity
        onPress={printReport}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.printIcon}>
        <AntDesign name="printer" color={'#fff'} size={scale(30)} />
      </TouchableOpacity>
      <FlatList
        contentContainerStyle={{paddingBottom: scale(15)}}
        data={surveyQuestions}
        showsVerticalScrollIndicator={false}
        keyExtractor={keyExtractor}
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 0.7}}>
                <Text style={styles.textStationName}>
                  {details?.station_name}
                </Text>
              </View>
              <View style={styles.headerSection}>
                <Image
                  style={styles.dateIcon}
                  source={require('../../assets/icons/date.png')}
                />
                <Text style={styles.textDate}>
                  {moment(details?.date).format('DD MMM YYYY')}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.textNormal}>
                {'Station Code'} : {details?.station_code}
              </Text>
            </View>
          </View>
        }
        renderItem={_renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: scale(15),
    backgroundColor: '#3d3d3d',
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
    paddingVertical: scale(20),
    width: '90%',
    alignSelf: 'center',
  },
  headerSection: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textStationName: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(13),
    color: '#fff',
  },
  textNormal: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(11),
    textAlign: 'left',
    color: '#C5C5C5',
  },
  textDate: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(12),
    color: '#C5C5C5',
    textAlign: 'left',
    marginLeft: scale(5),
  },
  dateIcon: {
    height: scale(12),
    width: scale(12),
    tintColor: '#C5C5C5',
  },
  printIcon: {
    position: 'absolute',
    bottom: scale(30),
    right: scale(20),
    width: scale(45),
    height: scale(45),
    borderRadius: scale(50),
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});
export default SurveyResponse;
