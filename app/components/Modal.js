import React from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useActive } from "../context/ActiveContext";
import {
  frameDelete,
  photoData,
  stickerDeleteAll,
  textDeleteAll,
} from "../store/action";

const MyModal = ({ onCloseMassege, massege, funcType, navigation }) => {
  const {
    modalVisability,
    setModalVisability,
    setImgRotate,
    setFooterVisability,
    setBrightness,
    setContrast,
  } = useActive();
  const dispatch = useDispatch();
  const deleteChanges = useSelector((state) => state.delChanges);
  function onSubmit(funcType) {
    if (funcType === "delChanges") {
      dispatch({ type: textDeleteAll, payload: [] });
      dispatch({ type: stickerDeleteAll, payload: [] });
      dispatch({ type: frameDelete, payload: {} });
      dispatch({ type: photoData, payload: deleteChanges });
      setImgRotate(0);
      setFooterVisability(true);
      setBrightness(1);
      setContrast(1);
    }
    if (funcType === "delAll") {
      dispatch({ type: textDeleteAll, payload: [] });
      dispatch({ type: stickerDeleteAll, payload: [] });
      dispatch({ type: frameDelete, payload: {} });
      setImgRotate(0);
      setFooterVisability(true);
      setBrightness(1);
      setContrast(1);
      navigation.goBack();
    }
  }
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisability}
        onRequestClose={() => {
          if (onCloseMassege !== "" || onCloseMassege !== undefined) {
            Alert.alert(onCloseMassege);
          }
          setModalVisability(!modalVisability);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{massege}</Text>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisability(!modalVisability)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisability(!modalVisability);
                  onSubmit(funcType);
                }}
              >
                <Text style={styles.textStyle}>Ok</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    margin: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default MyModal;
