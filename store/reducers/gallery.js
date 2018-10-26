import {
  SUCCESS_IMAGES,
  CHANGE_IMAGE_SUCCESS,
  ERROR_IMAGE,
  START_IMAGES
} from "../actions/index";

const initialState = {
  src: "",
  data: [],
  error: null,
  loading: false
};

export default function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case START_IMAGES:
      return {
        ...state,
        loading: true
      };
    case SUCCESS_IMAGES:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ERROR_IMAGE:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case CHANGE_IMAGE_SUCCESS:
      return {
        ...state,
        src: action.payload
      };

    default:
      return state;
  }
}
