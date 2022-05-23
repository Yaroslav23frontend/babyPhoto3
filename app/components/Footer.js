import React from 'react';
import {useDispatch} from 'react-redux';
import {useActive} from '../context/ActiveContext';
import {textDelete, stickerDelete, frameDelete} from '../store/action';
import ScaleRotate from './ScaleRotate';
import {StyleSheet, View, Dimensions, Text} from 'react-native';
import Btn from './Btn';
import {useFilters} from '../context/FiltersContext';
export default function Footer({frame, navigation}) {
  const dispatch = useDispatch();
  const {
    active,
    footerVisability,
    setFooterVisability,
    setImgRotate,
    setTextEditVisability,
    setStickerListVisability,
    setEditText,
    setHeaderVisability,
    setMirrorX,
    setMirrorY,
    setFramesVisability,
    setActive,
  } = useActive();
  console.log(active);
  if (footerVisability) {
    return (
      <View style={styles.footer}>
        {active !== '' ? <ScaleRotate /> : <></>}

        <View style={styles.footerBtns}>
          <Btn
            func={() => {
              setTextEditVisability(true);
              setFooterVisability(false);
              setEditText({
                data: {
                  text: '',
                  font: '',
                  color: '',
                  scale: '',
                  opacity: '',
                  point: '',
                  rotateText: '',
                  surfaceHeight: '',
                  surfaceWidth: '',
                },
                edit: false,
              });
            }}
            type="MaterialCommunityIcons"
            name="format-text"
            size={40}
          />
          <Btn
            func={() => {
              navigation.navigate('Rotate');
              setImgRotate(0);
              setMirrorX(1);
              setMirrorY(1);
            }}
            type="Feather"
            name="rotate-ccw"
            size={40}
          />
          <Btn
            func={() => {
              setFramesVisability(true);
              setFooterVisability(false);
              setHeaderVisability(false);
              setActive(0);
            }}
            type={'MaterialCommunityIcons'}
            name={'image-frame'}
            size={45}
          />
          <Btn
            func={() => {
              setStickerListVisability(true);
              setFooterVisability(false);
              setHeaderVisability(false);
            }}
            type="MaterialCommunityIcons"
            name="sticker-outline"
            size={40}
          />
          <Btn
            func={() => {
              navigation.navigate('Filters');
            }}
            type="Ionicons"
            name="color-filter-outline"
            size={40}
          />

          <Btn
            func={() => {
              dispatch({type: textDelete, payload: active});
              dispatch({type: stickerDelete, payload: active});
              dispatch({type: frameDelete, payload: {}});
              setActive('');
            }}
            type="SimpleLineIcons"
            name="trash"
            size={36}
          />
        </View>
      </View>
    );
  }

  return <></>;
}
const styles = StyleSheet.create({
  footer: {
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(255,255,255,0.5)',
    position: 'absolute',
    bottom: 0,
    zIndex: 1000000000,
    width: '100%',
  },

  footerBtns: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
});
