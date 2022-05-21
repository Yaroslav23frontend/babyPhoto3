import React from "react";
import { useActive } from "../context/ActiveContext";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import Btn from "./Btn";
export default function RotateTools({ frame, navigation }) {
  const { imgRotate, setImgRotate, setMirrorX, setMirrorY, mirrorX, mirrorY } =
    useActive();

  return (
    <View style={styles.footer}>
      <View style={styles.footerBtns}>
        <Btn
          func={() => {
            setMirrorX(mirrorX === 1 ? -1 : 1);
          }}
          type={"MaterialCommunityIcons"}
          name={"reflect-horizontal"}
          size={30}
        />

        <Btn
          func={() => {
            setMirrorY(mirrorY === 1 ? -1 : 1);
          }}
          type={"MaterialCommunityIcons"}
          name={"reflect-vertical"}
          size={30}
        />
        <Btn
          func={() => {
            setImgRotate(imgRotate === 270 ? 0 : imgRotate + 90);
          }}
          type="Feather"
          name="rotate-cw"
          size={40}
        />

        <Btn
          func={() => {
            setImgRotate(imgRotate === -270 ? 0 : imgRotate - 90);
          }}
          type="Feather"
          name="rotate-ccw"
          size={40}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  footer: {
    width: Dimensions.get("window").width,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "absolute",
    bottom: 0,
    zIndex: 1000000000,
    width: "100%",
  },

  footerBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});
