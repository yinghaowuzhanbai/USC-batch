import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Navbar from "../components/Navbar";
import MovieList from "../pages/MovieList";
import LikeList from "../pages/LikeList";
import BlockedList from "../pages/BlockedList";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie" element={<MovieList />} />
        <Route path="like" element={<LikeList />} />
        <Route path="blocked" element={<BlockedList />} />
      </Routes>
    </>
  );
}