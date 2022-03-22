import React from "react";
import './style.css'
import store from '../../utils/actionCreator.js';
import {useState, useEffect} from "react";
import MovieListContainer from './display';

export default function Popular({ list, page}) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(true);
  useEffect(() =>{
    let newlist = list.filter(element => {
      const item_store = store.getState().find(ele => ele.id === element.id);
      if (item_store === undefined){
        return true;
      }
      return !item_store.isBlocked; 
    });
    let sliceStart = (page-1) * 5;
    let sliceEnd = sliceStart + 5;
    newlist = newlist.slice(sliceStart, sliceEnd);
    setData(newlist);
    setCount(true);
    }, [page, count])
function addLikeList(event){
    const add_item = list.find(element => String(element.id) === String(event.target.id))
    store.dispatch(
      {
        type:'IS_LIKE',
        text: add_item}
    )
  }
  function blockList(event){
    var add_item = store.getState().find(element => String(element.id) === String(event.target.id));
    store.dispatch(
      {
        type:'IS_BLOCK',
        text: add_item}
      )
    setCount(false);
  }
  return (<div className="movie_container">
  {data.map(element =>
      (<MovieListContainer element={element} addLikeList={addLikeList} blockList={blockList}/>))}
  </div>)
}
