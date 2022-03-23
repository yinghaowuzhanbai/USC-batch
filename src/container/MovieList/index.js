import React from "react";
import './style.css';
import {useState, useEffect} from "react";
import store from '../../utils/actionCreator.js'

import RevenueAsc from "./revenueAsc";
import TitleAsc from "./titleAsc";
import PopularAsc from "./popularAsc";
import DateAsc from "./dateAsc";
 
import RevenueDsc from "./revenueDsc";
import TitleDsc from "./titleDsc";
import PopularDsc from "./popularDsc";
import DateDsc from "./dateDsc";

export default function MovieList() {
  
  const [sort, setSort] = useState(0);
  const [page, setPage] = useState(1);
  const [dChickP, setDclickP] = useState(true);
  const [dChickT, setDclickT] = useState(true);
  const [dChickR, setDclickR] = useState(true);
  const [dChickD, setDclickD] = useState(true);

  function swtichSort(e){
    if (sort === e.target.id){
      if (sort === '0'){
        setDclickP(false);
        setSort('4');
      } else if (sort === '1'){
        setDclickT(false);
        setSort('5');
      } else if (sort === '2'){
        setDclickR(false);
        setSort('6');
      } else if (sort === '3'){
        setDclickD(false);
        setSort('7');
      } else if (sort === '4'){
        setDclickP(true);
        setSort('0');
      } else if (sort === '5'){
        setDclickT(true);
        setSort('1');
      } else if (sort === '6'){
        setDclickR(true);
        setSort('2');
      } else if (sort === '7'){
        setDclickD(true);
        setSort('3');
      }
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
        <div style={{ border:sort === '0'||sort === '4' ? '2px solid gray': '0'}}>
          {dChickP?<button className="nav_button" id='0' onClick={swtichSort}>Popular &uarr;</button>:
          <button className="nav_button" id='4' onClick={swtichSort}>Popular &darr;</button>}
        </div>
        <div style={{ border:sort === '1'||sort === '5' ? '2px solid gray': '0'}}>
          {dChickT?<button className="nav_button" id='1' onClick={swtichSort}>Title &uarr;</button>
          :<button className="nav_button" id='5' onClick={swtichSort}>Title &darr;</button>}
        </div>
        <div style={{ border:sort === '2'||sort === '6' ? '2px solid gray': '0'}}>
          {dChickR?<button className="nav_button" id='2' onClick={swtichSort}>Rate &uarr;</button>
          :<button className="nav_button" id='6' onClick={swtichSort}>Rate  &darr;</button>}
        </div>
        <div style={{ border:sort === '3'||sort === '7' ? '2px solid gray': '0'}}>
         {dChickD?<button className="nav_button" id='3' onClick={swtichSort}>Realse-Data &uarr;</button>
         :<button className="nav_button" id='7' onClick={swtichSort}>Realse-Data  &darr;</button>}
        </div>
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
  function hanldLoading(){
    setLoading(true);
  }
  //checkLoading
  function displayPage(){
    return `Page ${page}`;
  }

  let showPopularA = false;
  let showTitleA = false;
  let showRateA = false;
  let showDateA = false;
  let showPopularD = false;
  let showTitleD = false;
  let showRateD = false;
  let showDateD = false;
  if (String(sort) === String(0)){
    showPopularA = true;
  } else if (String(sort) === String(1)){
    showTitleA = true;
  } else if (String(sort) === String(2)){
    showRateA = true;
  } else if (String(sort) === String(3)){
    showDateA = true;
  } else if (String(sort) === String(4)){
    showPopularD = true;
  } else if (String(sort) === String(5)){
    showTitleD = true;
  } else if (String(sort) === String(6)){
    showRateD = true;
  } else if (String(sort) === String(7)){
    showDateD = true;
  } 

  return (
    <div>
      <div className="movie_layout">
        {loading?
        <div className="pageSwitch">
          <button disabled>left</button>
          <span>00/Page</span>
          <button disabled>right</button>
        </div>:
        <div className="pageSwitch">
          <button onClick={pageRender} id='0' disabled={loading? true:false}>left</button>
          <span>{displayPage()}</span>
          <button onClick={pageRender} id='1' disabled={loading? true:false}>right</button>
        </div>}
    </div>
      <div style={{ display: showPopularA?"flex":"none"}}>
        <PopularAsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showTitleA?"flex":"none" }}>
        <TitleAsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showRateA?"flex":"none" }}>
        <RevenueAsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showDateA ? "flex":"none" }}>
        <DateAsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showPopularD?"flex":"none"}}>
        <PopularDsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showTitleD?"flex":"none" }}>
        <TitleDsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showRateD?"flex":"none" }}>
        <RevenueDsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
      <div style={{ display: showDateD ? "flex":"none" }}>
        <DateDsc page={page} checkLoading={checkLoading} hanldLoading={hanldLoading} loading={loading}/>
      </div>
    </div>

  )
}


