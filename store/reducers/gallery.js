import { SHOW_IMAGES, CHANGE_IMAGE, ERROR_IMAGE } from "../actions/index";

const initialState = {
  src: "",
  data: [],
  error: null
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_IMAGES:
      return { ...state, data: action.payload };
    case ERROR_IMAGE:
      return { ...state, error: action.error };
    case CHANGE_IMAGE:
      return { ...state, src: action.payload };

    default:
      return state;
  }
}
