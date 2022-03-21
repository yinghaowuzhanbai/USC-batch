import React from "react";
import './style.css'
import store from '../../utils/actionCreator.js';
import {useState, useEffect} from "react";
import MovieListContainer from './display';
import { isContentEditable } from "@testing-library/user-event/dist/utils";

const initialData = {
  page: 0,
  content: ''
}
export default function Popular({loading}) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(true);
  const [page, setPage] = useState(1);
  const [fethPage, setFetchPage] = useState(1);
  const [listA, setListA] = useState([]);
  // const [listB, setList] = useState([]);

  useEffect(() => {
    let sliceStart = (page-1) * 20;
    let sliceEnd = sliceStart + 20;
    let newlist = listA.filter(element => {
      const item_store = store.getState().find(ele => ele.id === element.content.id);
      if (item_store === undefined){
        return true;
      }
      return !item_store.isBlocked; 
    });
    setListA(newlist);
    if (listA.length < sliceEnd){
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=popularity.asc&page=${fethPage}&with_watch_monetization_types=free`)
      .then(res => res.json())
      .then(res => {
        res.results.map(element => {
          setListA(pre => [...pre, 
          {
            page:page,
            content:element
          }])
          const item = store.getState().find(i => i.id === element.id)
          if (!item){
            store.dispatch({
              type:'ADD_LIST',
              text: element
            })
          }
      })
      setFetchPage(fethPage+1);
      setCount(false);
    })}
    else {
      setData(listA.slice(sliceStart,sliceEnd));
      setCount(false);
    }
    }, [page, count])

function addLikeList(event){
    const add_item = store.getState().find(element => String(element.id) === String(event.target.id))
    store.dispatch(
      {
        type:'IS_LIKE',
        text: add_item}
    )
    setCount(true);
  }
function blockList(event){
    var add_item = store.getState().find(element => String(element.id) === String(event.target.id));
    store.dispatch(
      {
        type:'IS_BLOCK',
        text: add_item}
      ) 
    setCount(true);
  }
  function displayPage(){
    return `Page ${page}`;
  }

  function pageRender(e){
    if (e.target.id === '1'){
      setPage(page + 1);
    } else{
      if (page>1){
        setPage(page-1);
      }
    }
    setCount(true);
  }
  return (
  <div>
    <div className="movie_layout">
      <div className="pageSwitch">
        <button onClick={pageRender} id='0' disabled={loading? true:false}>left</button>
        <span>{displayPage()}</span>
        <button onClick={pageRender} id='1' disabled={loading? true:false}>right</button>
      </div>
    </div>
    <div className="movie_container">
        {data.map(element =>
          (<MovieListContainer element={element} addLikeList={addLikeList} blockList={blockList}/>))}
    </div>
  </div>
)
}
