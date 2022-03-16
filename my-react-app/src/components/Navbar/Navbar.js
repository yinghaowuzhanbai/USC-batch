import React from 'react';
import {  Link } from "react-router-dom";
const navbar= () =>{
  return (
  <div>
    <li>
      <Link to="/">HomePage</Link>
    </li>
    <li>
      <Link to="/MovieList">MovieList</Link>
    </li>
    <li>
      <Link to="/LikeList">LikeList</Link>
    </li>
    <li>
      <Link to="/BlockedList">BlockedList</Link>
    </li>
  </div>
  );
}
export default navbar;