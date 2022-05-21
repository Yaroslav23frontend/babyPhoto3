import {configureStore} from '@reduxjs/toolkit';
import {reducerPhotoData} from './reducers/reducerPhotoData';
import {reducerText} from './reducers/reducerText';
import {reducerStickerData} from './reducers/reducerSticker';
import {reducerFrameData} from './reducers/reducerFrame';
import {reducerDelChanges} from './reducers/reducerDelChanges';
export const store = configureStore({
  reducer: {
    photoData: reducerPhotoData,
    text: reducerText,
    sticker: reducerStickerData,
    frame: reducerFrameData,
    delChanges: reducerDelChanges,
  },
});
