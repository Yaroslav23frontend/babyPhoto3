import React from 'react';
import {ImageBackground} from 'react-native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useActive} from '../context/ActiveContext';
import {View} from 'react-native';

import {useSelector} from 'react-redux';

export default function Img({filters, rotate, editor, children}) {
  const {setActive, brightness, contrast, imgRotate, mirrorX, mirrorY} =
    useActive();

  const data = useSelector(state => state.photoData);

  return (
    <View
      style={{
        width: data.adaptedWidth,
        height: data.adaptedHeight,
      }}>
      <Pressable
        onPress={() => {
          setActive(false);
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
          <ImageBackground
            source={{uri: data.photoURI}}
            style={{
              width: data.adaptedWidth,
              height: data.adaptedHeight,
            }}>
            {children}
          </ImageBackground>
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
