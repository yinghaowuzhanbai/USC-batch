import React from "react";

export default function LikeList({ movie }) {
  console.log(movie);
  return (
    <div className="liked-movie">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.original_title}
      />
      <div className="funtion-buttons">
        <button>Delete</button>
        <button>Block</button>
        <button>Unlike</button>
      </div>
      <p>{movie.original_title}</p>
    </div>
  );
}
