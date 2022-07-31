import React, { useState, useCallback, createContext } from "react";

export const FavoritesContext = createContext(null);

export function FavoritesProvider(props) {
  const [favorites, setFavorites] = useState([]);

  const add = useCallback(
    (book) => setFavorites((curr) => [...curr, book]),
    [setFavorites]
  );

  const remove = useCallback(
    (id) => {
      setFavorites((curr) => curr.filter((val) => val.book_id !== id));
    },
    [setFavorites]
  );

  const clear = useCallback(() => {
    setFavorites([]);
  }, [setFavorites]);

  return (
    <FavoritesContext.Provider value={{ favorites, add, remove, clear }}>
      {props.children}
    </FavoritesContext.Provider>
  );
}
