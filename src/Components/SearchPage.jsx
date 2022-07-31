import React, { useContext, useState } from "react";
import useAxios from "../Hooks/Axios";
import { SearchContext } from "../Contexts/SearchContext";
import BookDisplay from "./BookDisplay";

function SearchPage() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const { bookData: books, error } = useAxios(url);
  const { searchResults, setSearchResults } = useContext(SearchContext);
  console.log(books);
  console.log(error);
  return (
    <div className="">
      <div className="">
        <div className="row1">{/* <h1 text-center> Find Your Book</h1> */}</div>
        <div className="row2">
          <h2 className="text-center"> BookQuest</h2>
          <div className="text-center">
            <input
              className=""
              type="text"
              placeholder="Book Title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => {
                setUrl("&q=" + search);
              }}
            >
              search
            </button>
          </div>
        </div>
        <div className=" d-flex align-content-stretch flex-wrap">
          {books &&
            books.length > 0 &&
            books.map((val) => (
              <BookDisplay
                className="row-wrap p-2 flex-column row"
                book={val}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
