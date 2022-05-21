import React, { useRef } from "react";
import ViewShot from "react-native-view-shot";
import Img from "./Img";
import { View } from "react-native";
import { useSelector } from "react-redux";
import TopNavMain from "./TopNavMain";
import SticerItemList from "./StikerItemList";
import TextItemList from "./TextItemList";

const WorkSpace = (props) => {
  const photoData = useSelector((state) => state.photoData);

  console.log("workSpace");
  const ref = useRef();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TopNavMain ref={ref} navigation={props.navigation} />
      <ViewShot
        options={{
          format: "jpg",
          quality: 1,
          width: (photoData.adaptedWidth + 1080 - photoData.adaptedWidth) / 2,

          height:
            (photoData.adaptedHeight +
              (1080 - photoData.adaptedWidth) *
                (photoData.adaptedHeight / photoData.adaptedWidth)) /
            2,
        }}
        style={{
          alignItems: "center",
          justifyContent: "center",

          width: photoData.adaptedWidth,
          height: photoData.adaptedHeight,
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
          <Img editor={true}></Img>

          <TextItemList />
          <SticerItemList />
        </View>
      </ViewShot>
    </View>
  );
};
export default WorkSpace;
