import {
  CHANGE_IMAGE_SUCCESS,
  SUCCESS_IMAGES,
  ERROR_IMAGE,
  START_IMAGES
} from "./index";

export const changeImage = src => {
  return {
    type: CHANGE_IMAGE_SUCCESS,
    payload: src
  };
};

export const getImages = () => async dispatch => {
  onStart();
  try {
    const res = await fetch(
      "https://api.unsplash.com/photos/?client_id=cf49c08b444ff4cb9e4d126b7e9f7513ba1ee58de7906e4360afc1a33d1bf4c0"
    );
    const success = await res.json();

    return onSuccess(success);
  } catch (error) {
    return onError(error);
  }

  function onStart() {
    dispatch({ type: START_IMAGES });
  }

  function onSuccess(success) {
    dispatch({ type: SUCCESS_IMAGES, payload: success });
    return success;
  }
  function onError(error) {
    dispatch({
      type: ERROR_IMAGE,
      error
    });
  }
};
