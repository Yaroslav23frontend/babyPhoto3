import { frameData } from "../action";
import { frameDelete } from "../action";
export function reducerFrameData(state = {}, action) {
  switch (action.type) {
    case frameData:
      return {
        framePath: action.payload.framePath,
        colactionId: action.payload.colactionId,
        id: action.payload.id,
      };
    case frameDelete:
      return {};
    default:
      return state;
  }
}
