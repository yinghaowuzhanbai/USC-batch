import { ADD_TO_LIKEDLIST, REMOVE_FROM_LIKEDLIST } from "./actions";
import { createStore } from "redux";

const initialState = {
  movies: [],
  isLiked: false,
  isBlocked: false,
};

const reducer = (state = initialState, action = {}) => {
  console.log({ state, action });
  return state;
};

const store = createStore(reducer, initialState);

export default store;
