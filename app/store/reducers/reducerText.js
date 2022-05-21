import {
  text,
  textDelete,
  textDeleteAll,
  textEdit,
  textPosition,
} from "../action";

const initialState = [
  {
    text: "",
    font: "",
    color: "",
    scale: "",
    opacity: "",
    point: "",
    rotateText: "",
    surfaceHeight: "",
    surfaceWidth: "",
    id: "",
    x: 100,
    y: 100,
  },
];
export function reducerText(state = [], action) {
  switch (action.type) {
    case text:
      return [
        ...state,
        {
          text: action.payload.text,
          font: action.payload.font,
          color: action.payload.color,
          scale: action.payload.scale,
          opacity: action.payload.opacity,
          point: action.payload.point,
          rotateText: action.payload.rotateText,
          surfaceHeight: action.payload.surfaceHeight,
          surfaceWidth: action.payload.surfaceWidth,
          id: action.payload.id,
        },
      ];
    case textEdit:
      const editedText = {
        ...state[action.payload.data.id],
        text: action.payload.data.text,
        color: action.payload.data.color,
        font: action.payload.data.font,
      };
      const newText = [...state];
      newText[action.payload.data.id] = editedText;
      return newText;
    case textDelete:
      return [...state.filter((el) => el.id !== action.payload)];
    case textDeleteAll:
      return [];
    default:
      return state;
  }
}
