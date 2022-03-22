import React, { useState } from "react";
import store from "../../utils/actionCreator";
import Detail from "../BlockList/Detail";
import "./index.css";

export default function LikeList({ movie, isLiked }) {
  const data = store.getState();
  const [isShow, setIsShow] = useState(isLiked);
  const [showDetail, setShowDetail] = useState(false);

  const buttonsHandler = (event) => {
    const movieFound = data.find(
      (element) => element.id === Number(event.target.parentNode.id)
    );
    console.log(movieFound);
    if (event.target.name === "unlike" || event.target.name === "block") {
      if (event.target.name === "block") {
        store.dispatch({
          type: "IS_BLOCK",
          text: movieFound,
        });
      }
      store.dispatch({
        type: "UNLIKE",
        text: movieFound,
      });
      setIsShow(!isShow);
    }

    if (event.target.name === "detail") {
      setShowDetail(true);
    }
  };

  return (
    isShow && (
      <div
        className="liked-movie"
        id={movie.id}
        onClick={(e) => buttonsHandler(e)}
      >
        {showDetail && (
          <Detail
            movie={movie}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
          />
        )}
        <div className="image-wrapper" id={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.original_title}
          />
          <div className="buttons" id={movie.id}>
            <button name="unlike">Delete</button>
            <button name="block">Like</button>
            <button name="detail">Detail</button>
          </div>
        </div>
      </div>
    )
  );
}
