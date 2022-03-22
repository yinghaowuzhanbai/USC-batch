import React from "react";
import './style.css'
import store from '../../utils/actionCreator.js';
import {useState, useEffect} from "react";
import MovieListContainer from './display';
import { isContentEditable } from "@testing-library/user-event/dist/utils";

export default function Container({data, addLikeList, blockList}){
    return (
        <div>
          <div className="movie_container">
              {data.map(element =>
                (<MovieListContainer element={element} addLikeList={addLikeList} blockList={blockList}/>))}
          </div>
        </div>
      )
}