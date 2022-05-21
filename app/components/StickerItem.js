import React, {useRef, useState} from 'react';
import {
  Animated,
  StyleSheet,
  PanResponder,
  Pressable,
  Image,
} from 'react-native';
import {storeLocalData} from '../localstore/localstore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import {useActive} from '../context/ActiveContext';

const StickerItem = React.memo(props => {
  const pan = useRef(new Animated.ValueXY()).current;
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const LoadPosition = () => {
    AsyncStorage.getItem(`${props.id}-item`).then(data => {
      pan.setValue({
        x: JSON.parse(data).x,
        y: JSON.parse(data).y,
      });
    });
    AsyncStorage.getItem(`${props.id}-item-rotate`).then(data => {
      setRotate(Number(data));
    });
    AsyncStorage.getItem(`${props.id}-item-scale`).then(data => {
      setScale(Number(data));
    });
  };
  useEffect(() => {
    LoadPosition();
  }, []);
  const {
    tempRotate,
    setTempRotate,
    active,
    setActive,
    tempScale,
    setTempScale,
  } = useActive();
  useEffect(() => {
    if (active === props.id) {
      setRotate(tempRotate);
      storeLocalData(`${props.id}-item-rotate`, tempRotate);
    }
  }, [tempRotate]);
  useEffect(() => {
    if (active === props.id) {
      setScale(tempScale);
      storeLocalData(`${props.id}-item-scale`, tempScale);
    }
  }, [tempScale]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        let x = pan.x;
        let y = pan.y;

        if (Number(JSON.stringify(x)) > props.width / 2) {
          pan.setValue({x: props.width / 2, y: Number(JSON.stringify(y))});
        } else if (Number(JSON.stringify(x)) < (props.width / 2) * -1) {
          pan.setValue({
            x: (props.width / 2) * -1,
            y: Number(JSON.stringify(y)),
          });
        } else if (Number(JSON.stringify(y)) < (props.height / 2) * -1) {
          pan.setValue({
            y: (props.height / 2) * -1,
            x: Number(JSON.stringify(x)),
          });
        } else if (Number(JSON.stringify(y)) > props.height / 2) {
          pan.setValue({y: props.height / 2, x: Number(JSON.stringify(x))});
        }

        storeLocalData(`${props.id}-item`, {x: x, y: y});
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform:
          rotate !== 0
            ? [
                {translateX: pan.x},
                {translateY: pan.y},
                {rotate: rotate + 'deg'},
                {scale: scale},
              ]
            : [{translateX: pan.x}, {translateY: pan.y}, {scale: scale}],
        position: 'absolute',
        zIndex: 100000000000000000000,
      }}
      {...panResponder.panHandlers}>
      <Pressable
        onPress={() => {
          setTempRotate(rotate);
          setActive(props.id);
          setTempScale(scale);
        }}
        style={{
          borderBottomWidth: 2,
          borderTopWidth: 2,
          borderLeftWidth: 2,
          borderRightWidth: 2,
          borderStyle: 'solid',
          borderColor: active === props.id ? '#fff' : 'rgba(0,0,0,0)',
        }}>
        <Image source={props.path} style={styles.image} />
      </Pressable>
    </Animated.View>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  image: {
    height: 70,
    width: 70,
  },
});
export default StickerItem;
