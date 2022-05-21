import { photoData } from "../action";
const initialState = {
  photoURI: null,
  originalPhotoURI: null,
  photoData: null,
  photoWidth: null,
  photoHieght: null,
  adaptedHeight: null,
  adaptedWidth: null,
  id: "",
};
export function reducerPhotoData(state = initialState, action) {
  switch (action.type) {
    case photoData:
      return {
        photoURI: action.payload.photoURI,
        adaptedHeight: action.payload.adaptedHeight,
        adaptedWidth: action.payload.adaptedWidth,
        id: action.payload.id,
        width: action.payload.width,
        height: action.payload.height,
      };
    default:
      return state;
  }
}
