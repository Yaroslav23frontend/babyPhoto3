import React from "react";
import ViewShot from "react-native-view-shot";
import Img from "../components/Img";
import { View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import HeaderFilter from "../components/HeaderFilter";
import { useRef } from "react";
import Frame from "../components/Frame";
import StickerItem from "../components/StickerItem";
import TextItem from "../components/TextItem";
import ScaleRotate from "../components/ScaleRotate";
const windowWidth = Dimensions.get("window").width;
const FrameScreen = ({ navigation }) => {
  const photoData = useSelector((state) => state.photoData);
  const text = useSelector((state) => state.text);
  const sticker = useSelector((state) => state.sticker);
  const frame = useSelector((state) => state.frame);
  const ref = useRef();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <HeaderFilter navigation={navigation} ref={ref} />
      <ViewShot
        options={{
          format: "jpg",
          quality: 1,
          width: 1080 / 2,
          height: 1080 / 2,
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          width: windowWidth,
          height: windowWidth,
          overflow: "hidden",
        }}
        // captureMode="update"
        ref={ref}
      >
        <Frame
          path={frame.framePath}
          imgWidth={photoData.adaptedWidth}
          imgHeight={photoData.adaptedHeight}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {photoData.photoURI !== null ? (
              <Img editor={true}></Img>
            ) : (
              <View></View>
            )}
            {text.map((el, id) => {
              return (
                <TextItem
                  key={`${el.text}-${id}`}
                  font={el?.font}
                  color={el?.color}
                  text={el?.text}
                  id={id}
                  idMain={el.id}
                />
              );
            })}
            {sticker.map((el, id) => {
              return (
                <StickerItem
                  key={`${id}-${el.stickerPath}-${new Date()}-sticker`}
                  id={el.id}
                  path={el.stickerPath}
                  colactionId={el.colactionId}
                />
              );
            })}
          </View>
        </Frame>
      </ViewShot>
      <ScaleRotate frame={true} />
    </View>
  );
};
export default FrameScreen;
