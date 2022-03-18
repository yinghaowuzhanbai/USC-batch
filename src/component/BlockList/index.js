import React, { useState } from "react";
import store from "../../utils/actionCreator";

export default function BlockList({ movie, isBlocked }) {
  const data = store.getState();
  const [isShow, setIsShow] = useState(isBlocked);

  const buttonsHandler = (event) => {
    const movieFound = data.find(
      (element) => element.id === Number(event.target.parentNode.id)
    );
    console.log(movieFound);
    if (event.target.name === "unblock" || event.target.name === "like") {
      if (event.target.name === "like") {
        store.dispatch({
          type: "IS_LIKE",
          text: movieFound,
        });
      }
      store.dispatch({
        type: "UNBLOCK",
        text: movieFound,
      });
      setIsShow(!isShow);
    }
  };

  return (
    isShow && (
      <div
        className="blocked-movie"
        id={movie.id}
        onClick={(e) => buttonsHandler(e)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.original_title}
        />
        <br />
        <button name="unblock">Delete</button>
        <button name="like">Like</button>
        <p>{movie.original_title}</p>
      </div>
    )
  );
}
