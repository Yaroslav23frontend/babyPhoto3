import React, { useEffect } from "react";
import Slider from "@react-native-community/slider";
import { View } from "react-native";
import { useActive } from "../context/ActiveContext";
import MaterialIcons from "./icons/MaterialIcons";
import Ionicons from "./icons/Ionicons";
import { useFilters } from "../context/FiltersContext";
import ExpandableSlider from "react-native-expandable-slider";
export default function Filters() {
  const {
    brightnessValue,
    setBrightnessValue,
    contrastValue,
    setContrastValue,
  } = useFilters();
  console.log(brightnessValue);
  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "grey",
        position: "absolute",
        bottom: 0,
      }}
    >
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
        <Ionicons name="contrast-outline" size={30} color="black" />
        <ExpandableSlider
          style={{ width: "90%", height: 24 }}
          min={-10}
          max={10}
          value={contrastValue}
          onSlide={(value) => setContrastValue(value)}
        />
      </View>
      <View
        style={{
          width: "90%",
          flexDirection: "row",
          marginLeft: "auto",
          marginRight: "auto",
          alignItems: "center",
          alignItems: "center",
          justifyContent: "center",
          height: 50,
        }}
      >
        <MaterialIcons name="brightness-medium" size={30} color="black" />
        <ExpandableSlider
          style={{ width: "90%", height: 24 }}
          min={1}
          max={5}
          value={brightnessValue}
          onSlide={(value) => setBrightnessValue(value)}
        />
      </View>
    </View>
  );
}
