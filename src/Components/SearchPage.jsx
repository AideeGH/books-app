import React, { useContext, useState, useMemo, useEffect } from "react";
import useAxios from "../Hooks/Axios";
import BookDisplay from "./BookDisplay";
import { FaSearch } from "react-icons/fa";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import { SearchContext } from "../Contexts/SearchContext";

function SearchPage() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const { bookData: books, error } = useAxios(url);
  const { searchResults, setSearchResults } = useContext(SearchContext);
  const { favorites, add, remove } = useContext(FavoritesContext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const faveIDs = useMemo(
    () => favorites.map((val) => val.book_id),
    [favorites]
  );

  useEffect(() => {
    if (books) {
      setSearchResults(books);
    }
  }, [books, setSearchResults]);

  console.log(books);
  console.log(error);
  return (
    <div>
      <div>
        <div>
          <h3 className="text-center">Search Book</h3>
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <input
                type="text"
                placeholder="Book title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                onClick={() => {
                  setUrl("&q=" + search + "&maxResults=15");
                }}
              >
                <FaSearch className="text-purple transparent" size={32} />
              </button>
            </div>
            <div className="d-flex flex-wrap">
              {books &&
                books.length > 0 &&
                books.map((val) => (
                  <BookDisplay
                    key={val.book_id}
                    book={val}
                    isFavorite={faveIDs.includes(val.book_id)}
                    add={add}
                    remove={remove}
                  />
                ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
