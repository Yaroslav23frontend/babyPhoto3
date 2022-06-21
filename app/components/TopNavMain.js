import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { PermissionsAndroid } from "react-native";
import Share from "react-native-share";
import { useActive } from "../context/ActiveContext";
import Btn from "./Btn";
import MyModal from "./Modal";
import AwesomeAlert from "react-native-awesome-alerts";
import CameraRoll from "@react-native-community/cameraroll";
import { captureRef } from "react-native-view-shot";
import * as permissions from "react-native-permissions";
import { request, PERMISSIONS } from "react-native-permissions";
const TopNavMain = React.forwardRef((props, ref) => {
  const { headerVisability, setModalVisability } = useActive();
  const [massege, setMassege] = useState("");
  const [onCloseMassege, setOnCloseMassege] = useState("");
  const [funcType, setFuncType] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const saveToLibrary = async () => {
    request(PERMISSIONS.WRITE_EXTERNAL_STORAGE).then((result) => {
      console.log(result);
    });
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission = await PermissionsAndroid.check(permission);
    captureRef(ref, {
      format: "jpg",
      quality: 1,
    }).then(async (uri) => {
      CameraRoll.save(uri);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 1000);
    });
  };

  const shareImage = async () => {
    captureRef(ref, {
      format: "jpg",
      quality: 1,
    }).then(async (uri) => {
      console.log(uri);
      await Share.open({ url: uri })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          err && console.log(err);
        });
    });
  };
  if (headerVisability) {
    return (
      <View style={styles.header}>
        <MyModal
          navigation={props.navigation}
          onCloseMassege={onCloseMassege}
          massege={massege}
          funcType={funcType}
        />
        <AwesomeAlert show={showAlert} title="Saved to gallery" />
        <View style={styles.headerLeftSide}>
          <Btn
            func={() => {
              setModalVisability(true);
              setFuncType("delAll");
              setMassege("All changes will be lost. Do you want close?");
            }}
            type="SimpleLineIcons"
            name="close"
            size={36}
          />
          <Btn
            func={() => {
              setModalVisability(true);
              setFuncType("delChanges");
              setOnCloseMassege("All changes deleted");
              setMassege(
                "All changes will be deleted. Do you want to delete changes?"
              );
            }}
            type="SimpleLineIcons"
            name="trash"
            size={36}
          />
        </View>

        <View style={styles.headerRightSide}>
          <Btn
            func={() => {
              shareImage();
            }}
            type="SimpleLineIcons"
            name="share"
            size={36}
          />

          <Btn
            func={() => {
              saveToLibrary();
            }}
            type="FontAwesome"
            name="save"
            size={36}
          />
        </View>
      </View>
    );
  }

  return <></>;
});
//Styles

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    position: "absolute",
    top: 0,
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
});
export default TopNavMain;
