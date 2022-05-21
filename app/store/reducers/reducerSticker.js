import { stickerDelete, stickerDeleteAll, stickerData } from "../action";
export function reducerStickerData(state = [], action) {
  switch (action.type) {
    case stickerData:
      return [
        ...state,
        {
          stickerPath: action.payload.stickerPath,
          colactionId: action.payload.colactionId,
          id: action.payload.id,
        },
      ];

    case stickerDelete:
      return [...state.filter((el) => el.id !== action.payload)];
    case stickerDeleteAll:
      return [];
    default:
      return state;
  }
}
