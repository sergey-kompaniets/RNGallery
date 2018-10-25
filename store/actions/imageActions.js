import { CHANGE_IMAGE, SHOW_IMAGES, ERROR_IMAGE } from "./index";

export const changeImage = src => {
  return {
    type: CHANGE_IMAGE,
    payload: src
  };
};

export const getImages = url => async dispatch => {
  function onSuccess(success) {
    dispatch({ type: SHOW_IMAGES, payload: success });
    return success;
  }
  function onError(error) {
    dispatch({
      type: ERROR_IMAGE,
      error
    });
  }
  try {
    const res = await fetch(url);
    const success = await res.json();
    return onSuccess(success);
  } catch (error) {
    return onError(error);
  }
};
