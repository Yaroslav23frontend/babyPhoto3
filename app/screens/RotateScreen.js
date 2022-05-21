import React from "react";
import ViewShot from "react-native-view-shot";
import Img from "../components/Img";
import { View } from "react-native";
import { useSelector } from "react-redux";
import HeaderFilter from "../components/HeaderFilter";
import { useRef } from "react";
import RotateTools from "../components/RotateTools";
import { useActive } from "../context/ActiveContext";
const RotateScreen = ({ navigation }) => {
  const photoData = useSelector((state) => state.photoData);
  const ref = useRef();
  const { imgRotate } = useActive();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HeaderFilter navigation={navigation} ref={ref} />
      <ViewShot
        options={{
          format: "jpg",
          quality: 1,
          width:
            Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
              ? (photoData.adaptedHeight +
                  (1080 - photoData.adaptedWidth) *
                    (photoData.adaptedHeight / photoData.adaptedWidth)) /
                2
              : (photoData.adaptedWidth + 1080 - photoData.adaptedWidth) / 2,
          height:
            Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
              ? (photoData.adaptedWidth + 1080 - photoData.adaptedWidth) / 2
              : (photoData.adaptedHeight +
                  (1080 - photoData.adaptedWidth) *
                    (photoData.adaptedHeight / photoData.adaptedWidth)) /
                2,
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width:
            Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
              ? photoData.adaptedHeight
              : photoData.adaptedWidth,
          height:
            Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
              ? photoData.adaptedWidth
              : photoData.adaptedHeight,
        }}
        // captureMode="update"
        ref={ref}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {photoData.photoURI !== null ? (
            <Img rotate={true}></Img>
          ) : (
            <View></View>
          )}
        </View>
      </ViewShot>
      <RotateTools />
    </View>
  );
};
export default RotateScreen;
