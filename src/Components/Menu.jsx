import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { FavoritesContext } from "../Contexts/FavoritesContext";
import { SearchContext } from "../Contexts/SearchContext";
import { UserContext } from "../Contexts/UserContext";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Menu = () => {
  const { loggedInUser, logout } = useContext(UserContext);
  const { setSearchResults } = useContext(SearchContext);
  const { clear } = useContext(FavoritesContext);
  const [toggleMenu, setToggleMenu] = useState(false);
  const handleNavBar = () => setToggleMenu(!toggleMenu);
  return (
    <>
      <ul>
        {loggedInUser && (
          <>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/favorites">Favorites</NavLink>
            </li>
            <li>
              <NavLink
                onClick={() => {
                  clear();
                  setSearchResults([]);
                  logout();
                }}
                to="/login"
              >
                Logout
              </NavLink>
            </li>
          </>
        )}
        {!loggedInUser && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </>
        )}
      </ul>
    </>
  );

  // return (
  //   <header className="navbar navbar-expand-lg opacity sticky">
  //     <div className="container-fluid links">
  //       <div>
  //         <img src="https://media1.giphy.com/media/2YpTTV69fQsH5BqxSm/giphy.gif" />
  //         Hello {loggedInUser}
  //       </div>
  //       {loggedInUser && (
  //         <>
  //           <div>
  //             <NavLink to="/search" className="links">
  //               Search
  //             </NavLink>
  //           </div>
  //           <div>
  //             <NavLink to="/favorites" className="links">
  //               Favorites
  //             </NavLink>
  //           </div>
  //           <div>
  //             <NavLink
  //               onClick={() => {
  //                 clearFav();
  //                 setSearchResults([]);
  //                 logout();
  //               }}
  //               className="links"
  //               to="/login"
  //             >
  //               Logout
  //             </NavLink>
  //           </div>
  //         </>
  //       )}
  //       {!loggedInUser && (
  //         <>
  //           <div>
  //             <NavLink to="/login" className="links">
  //               Login
  //             </NavLink>
  //           </div>
  //           <div>
  //             <NavLink to="/register" className="links">
  //               Register
  //             </NavLink>
  //           </div>
  //         </>
  //       )}
  //     </div>
  //   </header>
  // );
};
export default Menu;
