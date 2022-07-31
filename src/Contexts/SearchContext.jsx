import React, { useState, createContext } from "react";

export const SearchContext = createContext(null);

export function SearchProvider(props) {
  const [searchResults, setSearchResults] = useState([]);

  return (
    <SearchContext.Provider value={{ searchResults, setSearchResults }}>
      {props.children}
    </SearchContext.Provider>
  );
}
