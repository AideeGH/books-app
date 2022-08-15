import React, {
  useState,
  useCallback,
  createContext,
  useContext,
  useEffect,
} from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const FavoritesContext = createContext(null);

export function FavoritesProvider(props) {
  const [favorites, setFavorites] = useState([]);
  const { loggedInUser } = useContext(UserContext);

  useEffect(() => {
    if (!loggedInUser) {
      return;
    }
    async function init() {
      try {
        const response = await axios.get(`/api/favorites/user`);
        if (response.data.success) {
          setFavorites(response.data.data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    init();
  }, [loggedInUser]);

  const add = useCallback(
    async (book) => {
      try {
        const response = await axios.put("/api/favorites/add", book);
        console.log(response.data);
        if (response.data.success) {
          setFavorites((curr) => [...curr, response.data.data]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [setFavorites]
  );

  const remove = useCallback(
    async (id) => {
      try {
        const response = await axios.delete(`/api/favorites/delete/${id}`);
        if (response.data.success) {
          setFavorites((curr) => curr.filter((val) => val.book_id !== id));
        }
      } catch (err) {
        console.log(err);
      }
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
