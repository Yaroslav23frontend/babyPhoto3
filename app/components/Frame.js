import React, { useEffect, useRef, useState } from "react";
import { Animated, PanResponder, Dimensions, View } from "react-native";
import { useActive } from "../context/ActiveContext";

import { storeLocalData } from "../localstore/localstore";
import AsyncStorage from "@react-native-async-storage/async-storage";
const windowWidth = Dimensions.get("window").width;

export default function Frame({ children, path }) {
  const {
    tempRotate,
    setTempRotate,
    active,
    tempScale,
    setTempScale,
    imgWidth,
    imgHeight,
  } = useActive();
  const pan = useRef(new Animated.ValueXY()).current;
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const LoadPosition = () => {
    AsyncStorage.getItem(`${0}-item`).then((data) => {
      pan.setValue({
        x: JSON.parse(data).x,
        y: JSON.parse(data).y,
      });
    });
    AsyncStorage.getItem(`${0}-item-rotate`).then((data) => {
      setRotate(Number(data));
      setTempRotate(Number(data));
    });
    AsyncStorage.getItem(`${0}-item-scale`).then((data) => {
      setScale(Number(data));
      setTempScale(Number(data));
    });
  };
  useEffect(() => {
    LoadPosition();
  }, []);
  useEffect(() => {
    if (active === 0) {
      setRotate(tempRotate);
      storeLocalData(`${0}-item-rotate`, tempRotate);
    }
  }, [tempRotate]);
  useEffect(() => {
    if (active === 0) {
      setScale(tempScale);
      storeLocalData(`${0}-item-scale`, tempScale);
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
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (evt, gestureState) => {
        pan.flattenOffset();
        const x = pan.x;
        const y = pan.y;
        storeLocalData(`${0}-item`, { x: x, y: y });
      },
    })
  ).current;

  return (
    <View
      style={{
        height: windowWidth,
        width: windowWidth,
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
      accessible={true}
    >
      <Animated.View
        style={{
          width: imgWidth,
          height: imgHeight,
          transform: [
            { translateX: pan.x },
            { translateY: pan.y },
            { rotate: rotate + "deg" },
            { scale: scale },
          ],
          position: "absolute",
        }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
      <Animated.Image
        source={path}
        style={{
          height: windowWidth,
          width: windowWidth,
        }}
        {...panResponder.panHandlers}
      ></Animated.Image>
    </View>
  );
}
