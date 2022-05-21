import React from "react";
import { StyleSheet, View, FlatList, Dimensions, Image } from "react-native";
import { useDispatch } from "react-redux";
import { stickerData, frameData } from "../store/action";
import { storeLocalData } from "../localstore/localstore";
import { useId } from "../context/IdContext";
import { useActive } from "../context/ActiveContext";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
export default function StickersList({ data, navigation }) {
  const { id, setId } = useId();
  const dispatch = useDispatch();
  const {
    setHeaderVisability,
    setFrameActive,
    setFooterVisability,
    setActive,
    setStickerListVisability,
    framesVisability,
    setFramesVisability,
  } = useActive();
  const stickerItem = ({ item }) => {
    return (
      <View style={styles.stickerItemRow}>
        {data.title !== "Frames" ? (
          <Pressable
            onPress={() => {
              dispatch({
                type: stickerData,
                payload: {
                  stickerPath: item,
                  colactionId: data.id,
                  id: id,
                },
              });
              setStickerListVisability(false);
              setHeaderVisability(true);
              setFooterVisability(true);
              storeLocalData(`${id}-item`, { x: 0, y: 0 });
              storeLocalData(`${id}-item-rotate`, 0);
              storeLocalData(`${id}-item-scale`, 1);

              setId(id + 1);
            }}
          >
            <View style={styles.stickerItem}>
              <Image source={item} style={styles.image} />
            </View>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              dispatch({
                type: frameData,
                payload: {
                  framePath: item,
                  colactionId: data.id,
                  id: id,
                },
              });
              setStickerListVisability(false);
              setHeaderVisability(true);
              setFrameActive(true);
              setFooterVisability(true);
              setFramesVisability(false);
              setActive(0);
              setId(id + 1);
              navigation.navigate("Frame");
            }}
          >
            <View style={styles.stickerItem}>
              <Image source={item} style={styles.image} />
            </View>
          </Pressable>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        marginBottom: framesVisability ? 0 : 50,
        marginTop: 50,
      }}
    >
      <FlatList
        data={data.arr}
        numColumns={3}
        renderItem={stickerItem}
        keyExtractor={(item, id) => id + `${new Date()}-stickers-col`}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  stickerItemRow: {
    flex: 3,
    flexDirection: "row",
    width: "100%",
  },

  stickerItem: {
    height: Dimensions.get("window").height * 0.333,
    width: Dimensions.get("window").width * 0.333,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: 70,
    width: 70,
  },
});
