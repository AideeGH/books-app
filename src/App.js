import "./App.css";
import SearchPage from "./Components/SearchPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import Menu from "./Components/Menu";
import FavoritesPage from "./Components/FavoritesPage";
import RegisterPage from "./Components/RegisterPage";
function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
