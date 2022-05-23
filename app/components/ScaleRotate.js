import React, {useEffect, useState} from 'react';
import Slider from '@react-native-community/slider';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useScaleRotate} from '../context/ScaleRotateContext';
export default function ScaleRotate({frame}) {
  const {setTempRotate, tempRotate, setTempScale, tempScale} = useScaleRotate();
  const [scale, setScale] = useState(tempScale);
  const [rotate, setRotate] = useState(tempRotate);
  useEffect(() => {
    if (scale !== 0.2) {
      setTempScale(scale);
    } else {
      setScale(tempScale);
    }
  }, [scale]);

  useEffect(() => {
    if (rotate !== 0) {
      setTempRotate(rotate);
    }
  }, [rotate]);
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
          value={tempRotate}
          onValueChange={value => setRotate(value)}
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
          onValueChange={value => setScale(value)}
          value={scale}
        />
      </View>
    </View>
  );
}
