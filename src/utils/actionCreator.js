import { ADD_TO_LIKEDLIST, REMOVE_FROM_LIKEDLIST } from "./actions";
import { createStore } from "redux";
import { findAllByTestId } from "@testing-library/react";

// const initialState = {
//   movie: '',
//   id: '',
//   source: '',
//   page: '',
//   isLiked: false,
//   isBlocked: false,
// };

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_LIST":
      const check1 = state.find((element) => element.id === action.text.id);
      if (!check1) {
        return state.concat({
          movie: action.text,
          id: action.text.id,
          isLiked: false,
          isBlocked: false,
        });
      } else {
        return state;
      }
    case "IS_LIKE":
      const likeIndex = state.findIndex(
        (element) => element.id === action.text.id
      );
      state[likeIndex].isLiked = true;
      return state;
    case "IS_BLOCK":
      const blockIndex = state.findIndex(
        (element) => element.id === action.text.id
      );
      state[blockIndex].isBlocked = true;
      return state;
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
