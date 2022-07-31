import React, { useContext, useState, useMemo } from "react";
import useAxios from "../Hooks/Axios";
import { SearchContext } from "../Contexts/SearchContext";
import BookDisplay from "./BookDisplay";
import { FaSearch } from "react-icons/fa";
import { FavoritesContext } from "../Contexts/FavoritesContext";

function SearchPage() {
  const [url, setUrl] = useState("");
  const [search, setSearch] = useState("");
  const { bookData: books, error } = useAxios(url);
  const { favorites, add, remove } = useContext(FavoritesContext);

  // const { searchResults, setSearchResults } = useContext(SearchContext);
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const faveIDs = useMemo(
    () => favorites.map((val) => val.book_id),
    [favorites]
  );

  console.log(books);
  console.log(error);
  return (
    <div className="search-form">
      <div className="container">
        <div className="search-form-content">
          <h3 className="text-center">Search Book</h3>
          <form className="search-form " onSubmit={handleSubmit}>
            <div className="search-form-elem flex flex-sb bg-white">
              <input
                type="text"
                className="form-control"
                placeholder="Book title..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button
                type="submit"
                className="flex flex-c"
                onClick={() => {
                  setUrl("&q=" + search);
                }}
              >
                <FaSearch className="text-purple transparent" size={32} />
              </button>
            </div>
            <div className="d-flex align-content-stretch flex-wrap">
              {books &&
                books.length > 0 &&
                books.map((val) => (
                  <BookDisplay
                    className="row-wrap p-2 flex-column row"
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

    // <div className="search-form">
    //   <div className="container">
    //     <div className="row2 search-form-content">
    //       <h2 className="text-center"> Book Search</h2>
    //       <div className="text-center">
    //         <input
    //           className=""
    //           type="text"
    //           placeholder="Book Title"
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //         />
    //         <button
    //           onClick={() => {
    //             setUrl("&q=" + search);
    //           }}
    //         >
    //           search
    //         </button>
    //       </div>
    //     </div>
    //     <div className=" d-flex align-content-stretch flex-wrap">
    //       {books &&
    //         books.length > 0 &&
    //         books.map((val) => (
    //           <BookDisplay
    //             className="row-wrap p-2 flex-column row"
    //             book={val}
    //           />
    //         ))}
    //     </div>
    //   </div>
    // </div>
  );
}

export default SearchPage;
