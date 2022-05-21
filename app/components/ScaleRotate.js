import React from 'react';
import Slider from '@react-native-community/slider';
import {View} from 'react-native';
import {useActive} from '../context/ActiveContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
export default function ScaleRotate({frame}) {
  const {setTempRotate, tempRotate, setTempScale, tempScale} = useActive();

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: frame ? 'absolute' : 'relative',
        bottom: 0,
        zIndex: 10000000000000000000000,
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
          height: 50,
        }}>
        <Icon name="rotate-left" size={32} color="black" />
        <Slider
          style={{width: '90%', height: 24}}
          minimumValue={-180}
          maximumValue={180}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={value => setTempRotate(value)}
          value={tempRotate}
        />
      </View>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          marginLeft: 'auto',
          marginRight: 'auto',
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}>
        <Icon name="resize" size={32} color="black" />

        <Slider
          style={{width: '90%', height: 24}}
          minimumValue={0.2}
          maximumValue={2}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
          onValueChange={value => setTempScale(value)}
          value={tempScale}
        />
      </View>
    </View>
  );
}
