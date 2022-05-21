import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import StickersList from '../components/StickersList';
import EditHeader from '../components/EditHeader';
import {useActive} from '../context/ActiveContext';
const {stickersData} = require('../../assets/data');
export default function StickersScreen({navigation}) {
  const [active, setActive] = useState(0);
  const {stickerListVisability, framesVisability} = useActive();
  const footerStickerItemName = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          setActive(item.id);
        }}>
        <View style={styles.footerStickerItemName}>
          <Text
            style={[
              styles.footerTextItem,
              {
                color: active == item.id ? '#9665CE' : '#AB9CBE',
              },
            ]}>
            {item.title.toUpperCase()}
          </Text>
        </View>
      </TouchableHighlight>
    );
  };
  if (stickerListVisability) {
    return (
      <View style={styles.container}>
        <EditHeader />
        <View style={{position: 'absolute', bottom: 0}}>
          <FlatList
            horizontal={true}
            data={stickersData}
            renderItem={footerStickerItemName}
            keyExtractor={item => item.title + `${new Date()}-name`}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}>
          <StickersList
            data={stickersData[active]}
            id={active}
            navigation={navigation}></StickersList>
        </View>
      </View>
    );
  }

  if (framesVisability === true) {
    return (
      <View style={styles.container}>
        <EditHeader />
        <View
          style={{
            alignSelf: 'flex-start',
            height: '100%',
            width: '100%',
            position: 'absolute',
          }}>
          <StickersList
            data={stickersData[6]}
            id={active}
            navigation={navigation}></StickersList>
        </View>
      </View>
    );
  }
  return <></>;
}

// Styles

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
  },

  footerStickerItemName: {
    height: 60,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },

  footerTextItem: {
    fontFamily: 'Sitka Small',
    textAlign: 'center',
  },

  stickerItem: {
    height: Dimensions.get('window').height * 0.333,
    width: Dimensions.get('window').width * 0.333,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
