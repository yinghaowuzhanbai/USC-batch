import React from "react";
import './style.css';
import {useState, useEffect} from "react";
import store from '../../utils/actionCreator.js'
import RevenueAsc from "./revenueAsc";
import TitleAsc from "./titleAsc";
import PopularAsc from "./popularAsc";
import DateAsc from "./dateAsc";
 
export default function MovieList() {
  
  const [sort, setSort] = useState(0);
  const [page, setPage] = useState(1);

  function swtichSort(e){
    if (sort === e.target.id){
      console.log(store.getState())
    } else {
      setSort(e.target.id);
      setPage(1);
    }
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
  return (
    <div className="movie_layout">
      <nav className="listView">
        <button id='0' onClick={swtichSort}>Popular</button>
        <button id='1' onClick={swtichSort}>Title</button>
        <button id='2' onClick={swtichSort}>Rate</button>
        <button id='3' onClick={swtichSort}>Realse-Data</button>
      </nav>
      <div><ResultSpinner sort={sort} page={page} pageRender={pageRender}/> </div>
    </div>
  );
}
function LoadingSpinner(){
  return <div>loading</div>
}

function ResultSpinner({sort, page, pageRender}){
  const [loading, setLoading] = useState(true);

  function checkLoading(){
    setLoading(false);
  }
  //checkLoading
  function displayPage(){
    return `Page ${page}`;
  }

  let showPopular = false;
  let showTitle = false;
  let showRate = false;
  let showDate = false;
  if (String(sort) === String(0)){
    showPopular = true;
  }
  else if (String(sort) === String(1)){
    showTitle = true;
  } else if (String(sort) === String(2)){
    showRate = true;
  } else if (String(sort) === String(3)){
    showDate = true;
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
      <div style={{ display: showPopular?"flex":"none"}}>
        <PopularAsc page={page} checkLoading={checkLoading} loading={loading}/>
      </div>
      <div style={{ display: showTitle?"flex":"none" }}>
        <TitleAsc page={page} checkLoading={checkLoading} loading={loading}/>
      </div>
      <div style={{ display: showRate?"flex":"none" }}>
        <RevenueAsc page={page} checkLoading={checkLoading} loading={loading}/>
      </div>
      <div style={{ display: showDate ? "flex":"none" }}>
        <DateAsc page={page} checkLoading={checkLoading} loading={loading}/>
      </div>
    </div>

  )
}


