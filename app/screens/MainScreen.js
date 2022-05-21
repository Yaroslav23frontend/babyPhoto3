import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Linking,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {delChanges, photoData} from '../store/action';
import {useId} from '../context/IdContext';
import {storeLocalData} from '../localstore/localstore';
const windowHeight = Dimensions.get('window').height - 200;
const windowWidth = Dimensions.get('window').width;

function MainScreen({navigation, ...props}) {
  const [touchedCamera, setTouchedCamera] = useState(false);
  const [touchedGallery, setTouchedGallery] = useState(false);
  const [posValCameraBtn] = useState(new Animated.Value(windowHeight));
  const [posValGalleryBtn] = useState(new Animated.Value(windowHeight));
  const [posValFooter] = useState(new Animated.Value(60));
  const {id, setId} = useId();
  const dispatch = useDispatch();
  const openCameraPicker = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    const pickerResult = await await launchCamera(options);
    processImage(pickerResult);
  };

  const openImagePicker = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
      selectionLimit: 1,
    };
    let result = await launchImageLibrary(options);

    if (!result.didCancel) {
      console.log(result);
      processImage(result);
    }
  };

  const processImage = pickerResult => {
    if (pickerResult.assets[0].uri) {
      const aspectRatio =
        pickerResult.assets[0].height > pickerResult.assets[0].width
          ? windowHeight / pickerResult.assets[0].height
          : windowWidth / pickerResult.assets[0].width;
      const surfaceHeight = pickerResult.assets[0].height * aspectRatio;
      const surfaceWidth = pickerResult.assets[0].width * aspectRatio;
      console.log(pickerResult);
      dispatch({
        type: photoData,
        payload: {
          photoURI: pickerResult.assets[0].uri,
          width: pickerResult.assets[0].width,
          height: pickerResult.assets[0].height,
          adaptedHeight: surfaceHeight,
          adaptedWidth: surfaceWidth,
          id: id,
        },
      });
      dispatch({
        type: delChanges,
        payload: {
          photoURI: pickerResult.assets[0].uri,
          width: pickerResult.assets[0].width,
          height: pickerResult.assets[0].height,
          adaptedHeight: surfaceHeight,
          adaptedWidth: surfaceWidth,
          id: id,
        },
      });
      storeLocalData(`${id}-item`, {x: 0, y: 0});
      storeLocalData(`${id}-item-rotate`, 0);
      storeLocalData(`${id}-item-scale`, 1);
      setId(id + 1);
      navigation.navigate('Editor');
    }
  };

  const DownUpAnimation = () => {
    Animated.sequence([
      Animated.timing(posValCameraBtn, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
      Animated.timing(posValGalleryBtn, {
        toValue: 0,
        duration: 750,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
      Animated.timing(posValFooter, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
        easing: Easing.sin,
      }),
    ]).start();
  };
  DownUpAnimation();
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Animated.View style={{top: posValCameraBtn}}>
          <TouchableWithoutFeedback
            onPress={() => {
              openCameraPicker();
            }}
            onPressIn={() => setTouchedCamera(true)}
            onPressOut={() => setTouchedCamera(false)}>
            <View style={touchedCamera ? styles.btnPressed : styles.btn}>
              <Icon name="camera" size={84} color={'#AB9CBE'} />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>

        <Animated.View style={{marginTop: 20, top: posValGalleryBtn}}>
          <TouchableWithoutFeedback
            onPress={() => {
              openImagePicker();
            }}
            onPressIn={() => setTouchedGallery(true)}
            onPressOut={() => setTouchedGallery(false)}>
            <View style={touchedGallery ? styles.btnPressed : styles.btn}>
              <Icon name="picture" size={84} color={'#AB9CBE'} />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </View>

      <Animated.View
        style={[
          styles.footer,
          {
            top: posValFooter,
            flexDirection: 'row',
          },
        ]}>
        <TouchableWithoutFeedback
          onPress={() => {
            Linking.openURL('http://bestphotoapps.ru/privacy-policy.html');
          }}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableWithoutFeedback>

        <TouchableOpacity
          onPress={() => {
            Linking.openSettings();
          }}
          style={styles.footerBtn}
          activeOpacity={0.8}>
          <Icon name="settings" size={32} color={'#AB9CBE'} />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
export default MainScreen;
// Styles

const styles = StyleSheet.create({
  container: {
    flex: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    borderColor: '#AB9CBE',
    borderWidth: 1,
    borderRadius: 150,
    padding: 35,
  },
  btnPressed: {
    borderColor: '#9665CE',
    borderWidth: 1,
    borderRadius: 150,
    padding: 35,
    backgroundColor: '#9665CE',
  },
  footer: {
    width: windowWidth,
    height: 40,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },
  link: {
    textDecorationLine: 'underline',
    fontSize: 18,
    color: 'black',
    alignSelf: 'flex-end',
  },

  footerBtn: {
    marginBottom: -5,
    alignSelf: 'flex-end',
  },
});
