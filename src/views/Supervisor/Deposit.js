import React, {useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {myDefaultTheme} from '../../utils/theme';
import {scale} from 'react-native-size-matters';
import {commonStyles} from '../../utils/commonStyles';
import Feather from 'react-native-vector-icons/Feather';
import CountBox from '../../common/CountBox';
import {FONT_FAMILY} from '../../assets/fonts';

const {colors} = myDefaultTheme;
const {height} = Dimensions.get('window');

const RadioButton = ({selected = false, label = ''}) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        borderRadius: scale(8),
        alignItems: 'center',
      }}>
      <View
        style={{
          width: scale(18),
          height: scale(18),
          borderRadius: scale(50),
          padding: scale(5),
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: selected ? '#fff' : colors.disableText,
          marginRight: scale(10),
        }}>
        {selected && (
          <View
            style={{
              width: scale(10),
              height: scale(10),
              borderRadius: scale(50),
              backgroundColor: selected ? '#fff' : colors.disableText,
            }}
          />
        )}
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(14),
            color: selected ? '#fff' : colors.disableText,
          }}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
const Deposit = ({navigation}) => {
  const [loadingCount, setLoadingCount] = useState(false);

  const depositProceed = () => {
    navigation.navigate('DepositProceed');
  };

  return (
    <View style={commonStyles.container}>
      <TouchableOpacity
        onPress={depositProceed}
        hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
        style={styles.buttonCheck}>
        <Feather name="check" color={'#fff'} size={scale(18)} />
      </TouchableOpacity>
      <>
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            countSmall={'SAR 50,000'}
            label={'Cash in Hand'}
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
        <View style={styles.countContainer}>
          <CountBox
            loading={loadingCount}
            countSmall={'SAR 50,000'}
            label={'Collection Transferred'}
            textAlign={'center'}
          />
        </View>
      </>
      <View style={styles.depositModeContainer}>
        <View style={styles.depositModeActive}>
          <RadioButton selected={true} label={'Bank Transfer'} />
        </View>

        <View style={styles.depositMode}>
          <RadioButton selected={false} label={'Treasury Deposit'} />
        </View>

        <View style={styles.depositMode}>
          <RadioButton selected={false} label={'ATM Transfer'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: scale(10),
  },
  depositModeContainer: {backgroundColor: colors.background1, height: height},
  depositModeActive: {
    margin: scale(10),
    backgroundColor: colors.primary,
    borderRadius: scale(10),
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
  },
  depositMode: {
    margin: scale(10),
    backgroundColor: colors.background2,
    borderRadius: scale(10),
    paddingVertical: scale(12),
    paddingHorizontal: scale(10),
  },
  buttonCheck: {
    position: 'absolute',
    bottom: scale(30),
    right: scale(20),
    width: scale(45),
    height: scale(45),
    borderRadius: scale(50),
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
});

export default Deposit;
