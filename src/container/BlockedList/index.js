import React from "react";
import BlockList from "../../component/BlockList";
import store from "../../utils/actionCreator";

export default function BlockedList() {
  const movies = store.getState();
  return (
    <div className="blocked-grid">
      {movies.map(({ movie, isBlocked }) => {
        return isBlocked && <BlockList movie={movie} />;
      })}
    </div>
  );
}
