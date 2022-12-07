import React, {memo, useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import {myDefaultTheme} from '../utils/theme';
import ImageChooseSlider from './ImageChooseSlider';
import Input from './InputOld';
import Feather from 'react-native-vector-icons/Feather';
import {action} from 'mobx';
import {observer, Observer} from 'mobx-react';
import {FONT_FAMILY} from '../assets/fonts';

const {colors} = myDefaultTheme;

const keyExtractor = item => item.id.toString();

const Button = ({label = '', selected = false, onPress}) => {
  const onPressButton = () => {
    onPress(label);
  };
  return (
    <TouchableOpacity
      onPress={onPressButton}
      style={{
        width: scale(70),
        borderRadius: scale(5),
        paddingHorizontal: scale(3),
        alignItems: 'center',
        borderWidth: 1,
        borderColor: selected ? colors.rippleColor : colors.background2,
        backgroundColor: selected ? colors.rippleColor : colors.background2,
        marginHorizontal: scale(5),
      }}>
      {selected ? (
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(14),
            color: colors.primary,
          }}>
          {label}
        </Text>
      ) : (
        <Text
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(14),
            color: '#000',
          }}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const StationCheckCard = ({title, questions}) => {
  const [collapsed, setCollapsed] = useState(false);
  const onPressCollapse = () => {
    setCollapsed(prevCollapse => !prevCollapse);
  };

  const renderItem = ({item}) => {
    const onChangeNotes = action(text => {
      item.notes = text;
    });

    const setSelectedImages = action(images => {
      item.images = images;
    });

    const onPressButton = action(value => {
      item.buttonValue = value;
    });

    return (
      <Observer>
        {() => (
          <View
            style={{
              borderTopWidth: 1,
              borderTopColor: colors.secondary2,
              marginTop: scale(15),
              paddingTop: scale(15),
              paddingBottom: scale(5),
            }}>
            <Text
              // numberOfLines={1}
              style={{
                fontFamily: FONT_FAMILY.regular,
                fontSize: scale(12),
                color: '#252724',
                textAlign: 'left',
              }}>
              {item?.question}
            </Text>

            {item?.question_type === 'Yes/No' && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginTop: scale(10),
                }}>
                <Button
                  selected={item?.buttonValue === item?.response1}
                  onPress={onPressButton}
                  label={item?.response1}
                />
                <Button
                  selected={item?.buttonValue === item?.response2}
                  onPress={onPressButton}
                  label={item?.response2}
                />
              </View>
            )}
            <Input
              inputStyle={{
                minHeight: scale(90),
                marginTop: scale(5),
                backgroundColor: colors.secondary2,
              }}
              style={{width: '100%'}}
              multiline={true}
              numberOfLines={5}
              label={'Notes'}
              placeholder={'Type here...'}
              // value={notes}
              onChangeText={onChangeNotes}
              textAlignVertical="top"
            />
            <View style={{marginTop: scale(15)}}>
              <ImageChooseSlider
                selectedImages={setSelectedImages}
                editable={true}
                label={'Images'}
              />
            </View>
          </View>
        )}
      </Observer>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPressCollapse}
      activeOpacity={0.6}
      hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}
      style={{
        borderRadius: scale(10),
        borderWidth: 2,
        borderColor: colors.secondary2,
        padding: scale(13),
        marginTop: scale(15),
        width: '90%',
        alignSelf: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          numberOfLines={1}
          style={{
            fontFamily: FONT_FAMILY.semibold,
            fontSize: scale(13),
            flex: 1,
            textAlign: 'left',
          }}>
          {title}
        </Text>
        <View
          style={{
            width: scale(26),
            height: scale(26),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Feather
            color={colors.primary}
            size={scale(20)}
            name={!collapsed ? 'chevron-down' : 'chevron-up'}
          />
        </View>
      </View>
      {collapsed && (
        <FlatList
          keyExtractor={keyExtractor}
          data={questions}
          renderItem={renderItem}
        />
      )}
    </TouchableOpacity>
  );
};

export default memo(observer(StationCheckCard));
