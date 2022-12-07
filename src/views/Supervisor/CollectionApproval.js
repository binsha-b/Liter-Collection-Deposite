import {calendarFormat} from 'moment';
import React, {useLayoutEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {FONT_FAMILY} from '../../assets/fonts';
import Button from '../../common/Button';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Input from '../../common/InputOld';
import {appFont} from '../../utils';
import {commonStyles} from '../../utils/commonStyles';
import {myDefaultTheme} from '../../utils/theme';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const CollectionApproval = ({navigation, route}) => {
  const {stationName} = route.params;
  const toApprove = () => {
    navigation.navigate('CollectionConfirm', {stationName: stationName});
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

  return (
    <View style={commonStyles.container}>
      <View
        contentContainerStyle={{
          padding: scale(8),
          height: height,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={styles.collectionCode}>
          <Text style={styles.boldText}>#24243545675678</Text>
        </View>

        <View
          style={
            (styles.collectionContainer,
            {backgroundColor: colors.background, paddingHorizontal: scale(10)})
          }>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.normalText}>Date</Text>
            </View>
            <View style={styles.normalContainer}>
              <Text style={styles.normalText}>21-10-2022</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.normalText}>Location</Text>
            </View>
            <View style={styles.normalContainer}>
              <Text style={styles.normalText}>Saudi Arabia</Text>
            </View>
          </View>
        </View>

        <View style={styles.collectionContainer}>
          <View style={styles.collectionMode}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text style={styles.cashLabel}>MADA</Text>
            </View>
            <View style={styles.cashContainer}>
              <View style={styles.cashButton}>
                <Text style={styles.cashAmount}>20000</Text>
              </View>
            </View>
          </View>
          <View style={styles.collectionMode}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text style={styles.cashLabel}>Cash</Text>
            </View>
            <View style={styles.cashContainer}>
              <View style={styles.cashButton}>
                <Text style={styles.cashAmount}>20000</Text>
              </View>
            </View>
          </View>
          <View style={styles.collectionMode}>
            <View style={{flex: 0.7}}>
              <Text style={styles.cashLabel}>Credit Card</Text>
            </View>
            <View style={styles.cashContainer}>
              <View style={styles.cashButton}>
                <Text style={styles.cashAmount}>20000</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.totalContainer}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 0.7}}>
              <Text style={styles.totalLabel}>Total Amount(SAR)</Text>
            </View>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPrice}>50,000</Text>
            </View>
          </View>
        </View>

        <View style={styles.description}>
          <View style={{flexDirection: 'row'}}>
            <Input
              inputStyle={{
                minHeight: scale(90),
                marginTop: scale(5),
                backgroundColor: colors.secondary2,
              }}
              style={{width: '100%'}}
              multiline={true}
              numberOfLines={5}
              label={'Description'}
              placeholder={'Type here...'}
              // value={notes}
              textAlignVertical="top"
            />
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <View style={{width: '50%'}}>
            <Button onPress={toApprove}>
              <Text style={(styles.buttonSubmit, {color: colors.background})}>
                Approve
              </Text>
            </Button>
          </View>
          <View style={{width: '50%', marginLeft: scale(15)}}>
            <Button color={colors.disableText}>
              <Text style={(styles.buttonSubmit, {color: colors.background})}>
                Reject
              </Text>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonSubmit: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(14),
    includeFontPadding: false,
  },
  buttonContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(20),
    borderRadius: scale(10),

    alignSelf: 'center',
    flexDirection: 'row',
  },
  description: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    width: '100%',
    alignSelf: 'center',
  },
  totalPriceContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  totalPrice: {
    fontFamily: FONT_FAMILY.medium,
    fontSize: scale(13),
    color: colors.primary,
  },
  totalLabel: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(13),
    color: colors.secondary,
  },
  totalContainer: {
    backgroundColor: colors.background,
    paddingHorizontal: scale(10),
    borderRadius: scale(10),
    paddingVertical: scale(20),
    width: '100%',
    alignSelf: 'center',
  },
  cashAmount: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(12),
    alignSelf: 'center',
    color: colors.secondary,
  },
  cashButton: {
    backgroundColor: colors.background2,
    borderRadius: scale(10),
    paddingVertical: scale(5),
    width: '100%',
    alignSelf: 'center',
  },
  cashContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cashLabel: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(12),
    color: colors.secondary,
  },
  collectionMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scale(10),
  },
  collectionContainer: {
    marginTop: scale(15),
    backgroundColor: colors.background1,
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
    paddingTop: scale(10),
    width: '95%',
    alignSelf: 'center',
  },
  normalText: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(12),
    color: colors.secondary,
  },
  normalContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  boldText: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: scale(14),
    color: colors.secondary,
  },
  collectionCode: {
    marginTop: scale(15),
    backgroundColor: colors.background1,
    borderRadius: scale(10),
    paddingVertical: scale(10),
    alignSelf: 'center',
    paddingHorizontal: scale(80),
  },
});
export default CollectionApproval;
