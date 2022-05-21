import React, { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Animated,
  StyleSheet,
  PanResponder,
  Text,
  Pressable,
} from "react-native";
import { useActive } from "../context/ActiveContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storeLocalData } from "../localstore/localstore";
export default function TextItem({
  color,
  font,
  text,
  id,
  idMain,
  width,
  height,
}) {
  console.log("Item text" + idMain);
  const pan = useRef(new Animated.ValueXY()).current;
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);

  const LoadPosition = () => {
    AsyncStorage.getItem(`${idMain}-item`).then((data) => {
      pan.setValue({
        x: JSON.parse(data).x,
        y: JSON.parse(data).y,
      });
    });
    AsyncStorage.getItem(`${idMain}-item-rotate`).then((data) => {
      setRotate(Number(data));
    });
    AsyncStorage.getItem(`${idMain}-item-scale`).then((data) => {
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
    editText,
    setEditText,
    setTextEditVisability,
    setFooterVisability,
  } = useActive();
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
        if (Number(JSON.stringify(x)) > width / 2) {
          pan.setValue({ x: width / 2, y: Number(JSON.stringify(y)) });
        } else if (Number(JSON.stringify(x)) < (width / 2) * -1) {
          pan.setValue({ x: (width / 2) * -1, y: Number(JSON.stringify(y)) });
        } else if (Number(JSON.stringify(y)) < (height / 2) * -1) {
          pan.setValue({ y: (height / 2) * -1, x: Number(JSON.stringify(x)) });
        } else if (Number(JSON.stringify(y)) > height / 2) {
          pan.setValue({ y: height / 2, x: Number(JSON.stringify(x)) });
        }
        storeLocalData(`${idMain}-item`, { x: x, y: y });
      },
    })
  ).current;
  useEffect(() => {
    if (active === idMain) {
      setRotate(tempRotate);
      storeLocalData(`${idMain}-item-rotate`, tempRotate);
    }
  }, [tempRotate]);
  useEffect(() => {
    if (active === idMain) {
      setScale(tempScale);
      storeLocalData(`${idMain}-item-scale`, tempScale);
    }
  }, [tempScale]);

  return (
    <Animated.View
      style={{
        transform:
          rotate !== 0
            ? [
                { translateX: pan.x },
                { translateY: pan.y },
                { rotate: rotate + "deg" },
                { scale: scale },
              ]
            : [{ translateX: pan.x }, { translateY: pan.y }, { scale: scale }],
        zIndex: 1000000000000,
        position: "absolute",
      }}
      {...panResponder.panHandlers}
    >
      <Pressable
        onPress={() => {
          setActive(idMain);

          if (active === idMain) {
            setTextEditVisability(true);
            setFooterVisability(false);
          }
          setEditText({
            data: {
              ...editText.data,
              id: id,
              text: text,
              font: font,
              color: color,
            },
            edit: true,
          });
          setTempRotate(rotate);
          setTempScale(scale);
        }}
      >
        <Text
          style={{
            fontFamily: font,
            fontSize: 30,
            flexWrap: "wrap",
            alignItems: "flex-start",
            flexDirection: "row",
            color: color,
            borderBottomWidth: 2,
            borderBottomWidth: 2,
            borderTopWidth: 2,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: active === idMain ? "#fff" : "rgba(0,0,0,0)",
            borderStyle: "solid",
          }}
        >
          {text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold",
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: "blue",
    borderRadius: 5,
  },
});
