import React from 'react';
import {View, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

export default function Header({functionAcept, functionCancel}) {
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
          functionAcept();
        }}>
        <Icon name="angle-down" size={24} color="black" />
      </Pressable>
      <Pressable
        onPress={() => {
          functionCancel();
        }}>
        <Icon name="close-a" size={24} color="black" />
      </Pressable>
    </View>
  );
}
