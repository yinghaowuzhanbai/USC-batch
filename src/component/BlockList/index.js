import React from "react";

export default function BlockList({ movie }) {
  console.log(movie);
  return (
    <div className="blocked-movie">
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.original_title}
      />
      <div className="funtion-buttons">
        <button>Delete</button>
        <button>Like</button>
        <button>Unblock</button>
      </div>
      <p>{movie.original_title}</p>
    </div>
  );
}
