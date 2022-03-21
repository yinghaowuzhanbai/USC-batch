import React from "react";
import './style.css'
import {useState, useEffect} from "react";
import { dispatch } from "redux";
import store from "../../utils/actionCreator";


const initialState = {
  movie: 'error',
  id: 'error',
  isLiked: false,
  isBlocked: false,
};

export default function MovieListContainer({element, addLikeList, blockList}){
    const stringPath = `https://image.tmdb.org/t/p/w500${element.poster_path}`
    const [item, setItem] = useState(initialState);
    
    useEffect(() => {
        const item_store = store.getState().find(ele => ele.id === element.id);
        if (item_store === undefined){
            console.log(item_store)
            fetch(`https://api.themoviedb.org/3/movie/${element.id}?api_key=f4fd559b706454d3e7876ad1c9d54257&language=en-US`)
            .then(res => res.json())
            .then(res => 
                {
                    store.dispatch({
                        type:'ADD_LIST',
                        text: res
                    });
                    setItem(res);
                }
            )
        } else{
            setItem(item_store.movie);
        }
    }, [element])
    return (
            <div className="movie_element">
              <div><img className="movie_element_pic" src={stringPath} alt=""/></div>
              <span>{item.original_title}</span>
              <div>
                <button onClick={addLikeList} id={item.id}>LIKE</button>
                <button onClick={blockList} id={item.id}>BLOCK</button>
              </div>
              <span>{item.release_date}</span>
              <span>
                {item.overview}
              </span>
            </div>
    )
  }
  