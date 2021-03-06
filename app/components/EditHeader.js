import React from "react";
import { View, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Fontisto";
import { useActive } from "../context/ActiveContext";
export default function EditHeader() {
  const {
    setFooterVisability,
    setStickerListVisability,
    setFramesVisability,
    setHeaderVisability,
    setActive,
  } = useActive();
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        height: 50,
        backgroundColor: "rgba(0,0,0,0.8)",
        paddingRight: 10,
        paddingLeft: 10,
        zIndex: 10000000,
      }}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          setStickerListVisability(false);
          setFooterVisability(true);
          setFramesVisability(false);
          setHeaderVisability(true);
          setActive("");
        }}
      >
        <Icon name="angle-down" size={20} color="white" />
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={() => {
          setStickerListVisability(false);
          setFooterVisability(true);
          setFramesVisability(false);
          setHeaderVisability(true);
          setActive("");
        }}
      >
        <Icon name="close-a" size={16} color="white" />
      </TouchableWithoutFeedback>
    </View>
  );
}
