import { Routes, Route } from "react-router-dom";
import Home from "../container/home/Home";
import Navbar from "../component/navbar/Navbar";
import MovieList from "../container/movieList/MovieList";
import LikedList from "../container/likedList/LikedList";
import BlockedList from "../container/blockedList/BlockedList";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="movie" element={<MovieList />} />
        <Route path="liked" element={<LikedList />} />
        <Route path="blocked" element={<BlockedList />} />
      </Routes>
    </>
  );
}
