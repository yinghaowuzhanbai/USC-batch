import React from "react";
import './style.css';
import { Routes, Route, Link} from "react-router-dom";
import Rate from "./rate";
import Title from "./title";
import Popular from "./popular";
import Date from "./date";
 
export default function MovieList() {
  return (
    <div className="movie_layout">
      <nav className="listView">
        <Link to={`/movie/popular`}><button >Popular</button></Link>
        <Link to={`/movie/title`}><button >Title</button></Link>
        <Link to={`/movie/rate`}><button >Rate</button></Link>
        <Link to={`/movie/data`}><button >Realse-Data</button></Link>
      </nav>
      <Routes>
        <Route path={`popular`} element={<Popular />} />
        <Route path={`title`} element={<Title />} />
        <Route path={`rate`} element={<Rate />} />
        <Route path={`date`} element={<Date />} />
      </Routes>
    </div>
  );
}
