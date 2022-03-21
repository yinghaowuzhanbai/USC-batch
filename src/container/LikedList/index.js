import React from "react";
import LikeList from "../../component/LikeList";
import store from "../../utils/actionCreator";

export default function LikedList() {
  const movies = store.getState();
  return (
    <div className="blocked-grid">
      {movies.map(({ movie, isLiked }) => {
        return isLiked && <LikeList movie={movie} />;
      })}
    </div>
  );
}
