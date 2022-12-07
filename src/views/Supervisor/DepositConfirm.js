import {useIsFocused} from '@react-navigation/native';
import React, {useLayoutEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
import HeaderBackIcon from '../../common/HeaderBackIcon';
import Button from '../../common/Button';
import DashedLine from 'react-native-dashed-line';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;
const {height, width} = Dimensions.get('window');

const DepositConfirm = ({navigation}) => {
  const [loadingCount, setLoadingCount] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const onPressCollapse = () => {
    setCollapsed(prevCollapse => !prevCollapse);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Deposit',
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
      <Modal
        animationIn="slideInUp"
        animationOut="slideOutDown"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText1}>Submitted Successfully</Text>
            <Text style={styles.modalText2}>
              Thank you for making transactions
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Feather name="check" color={'#fff'} size={scale(18)} />
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{backgroundColor: colors.background1, height: height}}>
        <TouchableOpacity
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={styles.bank}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              source={require('../../assets/icons/bank.png')}
              style={{
                height: scale(22),
                width: scale(22),
                tintColor: '#fff',
                marginHorizontal: scale(2),
              }}
            />
            <Text
              numberOfLines={1}
              style={(styles.titleText, {color: colors.background})}>
              Bank
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                numberOfLines={1}
                style={{
                  fontFamily: FONT_FAMILY.semibold,
                  fontSize: scale(13),
                  textAlign: 'left',
                  color: colors.background,
                  marginLeft: scale(150),
                }}>
                Alinma Bank
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{marginTop: scale(25), marginHorizontal: scale(15)}}
          dashColor={colors.disableText}
        />
        <View style={styles.cashContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flex: 0.7, marginBottom: 10}}>
              <Text style={styles.textNormal1}>Amount</Text>
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.buttonAmount}>
                <Text style={styles.textNormal1}>600</Text>
              </View>
            </View>
          </View>
        </View>
        <DashedLine
          dashLength={10}
          dashThickness={1}
          dashGap={5}
          style={{marginHorizontal: scale(15)}}
          dashColor={colors.disableText}
        />
        <TouchableOpacity
          onPress={onPressCollapse}
          activeOpacity={0.6}
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={styles.attachmentContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Feather
              color={colors.primary}
              size={scale(20)}
              name={'file-text'}
            />
            <Text
              numberOfLines={1}
              style={(styles.titleText, {color: colors.disableText})}>
              Attachment
            </Text>
          </View>
          <View style={styles.captureContainer}>
            <TouchableOpacity style={styles.captureImg}>
              <Image
                source={require('../../assets/images/sampleDesign/petrolPumb.png')}
                style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.captureImg}>
              <Image
                source={require('../../assets/images/sampleDesign/petrolPumb.png')}
                style={{height: '100%', width: '100%'}}
              />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>

        <View style={styles.confirmContainer}>
          <Button onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textNormal}>Confirm</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};

export default DepositConfirm;
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },

  buttonClose: {
    backgroundColor: '#2ECC71',
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText1: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: scale(18),
    color: colors.secondary,
  },
  modalText2: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: scale(12),
    color: colors.disableText,
  },
  textNormal: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(14),
    color: colors.background,
    includeFontPadding: false,
  },
  textNormal1: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: scale(12),
    color: colors.secondary,
  },
  confirmContainer: {
    marginHorizontal: scale(10),
    marginTop: scale(50),
    paddingVertical: scale(12),
  },
  captureImg: {
    width: width / 3 - scale(14),
    height: height * 0.14,
    borderRadius: scale(10),
    backgroundColor: 'grey',
    marginRight: scale(10),
    overflow: 'hidden',
  },
  captureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
  },
  titleText: {
    fontFamily: FONT_FAMILY.semibold,
    fontSize: scale(13),
    flex: 1,
    textAlign: 'left',
    marginHorizontal: scale(10),
  },
  attachmentContainer: {
    borderRadius: scale(10),

    marginTop: scale(15),
    width: '90%',
    alignSelf: 'center',

    backgroundColor: colors.background2,
    paddingVertical: scale(10),
    paddingHorizontal: scale(5),
    flexDirection: 'column',
  },
  buttonAmount: {
    backgroundColor: colors.background2,
    borderRadius: scale(10),
    paddingVertical: scale(5),
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  amountContainer: {
    flex: 0.3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  cashContainer: {
    backgroundColor: colors.background1,
    paddingHorizontal: scale(15),
    borderRadius: scale(10),
    paddingVertical: scale(20),
    width: '95%',
    alignSelf: 'center',
  },
  bank: {
    borderRadius: scale(10),

    marginTop: scale(15),
    width: '92%',
    alignSelf: 'center',

    backgroundColor: colors.primary,
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
  },
});
