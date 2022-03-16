import React, { useState, useEffect } from "react";

export default function MovieList() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&page=${page}`
      );
      const json = await res.json();
      console.log(json.results);
      setData(json.results);
    };
    fetchData();
  }, [page]);
  function displayPage() {
    return `${page} page`;
  }
  function pageRender(e) {
    if (e.target.id == 1) {
      setPage(page + 1);
    } else {
      if (page > 1) {
        setPage(page - 1);
      }
    }
  }
  return (
    <div>
      <div className="pageSwitch">
        <button onClick={pageRender} id="0">
          left
        </button>
        <span>{displayPage()}</span>
        <button onClick={pageRender} id="1">
          right
        </button>
      </div>
      <ul>
        {data.map((element) => (
          <li key={element.id}>
            <a>{element.original_title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
