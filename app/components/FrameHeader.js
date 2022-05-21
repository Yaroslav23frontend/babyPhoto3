import React from 'react';
import {View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';
import {useActive} from '../context/ActiveContext';
import {useDispatch} from 'react-redux';
import {frameDelete} from '../store/action';
export default function FrameHeader() {
  const {
    setFrameActive,
    frameActive,
    setFooterVisability,
    setHeaderVisability,
    setActive,
  } = useActive();

  const dispatch = useDispatch();
  if (frameActive) {
    return (
      <View
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 50,
          paddingRight: 10,
          paddingLeft: 10,
          zIndex: 100000,
          backgroundColor: 'grey',
          position: 'absolute',
          top: 0,
        }}>
        <Pressable
          onPress={() => {
            setFrameActive(false);
            setFooterVisability(true);
            setHeaderVisability(true);
            setActive('');
          }}>
          <Icon name="angle-down" size={24} color="black" />
        </Pressable>
        <Pressable
          onPress={() => {
            setFrameActive(false);
            setFooterVisability(true);
            setHeaderVisability(true);
            dispatch({type: frameDelete, payload: {}});
          }}>
          <Icon name="close-a" size={24} color="black" />
        </Pressable>
      </View>
    );
  }
  return <></>;
}
