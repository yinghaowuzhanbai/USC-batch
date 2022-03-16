import React from "react";
import './Home.css'
import {useState, useEffect} from "react";
import {createStore} from 'redux';
import like from '../store/like.js'

const likestore = createStore(like, []);
// [ 'Use Redux', 'Read the docs' ]  
export default function MovieList() {
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)

  useEffect(() => {
    const fetchData = async() => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&page=${page}`
      );
      const json = await res.json();
      setData(json.results);
      // likestore.dispatch({
      //   type:'ADD_LIKE',
      //   text: page
      // })
    }
    fetchData();
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
  }
  return (
    <div className="movie_layout">
      <div className="pageSwitch">
        <button onClick={pageRender} id='0'>left</button>
        <span>{displayPage()}</span>
        <button onClick={pageRender} id='1'>right</button>
      </div>
      <div className="movie_container">
        {data.map(element =>
          (
           
             <MovieListContainer element={element}/>
           
          ))}
      </div>
    </div>

  );
}
function MovieListContainer({element}){
    const stringPath = `https://image.tmdb.org/t/p/w500${element.poster_path}`
    return (
        <div className="movie_element">
          <div><img className="movie_element_pic" src={stringPath} alt=""/></div>
          <span>{element.original_title}</span>
          <span>{element.release_date}</span>
          <span>
            {element.overview}
          </span>
        </div>
)
    
}
