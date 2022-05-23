import React from 'react';
import {Dimensions} from 'react-native';
import {useActive} from '../context/ActiveContext';
import {useDispatch, useSelector} from 'react-redux';
import {frameDelete, photoData} from '../store/action';
import {textDeleteAll, stickerDeleteAll} from '../store/action';
import Header from './Header';
import {captureRef} from 'react-native-view-shot';
import {useFilters} from '../context/FiltersContext';
const HeaderFilter = React.forwardRef((props, ref) => {
  const photoDataPrev = useSelector(state => state.photoData);
  const frame = useSelector(state => state.frame);
  const windowWidth = Dimensions.get('window').width;
  const dispatch = useDispatch();
  const {imgRotate, setImgRotate, setActive} = useActive();
  const {setBrightnessValue, setContrastValue} = useFilters();
  const saveImage = async () => {
    console.log(ref.current);
    captureRef(ref, {
      format: 'jpg',
      quality: 1,
    }).then(uri => {
      const newURI = {
        ...photoDataPrev,
        photoURI: uri,
      };
      console.log('uri');
      console.log(uri);
      if (Math.abs(imgRotate) === 270 || Math.abs(imgRotate) === 90) {
        console.log('90 rotate');

        dispatch({
          type: photoData,
          payload: {
            ...photoDataPrev,
            photoURI: uri,
            adaptedWidth:
              Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
                ? photoDataPrev.adaptedHeight
                : photoDataPrev.adaptedWidth,
            adaptedHeight:
              Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
                ? photoDataPrev.adaptedWidth
                : photoDataPrev.adaptedHeight,
            height:
              Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
                ? photoDataPrev.width
                : photoDataPrev.height,
            width:
              Math.abs(imgRotate) === 90 || Math.abs(imgRotate) === 270
                ? photoDataPrev.height
                : photoDataPrev.width,
          },
        });
        setImgRotate(0);
      } else {
        if (Object.keys(frame).length !== 0) {
          console.log('frame');
          console.log({
            ...photoDataPrev,
            photoURI: uri,
            adaptedWidth: windowWidth,
            adaptedHeight: windowWidth,
            height: 1080,
            width: 1080,
          });
          dispatch({type: textDeleteAll, payload: []});
          dispatch({type: stickerDeleteAll, payload: []});
          dispatch({type: frameDelete, payload: {}});
          dispatch({
            type: photoData,
            payload: {
              ...photoDataPrev,
              photoURI: uri,
              adaptedWidth: windowWidth,
              adaptedHeight: windowWidth,
              height: 1080,
              width: 1080,
            },
          });
        } else {
          dispatch({
            type: photoData,
            payload: {
              ...photoDataPrev,
              photoURI: uri,
            },
          });
        }
      }
    });
  };
  console.log(photoDataPrev);
  function functionAcept() {
    saveImage();
    props.navigation.navigate('Editor');
    setActive('');
    setBrightnessValue(1);
    setContrastValue(1);
  }
  function functionCancel() {
    props.navigation.navigate('Editor');
    setBrightnessValue(1);
    setContrastValue(1);
    setActive('');
  }

  return (
    <Header functionAcept={functionAcept} functionCancel={functionCancel} />
  );
});
export default HeaderFilter;
