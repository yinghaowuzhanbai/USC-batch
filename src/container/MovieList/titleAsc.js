import React from "react";
import './style.css'
import store from '../../utils/actionCreator.js';
import {useState, useEffect} from "react";
import MovieListContainer from './display';


export default function TitleAsc({page, checkLoading, hanldLoading, loading}) {
  const [data, setData] = useState([]);
  const [count, setCount] = useState(true);
  const [fethPage, setFetchPage] = useState(1);
  const [listA, setListA] = useState([]);

  useEffect(() => {
    hanldLoading();
    let sliceStart = (page-1) * 10;
    let sliceEnd = sliceStart + 10;
    let newlist = listA.filter(element => {
      const item_store = store.getState().find(ele => ele.id === element.content.id);
      if (item_store === undefined){
        return true;
      }
      return !item_store.isBlocked; 
    });
    setListA(newlist);
    if (listA.length < sliceEnd){
      setCount(true);
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=original_title.asc&page=${fethPage}`)
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
      checkLoading();
    }).catch(((error) => {
      console.error('Error:', error);}))}
    else {
      setData(listA.slice(sliceStart,sliceEnd));
      setCount(false);
      checkLoading();
    }
    }, [count, page])

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

  return (
  <div>
    {loading? <div>loading</div> :
    <div className="movie_container">
        {data.map(element =>
          (<MovieListContainer element={element} addLikeList={addLikeList} blockList={blockList}/>))}
    </div>}
  </div>
)
}
