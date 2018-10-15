import { SHOW_IMAGE } from "../actions/index";

const initialState = {
  src: ""
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_IMAGE:
      return { ...state, src: action.payload };
    default:
      return state;
  }
}
