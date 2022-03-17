import React from "react";
import './style.css'
import {useState, useEffect} from "react";
import {createStore, dispatch} from 'redux';
import store from '../../utils/actionCreator.js'

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]  
export default function MovieList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
      fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&page=${page}`
      ).then(res => res.json())
      .then(data => {
        setData(data.results)
        setLoading(false)})
      .catch(error => console.log("error"));
  })
  function displayPage(){
    return `${page} page`;
  }
  function pageRender(e){
    if (e.target.id == 1){
      setPage(page+1);
    } else{
      if (page>1){
        setPage(page-1);
      }
    }
    console.log(store.getState())
  }
  function addLikeList(event){
    console.log(event.target)
    const add_item = data.find(element => element.id == event.target.id)
    console.log(add_item)
    store.dispatch(
      {
        type:'IS_LIKE',
        text: add_item}
    )
    console.log(store.getState())
  }
  function blockList(event){
    console.log(event.target)
    const add_item = data.find(element => element.id == event.target.id)
    console.log(add_item)
    store.dispatch(
      {
        type:'IS_BLOCK',
        text: add_item}
    )
    console.log(store.getState())
  }
  return (
    <div className="movie_layout">
      <div className="listView">
        <button disabled={loading? true:false}>Title</button>
        <button disabled={loading? true:false}>Title</button>
        <button disabled={loading? true:false}>Rate</button>
        <button disabled={loading? true:false}>Realse-Data</button>
      </div>
      <div className="pageSwitch">
        <button onClick={pageRender} id='0' disabled={loading? true:false}>left</button>
        <span>{displayPage()}</span>
        <button onClick={pageRender} id='1' disabled={loading? true:false}>right</button>
      </div>
      <div>{loading? <LoadingSpinner/>:<ResultSpinner data={data} addLikeList={addLikeList} blockList={blockList}/>}</div>

    </div>
  );
}

function LoadingSpinner(){
  return <div>loading</div>
}

function ResultSpinner({data, addLikeList, blockList}){
  return (<div className="movie_container">
  {data.map(element =>
    (
       <MovieListContainer element={element} addLikeList={addLikeList} blockList={blockList}/>
    ))}
  </div>)
}

function MovieListContainer({element, addLikeList, blockList}){
    const stringPath = `https://image.tmdb.org/t/p/w500${element.poster_path}`
    // const check = store.find(item => item.id == element).isBlocked;
    return (
      <div>
        <div className="movie_element">
          <div><img className="movie_element_pic" src={stringPath} alt=""/></div>
          <span>{element.original_title}</span>
          <div>
            <button onClick={addLikeList} id={element.id}>LIKE</button>
            <button onClick={blockList} id={element.id}>BLOCK</button>
          </div>
          <span>{element.release_date}</span>
          <span>
            {element.overview}
          </span>
        </div></div>
  ) 
}
