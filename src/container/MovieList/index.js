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
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState(0);
  const [preSort, setPreSort] = useState(0);
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
      <div>{loading? <LoadingSpinner/>:<ResultSpinner sort={sort} loading={loading}/> }</div>
    </div>
  );
}
function LoadingSpinner(){
  return <div>loading</div>
}

function ResultSpinner({sort, loading}){
  if (String(sort) === String(0)){
    return <Popular loading={loading}/>
  }
  else if (String(sort) === String(1)){
    return <Title loading={loading}/>
  } else if (String(sort) === String(2)){
    return <Rate loading={loading}/>
  } else if (String(sort) === String(3)){
    return <Date loading={loading}/>
  }
}


