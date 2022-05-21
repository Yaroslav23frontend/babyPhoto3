import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";

import TextEd from "../components/TextEd";
import StickersScreen from "./StickersScreen";
import Footer from "../components/Footer";
import WorkSpace from "../components/WorkSpace";

function EditorScreen({ navigation }) {
  return (
    <View style={styles.container} pointerEvents="auto">
      <WorkSpace navigation={navigation} />

      <StickersScreen navigation={navigation} />

      <TextEd />

      <Footer navigation={navigation} />
    </View>
  );
}

export default EditorScreen;

//Styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
  },

  headerLeftSide: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
  },

  headerRightSide: {
    flexDirection: "row",
    width: "50%",
    alignItems: "center",
    justifyContent: "flex-end",
  },

  footer: {
    width: Dimensions.get("window").width,
    backgroundColor: "#fff",
    position: "absolute",
    bottom: 0,
    zIndex: 100,
    width: "100%",
  },

  footerBtns: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
});
