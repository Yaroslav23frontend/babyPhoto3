import React, {useEffect, useRef, useState} from 'react';
import {
  TextInput,
  TouchableWithoutFeedback,
  View,
  FlatList,
  Keyboard,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useSelector, useDispatch} from 'react-redux';
import {text, textEdit} from '../store/action';
import {storeLocalData} from '../localstore/localstore';
import {useActive} from '../context/ActiveContext';
import {useId} from '../context/IdContext';
export default function TextEd() {
  const {
    editText,
    setEditText,
    textEditVisability,
    setTextEditVisability,
    footerVisability,
    setFooterVisability,
  } = useActive();
  const [tempText, setTempText] = useState('');
  const [tempColor, setTempColor] = useState('#FFA9D0');
  const [tempFont, setTempFont] = useState('');
  const textData = useSelector(state => state.text);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [menuVisability, setMenuVisability] = useState(true);
  const {id, setId} = useId();
  const colors = [
    '#FFA9D0',
    '#FF6DAE',
    '#FFADFF',
    '#CE48FD',
    '#A7A9FF',
    '#4745FF',
    '#84DEFF',
    '#00AEFF',
    '#00FE96',
    '#07BB07',
    '#FFA106',
    '#DE1306',
    '#D406A1',
    '#940682',
    '#7606D2',
    '#4C0689',
    '#8B8B8B',
    '#060606',
    '#FFFFFF',
  ];
  const fonts = [
    '',
    'Brush Script Std',
    'Barberry Letters ',
    'Gochi Hand Cyrillic',
    'Comic Sans MS',
    'Brochure Cyr',
    'Swiss Siena',
    'First One Stripe',
  ];
  const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setMenuVisability(true);
  });
  const keyboardDidShowListener = Keyboard.addListener(
    'keyboardDidShow',
    () => {
      setMenuVisability(false);
    },
  );
  useEffect(() => {
    setTempText(editText.data.text ? editText.data.text : '');
    setTempColor(editText.data.color ? editText.data.color : '#FFA9D0');
    setTempFont(editText.data.font ? editText.data.font : '');
  }, [editText]);
  const renderItem = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setTempColor(item.item);
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: item.item,
            width: 25,
            height: 25,
            borderRadius: 25,
            margin: 5,
          }}
          transporent>
          {tempColor === item.item ? (
            <Icon name="angle-down" size={8} color="black" />
          ) : (
            <View></View>
          )}
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const renderItemFont = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setTempFont(item.item);
          console.log(tempFont);
        }}>
        <View
          style={{
            margin: 10,
            padding: 10,
            borderColor: tempFont === item.item ? '#fff' : 'rgba(0,0,0,0)',
            borderWidth: tempFont === item.item ? 2 : 0,
            borderRadius: 5,
          }}
          transporent>
          <Text
            style={{fontFamily: `${item.item}`, fontSize: 20, color: '#fff'}}>
            Baby
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };
  if (textEditVisability) {
    return (
      <View
        style={{
          flex: 1,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,1)',
          zIndex: 10000,
          position: 'absolute',
        }}>
        <View
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 50,
            backgroundColor: 'rgba(0,0,0,0.8)',
            paddingRight: 10,
            paddingLeft: 10,
          }}>
          <TouchableWithoutFeedback
            onPress={() => {
              const data = {
                text: tempText,
                font: tempFont,
                color: tempColor,
                scale: '',
                opacity: '',
                point: '',
                rotateText: '',
                surfaceHeight: '',
                surfaceWidth: '',
                id: id,
              };

              if (editText.edit === true) {
                setEditText({data: {...data}, edit: false});
                dispatch({
                  type: textEdit,
                  payload: {data: {...data, id: editText.data.id}},
                });
              } else {
                dispatch({
                  type: text,
                  payload: data,
                });
                storeLocalData(`${id}-item`, {x: 0, y: 0});
                storeLocalData(`${id}-item-rotate`, 0);
                storeLocalData(`${id}-item-scale`, 1);
                setId(id + 1);
              }
              setTempColor('#FFA9D0');
              setTempFont('');
              setTempText('');
              setTextEditVisability(false);
              setFooterVisability(true);
            }}>
            <Icon name="angle-down" size={24} color="white" />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              Keyboard.dismiss;
              setTextEditVisability(false);
              setTempColor('#FFA9D0');
              setTempFont('Sitka Small');
              setTempText('');
              setFooterVisability(true);
            }}>
            <Icon name="close-a" size={24} color="white" />
          </TouchableWithoutFeedback>
        </View>

        <View
          style={{
            flex: 1,
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            marginBottom: menuVisability ? 128 : 0,
            height: '100%',
            fontFamily: tempFont,
            color: tempColor,
          }}>
          <TextInput
            editable
            ref={inputRef}
            multiline={true}
            style={{
              fontFamily: tempFont,
              color: tempColor,
              position: 'relative',
              fontSize: 50,
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              width: '100%',
              height: '100%',
            }}
            value={tempText}
            onChangeText={data => {
              setTempText(data);
            }}
          />
        </View>
        {menuVisability ? (
          <View
            style={{
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0,0,0,0.5)',
              bottom: 0,
              padding: 10,
              zIndex: 10000,
            }}>
            <FlatList
              horizontal
              data={fonts}
              renderItem={renderItemFont}
              keyExtractor={(item, index) => `${item}-${index}`}
            />
            <FlatList
              horizontal
              data={colors}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${item}-${index}`}
            />
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
  return <></>;
}
