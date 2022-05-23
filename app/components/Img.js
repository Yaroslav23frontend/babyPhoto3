import React, {useEffect} from 'react';
import {ImageBackground} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useActive} from '../context/ActiveContext';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ColorMatrix,
  concatColorMatrices,
  contrast,
  brightness,
} from 'react-native-color-matrix-image-filters';
import {useFilters} from '../context/FiltersContext';
import {useScaleRotate} from '../context/ScaleRotateContext';
export default function Img({filters, rotate, editor, frame, children}) {
  const {setActive, imgRotate, mirrorX, mirrorY} = useActive();
  const {brightnessValue, contrastValue, setContrastValue} = useFilters();
  const {tempRotate, setTempRotate, tempScale, setTempScale} = useScaleRotate();
  const data = useSelector(state => state.photoData);
  console.log(brightnessValue);
  console.log(contrastValue);
  useEffect(() => {
    if (contrastValue === 0) {
      setContrastValue(1);
    }
  });
  return (
    <View
      style={{
        width: data.adaptedWidth,
        height: data.adaptedHeight,
      }}>
      <Pressable
        onPress={() => {
          setActive('');
        }}>
        {filters === true ? (
          // <Surface
          //   style={{
          //     width: data.adaptedWidth,
          //     height: data.adaptedHeight,
          //   }}>
          //   <ImageFilters
          //     brightness={brightness}
          //     contrast={contrast}
          //     width={data.adaptedWidth}
          //     height={data.adaptedWidth}>
          //     {{uri: data.photoURI}}
          //   </ImageFilters>
          // </Surface>
          <ColorMatrix
            matrix={concatColorMatrices([
              brightness(brightnessValue),
              contrast(contrastValue),
            ])}>
            <ImageBackground
              source={{uri: data.photoURI}}
              style={{
                width: data.adaptedWidth,
                height: data.adaptedHeight,
              }}></ImageBackground>
          </ColorMatrix>
        ) : (
          <></>
        )}
        {editor ? (
          <ImageBackground
            source={{uri: data.photoURI}}
            style={{
              width: data.adaptedWidth,
              height: data.adaptedHeight,
              transform: [{rotate: imgRotate + 'deg'}],
            }}>
            {children}
          </ImageBackground>
        ) : (
          <></>
        )}
        {frame ? (
          <ImageBackground
            source={{uri: data.photoURI}}
            style={{
              width: data.adaptedWidth,
              height: data.adaptedHeight,
              transform: [{rotate: tempRotate + 'deg'}, {scale: tempScale}],
            }}>
            {children}
          </ImageBackground>
        ) : (
          <></>
        )}
        {rotate ? (
          <ImageBackground
            source={{uri: data.photoURI}}
            style={{
              width: data.adaptedWidth,
              height: data.adaptedHeight,
              filter: 'brightness(0%)',
              transform: [
                {rotate: imgRotate + 'deg'},
                {scaleX: mirrorX},
                {scaleY: mirrorY},
              ],
            }}></ImageBackground>
        ) : (
          <></>
        )}
      </Pressable>
    </View>
  );
}
