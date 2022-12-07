/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme, profilePlaceholder} from '../utils/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import VersionCheck from 'react-native-version-check';
import {FONT_FAMILY} from '../assets/fonts';
const {colors} = myDefaultTheme;
const SideDrawer = ({navigation}) => {
  const DrawerCard = props => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: scale(18),
          borderBottomColor: 'rgba(169, 169, 169, 0.5)',
          borderBottomWidth: scale(1),
        }}
        // onPress={() => {
        //   navigation.toggleDrawer();
        //   navigation.navigate(props?.toPage);
        // }}
      >
        <Image
          source={props?.icon}
          style={{height: scale(20), width: scale(20)}}
        />
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(13.5),
            color: colors.secondary,
            marginLeft: scale(10),
            textAlign: 'left',
          }}>
          {props?.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: '#ffffff',
      }}>
      <View
        style={{
          flex: 0.25,
          justifyContent: 'flex-end',
          paddingHorizontal: scale(15),
          paddingBottom: scale(30),
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: scale(56),
              height: scale(56),
              borderRadius: scale(50),
              borderWidth: scale(3),
              borderColor: colors.primary,
              overflow: 'hidden',
            }}>
            <Image
              resizeMode="contain"
              style={{height: '100%', width: '100%'}}
              source={{
                uri: profilePlaceholder,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: scale(10),
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: FONT_FAMILY.bold,
                fontSize: scale(16),
                textAlign: 'left',
              }}>
              Supervisor
            </Text>
            <Text
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(11),
                textAlign: 'left',
              }}>
              test@gmail.com
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: scale(1.5),
          backgroundColor: colors.primary,
        }}
      />
      <View
        style={{
          flex: 0.75,
          padding: scale(20),
        }}>
        <View style={{flex: 1}}>
          {/* <DrawerCard
            toPage="Home"
            icon={require('../assets/images/icons/home.png')}
            title="Home"
            // titleArabic='ملف التعريف'
          /> */}
          <DrawerCard
            toPage="Profile"
            icon={require('../assets/icons/profile.png')}
            title="Profile"
          />

          <DrawerCard
            toPage="Settings"
            icon={require('../assets/icons/settings.png')}
            title="Settings"
          />
        </View>
        <TouchableOpacity
          hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: scale(10),
            borderRadius: scale(10),
            backgroundColor: colors.primary,
            alignSelf: 'flex-start',
          }}
          //onPress={onLogut}
        >
          <AntDesign size={scale(18)} name="logout" color="#fff" />
          <Text
            style={{
              fontFamily: FONT_FAMILY.semibold,
              fontSize: scale(13),
              color: '#fff',
              marginLeft: scale(10),
            }}>
            {'Log out'}
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            color: '#1E3354',
            fontFamily: FONT_FAMILY.regular,
            marginTop: scale(10),
            opacity: 0.7,
          }}>
          {'version'} {VersionCheck.getCurrentVersion()}
        </Text>
      </View>
    </View>
  );
};

export default SideDrawer;
