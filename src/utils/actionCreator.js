import { ADD_TO_LIKEDLIST, REMOVE_FROM_LIKEDLIST } from "./actions";
import { createStore } from "redux";

// const initialState = {
//   movie: '',
//   id: ''
//   isLiked: false,
//   isBlocked: false,
// };


const reducer = (state = [], action) => {
  switch(action.type){
    case 'IS_LIKE':
      const check1 = state.find(element => element.id === action.text.id);
      if (!check1){
        return state.concat(
          {
            movie: action.text,
            id: action.text.id,
            isLiked: true,
            isBlocked: false});
      }else {
        return state;
      }
    case 'IS_BLOCK':
      const check2 = state.find(element => element.id === action.text.id);
      if (!check2){
        return state.concat(
          {
            movie: action.text,
            id: action.text.id,
            isLiked: false,
            isBlocked: true});
      }else {return state}
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
