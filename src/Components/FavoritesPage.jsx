import React, { useContext } from "react";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import { UserContext } from "../Contexts/UserContext";
import BookDisplay from "./BookDisplay";

function FavoritesPage() {
  const { favorites, add, remove } = useContext(FavoritesContext);
  const { loggedInUser } = useContext(UserContext);
  return (
    <div className="d-flex flex-wrap justify-content-center">
      <h1 className="my-4 col-12 text-center">Favorites for {loggedInUser}</h1>

      <div className="col-12 d-flex flex-wrap mt-4">
        {favorites &&
          favorites.length > 0 &&
          favorites.map((val) => (
            <BookDisplay book={val} isFavorite={true} remove={remove} />
          ))}
        {favorites.length === 0 && (
          <h3 className="text-center col-12">
            No Favorites. Go Back To Search And Add Some!
          </h3>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
