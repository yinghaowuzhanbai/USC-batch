import React from "react";
import './style.css';
import {useState, useEffect} from "react";
import store from '../../utils/actionCreator.js'
import Container from './container';
import Rate from "./rate";
import Title from "./title";
import Popular from "./popular";
import PopularA from "./popularA";
import Date from "./date";

 
export default function MovieList() {
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState(0);

  const [page, setPage] = useState(1);

  const [reverseP, setReverseP] = useState(0);
  const [reverseR, setReverseR] = useState(0);
  const [reverseT, setReverseT] = useState(0);
  const [reverseD, setReverseD] = useState(0);

  const [data, setData] = useState([]);
  const [count, setCount] = useState(true);
  const [fethPage, setFetchPage] = useState(1);

  const [listA, setListA] = useState([]);
  const [listB, setListB] = useState([]);
  const [listC, setListC] = useState([]);
  const [listD, setListD] = useState([]);
  const [listE, setListE] = useState([]);
  const [listF, setListF] = useState([]);
  const [listG, setListG] = useState([]);
  const [listH, setListH] = useState([]);

  const [list, setList] = useState(listA);

  const fetchA = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=popularity.desc&page=`;
  const fetchB = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=popularity.asc&page=`;
  const fetchC = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=original_title.desc&page=`;
  const fetchD = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=original_title.asc&page=`;
  const fetchE = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=vote_average.desc&page=`;
  const fetchF = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=vote_average.asc&page=`;
  const fetchG = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=release_date.desc&page=`;
  const fetchH = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=release_date.asc&page=`;
  

  const [Resource, setResource] = useState(fetchA)
  useEffect(() => {
    let sliceStart = (page-1) * 20;
    let sliceEnd = sliceStart + 20;
    let newlist = list.filter(element => {
      const item_store = store.getState().find(ele => ele.id === element.content.id);
      if (item_store === undefined){
        return true;
      }
      return !item_store.isBlocked; 
    });
    if (newlist.length < sliceEnd){
      fetch(`${Resource}${fethPage}`)
      .then(res => res.json())
      .then(res => {
        res.results.map(element => {
          setList(pre => [...pre, 
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
      setCount(true);
      setLoading(false);
    }).catch(error => setLoading(true))}
    else {
      setData(newlist.slice(sliceStart,sliceEnd));
      setCount(false);
      setLoading(false);
    }
    }, [page, count, loading])
  
  function swtichSort(e){
    if (sort == e.target.id){
      if (String(sort) === String(0)){
        console.log(reverseP);
        if ((Number.parseFloat(reverseP % 2).toFixed(0) == 0)){
          setResource(fetchB);
          setListA(list);
          setList(listB);
        } else {
          setResource(fetchA);
          setListB(list);
          setList(listA);
        }
        setReverseP(reverseP+1);
      }
      else if (String(sort) === String(1)){
        if ((Number.parseFloat(reverseT % 2).toFixed(0) == 0)){
          setResource(fetchD);
          setListC(list);
          setList(listD);
        } else {
          setResource(fetchC);
          setListD(list);
          setList(listC);
        }
        setReverseT(reverseT+1);
      } else if (String(sort) === String(2)){
        if ((Number.parseFloat(reverseR % 2).toFixed(0) == 0)){
          setResource(fetchF);
          setListE(list);
          setList(listF);
        } else {
          setResource(fetchE);
          setListF(list);
          setList(listE);
        }
        setReverseR(reverseR+1);
      } else if (String(sort) === String(3)){
        if ((Number.parseFloat(reverseD % 2).toFixed(0) == 0)){
          setResource(fetchH);
          setListG(list);
          setList(listH);
        } else {
          setResource(fetchG);
          setListH(list);
          setList(listG);
        }
        setReverseD(reverseD+1);
      }
    } else {
      setSort(e.target.id);
      reverse(e.target.id);
      if (String(sort) === String(0)){
        if ((Number.parseFloat(reverseT % 2).toFixed(0) == 0)){
          
          setListA(list);
        } else {
          setResource(fetchD);
          setListB(list);
        }
    }else if (String(sort) === String(1)){
        if ((Number.parseFloat(reverseT % 2).toFixed(0) == 0)){
          setListC(list);
        } else {
          setListD(list);
        }
    } else if (String(sort) === String(2)){
        if ((Number.parseFloat(reverseR % 2).toFixed(0) == 0)){
          setListE(list)
        } else {
          setListF(list);
        }
    } else if (String(sort) === String(3)){
        if ((Number.parseFloat(reverseD % 2).toFixed(0) == 0)){
          setListG(list);
        } else {
          setResource(fetchH);
          setListH(list);
        }
    }

    }
    // reverse(e.target.id);
    setFetchPage(1);
    setCount(true);
    setLoading(true);
  }
  function reverse(e){
    if (String(e) === String(0)){
        if ((Number.parseFloat(reverseT % 2).toFixed(0) == 0)){
          setResource(fetchC);
          setList(listC);
        } else {
          setResource(fetchD);
          setList(listD);
        }
    }else if (String(e) === String(1)){
        if ((Number.parseFloat(reverseT % 2).toFixed(0) == 0)){
          setResource(fetchC);
          setList(listC);
        } else {
          setResource(fetchD);
          setList(listD);
        }
    } else if (String(e) === String(2)){
        if ((Number.parseFloat(reverseR % 2).toFixed(0) == 0)){
          setResource(fetchE);
          setList(listE);
        } else {
          setResource(fetchF);
          setList(listF);
        }
    } else if (String(e) === String(3)){
        if ((Number.parseFloat(reverseD % 2).toFixed(0) == 0)){
          setResource(fetchG);
          setList(listG);
        } else {
          setResource(fetchH);
          setList(listH);
        }
    }
  }
  function displayPage(){
    return `Page ${page}`;
  }
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
        <button id='0' disabled={loading? true:false} onClick={swtichSort}>Popular</button>
        <button id='1' disabled={loading? true:false} onClick={swtichSort}>Title</button>
        <button id='2' disabled={loading? true:false} onClick={swtichSort}>Rate</button>
        <button id='3' disabled={loading? true:false} onClick={swtichSort}>Realse-Data</button>
      </nav>
      <div className="pageSwitch">
        <button onClick={pageRender} id='0' disabled={loading? true:false}>left</button>
        <span>{displayPage()}</span>
        <button onClick={pageRender} id='1' disabled={loading? true:false}>right</button>
      </div>
      <div>{loading? <LoadingSpinner/>:<ResultSpinner data={data} addLikeList={addLikeList} blockList={blockList}/> }</div>
    </div>
  );
}
function LoadingSpinner(){
  return <div>loading</div>
}

function ResultSpinner({data, addLikeList, blockList,}){
  return <Container data={data} addLikeList={addLikeList} blockList={blockList}/>
  // if (String(sort) === String(0)){
  //   const fetchA = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=popularity.asc&page=`
  //   const fetchB = `https://api.themoviedb.org/3/discover/movie?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US&sort_by=popularity.desc&page=`
  //   if(Number.parseFloat(reverseP % 2).toFixed(0) == 0)
  //     return <Popular fetchB={fetchB} loadingStatus={loadingStatus} loading={loading}/>
  //   else 
  //     return <PopularA fetchA={fetchA} loadingStatus={loadingStatus} loading={loading}/>
  // }
  // else if (String(sort) === String(1)){
  //   return <Title loading={loading}/>
  // } else if (String(sort) === String(2)){
  //   return <Rate loading={loading}/>
  // } else if (String(sort) === String(3)){
  //   return <Date loading={loading}/>
  // }
}


