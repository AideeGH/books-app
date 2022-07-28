import React from "react";
const Main = () => {
  return (
    <>
      <div className="header">
        <div className="row1">
          <h1> Find Your Book</h1>
        </div>
        <div className="row2">
          <h2> BookQuest</h2>
          <div className="search">
            <input type="text" placeholder="Book Title" />
            <button>search</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
