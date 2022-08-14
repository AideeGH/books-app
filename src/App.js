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
import ProtectedRoute from "./shared/ProtectedRoutes";
function App() {
  return (
    <>
      <Router>
        <Menu />
        <Routes>
          <Route
            path="/login"
            element={
              <ProtectedRoute requiresLogin={false} component={<LoginPage />} />
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute
                requiresLogin={false}
                componen={<RegisterPage />}
              />
            }
          />
          <Route
            path="/search"
            element={
              <ProtectedRoute requiresLogin={true} component={<SearchPage />} />
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute
                requiresLogin={true}
                component={<FavoritesPage />}
              />
            }
          />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
