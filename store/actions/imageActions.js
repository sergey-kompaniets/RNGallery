import { SHOW_IMAGE } from "./index";

export function changeImage(src) {
  return {
    type: SHOW_IMAGE,
    payload: src
  };
}
