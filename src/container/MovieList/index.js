import React, { useState, useEffect } from "react";
import store from "../../utils/actionCreator";

export default function MovieList() {
  const { movies } = store.getState();
  const [data, setData] = useState(movies);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=f4fd559b706454d3e7876ad1c9d54257&page=${page}`
      );
      const json = await res.json();

      const mapped = json.results.map((item) => {
        item.page = page;
        item.isBlocked = false;
        return item;
      });
      console.log([...data, ...mapped]);
      setData([...data, ...mapped]);
    };
    const isExist = movies.some((item) => item.page == page);
    !isExist && fetchData();
  }, [page]);

  store.dispatch({ type: "fetch", payload: data });

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
        {movies
          .filter((item) => item.page === page)
          .map((element) => {
            return (
              <li key={element.id}>
                <a>{element.original_title}</a>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
