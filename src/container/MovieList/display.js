import React from "react";
import './style.css'
import {useState, useEffect} from "react";
import { dispatch } from "redux";
import store from "../../utils/actionCreator";


// const initialState = {
//   movie: 'error',
//   id: 'error',
//   isLiked: false,
//   isBlocked: false,
// };

export default function MovieListContainer({element, addLikeList, blockList}){
    let stringPath;
    if (element.content.poster_path!==null) {
      stringPath = `https://image.tmdb.org/t/p/w500${element.content.poster_path}`
    }
    const item_store = store.getState().find(ele => ele.id === element.content.id);
    let text;
    if (!item_store.isLiked){
      text = "LIKE";
    } else {
      text = "LIKED";
    }
    return (
            <div className="movie_element">
              {element.content.poster_path!==null? <div><img className="movie_element_pic" src={stringPath} alt=""/></div>:<div class="null_img"><div>{element.content.original_title}</div></div>}
              <span>{element.content.original_title}</span>
              <div>
                <button onClick={addLikeList} id={element.content.id}>{text}</button>
                <button onClick={blockList} id={element.content.id}>BLOCK</button>
              </div>
              <span>{element.content.release_date}</span>
              <span>
                {element.content.overview}
              </span>
            </div>
    )
  }
  