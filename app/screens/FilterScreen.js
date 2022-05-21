import React from "react";
import ViewShot from "react-native-view-shot";
import Img from "../components/Img";
import { View, Dimensions } from "react-native";
import { useSelector } from "react-redux";
import Filters from "../components/Filters";
import HeaderFilter from "../components/HeaderFilter";
import { useRef } from "react";
const windowWidth = Dimensions.get("window").width;
const FilterScreen = ({ navigation }) => {
  const photoData = useSelector((state) => state.photoData);
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
      <HeaderFilter navigation={navigation} ref={ref} />
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
          {photoData.photoURI !== null ? (
            <Img
              width={photoData.adaptedWidth}
              height={photoData.adaptedHeight}
              uri={photoData.photoURI}
              filters={true}
            ></Img>
          ) : (
            <View></View>
          )}
        </View>
      </ViewShot>
      <Filters />
    </View>
  );
};
export default FilterScreen;
