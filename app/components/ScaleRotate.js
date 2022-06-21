import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useScaleRotate } from "../context/ScaleRotateContext";
import ExpandableSlider from "react-native-expandable-slider";
export default function ScaleRotate({ frame }) {
  const { setTempRotate, tempRotate, setTempScale, tempScale } =
    useScaleRotate();

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "rgba(0,0,0,0.5)",
        position: frame ? "absolute" : "relative",
        bottom: 0,
        zIndex: 10000000000000000000000,
      }}
    >
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
          justifyContent: "center",
          alignItems: "center",
          height: 50,
        }}
      >
        <Icon name="rotate-left" size={32} color="black" />
        <ExpandableSlider
          style={{ width: "90%", height: 24 }}
          min={-180}
          max={180}
          value={tempRotate}
          onSlide={(value) => setTempRotate(value)}
        />
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
        }}
      >
        <Icon name="resize" size={32} color="black" />

        <ExpandableSlider
          style={{ width: "90%", height: 24 }}
          min={0.2}
          max={2}
          value={tempScale}
          onSlide={(value) => setTempScale(value)}
        />
      </View>
    </View>
  );
}
