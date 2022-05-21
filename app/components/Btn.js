import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import Icon from "./Icon";

export default function MainScreen({ func, type, name, size }) {
  return (
    <TouchableWithoutFeedback onPress={() => func()}>
      <View style={styles.btn}>
        <Icon type={type} name={name} size={size} />
      </View>
    </TouchableWithoutFeedback>
  );
}

// Styles

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },

  btnPressed: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#9665CE",
  },
});
