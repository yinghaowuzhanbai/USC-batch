import React from "react";
import './style.css';
import {useState, useEffect} from "react";
import store from '../../utils/actionCreator.js'
import Rate from "./rate";
import Title from "./title";
import Popular from "./popular";
import Date from "./date";
 
export default function MovieList() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(0);
  const [preSort, setPreSort] = useState(0);

  useEffect(() => {
    const promise_array = [];
    for (var i = 1; i < 5; i++)( //fetch all movie data
      promise_array.push(
         'https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&page='+i))
    Promise.all(
      promise_array.map(url =>
        fetch(url)
        .then(res => res.json())
        .then(res => res.results)))
    .then(result => {
      result.map(
        ele => {
          ele.map(
            item => {
              {
                if (!list.find(m => m.id === item.id)){
                  setList(oldlist => [...oldlist, item])
                }
              }
            }
          )
        }
      )
      setLoading(false)
    })
    .catch(error => console.log("fetch error"));
  }, [loading])
  

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
  }
  function swtichSort(e){
    setPreSort(sort);
    setSort(e.target.id);
  }
  return (
    <div className="movie_layout">
      <nav className="listView">
        <button id='0' disabled={loading? true:false} onClick={swtichSort}>Popular</button>
        <button id='1' disabled={loading? true:false} onClick={swtichSort}>Title</button>
        <button id='2' disabled={loading? true:false} onClick={swtichSort}>Rate</button>
        <button id='3' disabled={loading? true:false} onClick={swtichSort}>Realse-Data</button>
      </nav>
      <div className="movie_layout">
        <div className="pageSwitch">
          <button onClick={pageRender} id='0' disabled={loading? true:false}>left</button>
          <span>{displayPage()}</span>
          <button onClick={pageRender} id='1' disabled={loading? true:false}>right</button>
        </div>
        <div>{loading? <LoadingSpinner/>:<ResultSpinner list={list} store={store} sort={sort} preSort={preSort} page={page}/>}</div>
      </div>
    </div>
  );
}
function LoadingSpinner(){
  return <div>loading</div>
}

function ResultSpinner({list, sort, preSort, page, store}){
  if (String(sort) === String(0)){
    return <Popular list={list}  page={page}/>
  }
  else if (String(sort) === String(1)){
    return <Title list={list}  page={page}/>
  } else if (String(sort) === String(2)){
    return <Rate list={list}  page={page}/>
  } else if (String(sort) === String(3)){
    return <Date list={list}  page={page}/>
  }
}


