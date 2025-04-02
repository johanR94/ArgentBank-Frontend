import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logOut } from "../actions/login.actions";
import { fetchUserData } from "../actions/user.actions";
import logo from "../assets/images/argentBankLogo.avif";

export default function Header() {
  const dispatch = useDispatch();
  const { firstName, isLoggedIn } = useSelector((state) => state.user);
  const location = useLocation(); // Récupère l'emplacement actuel

  const handleLogout = () => {
    dispatch(logOut());
    localStorage.removeItem("jwtToken"); // Supprime le token du stockage local
    sessionStorage.removeItem("jwtToken"); // Supprime le token du stockage de session
  };
  useEffect(() => {
    const token =
      localStorage.getItem("jwtToken") || sessionStorage.getItem("jwtToken");
    if (token) {
      dispatch(loginSuccess(token)); // Restaure le statut connecté
      dispatch(fetchUserData(token)); // Récupère les données utilisateur
    }
  }, [dispatch]);

  return (
    <>
      {isLoggedIn ? (
        <nav className="main-nav">
          <NavLink className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <div>
            <NavLink className="main-nav-item" to="/profile">
              <i className="fa fa-user-circle"></i>
              {firstName}
            </NavLink>

            <NavLink className="main-nav-item" to="/" onClick={handleLogout}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className="main-nav">
          <NavLink className="main-nav-logo" to="/">
            <img
              className="main-nav-logo-image"
              src={logo}
              alt="Argent Bank Logo"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <div>
            <NavLink className="main-nav-item" to="/login">
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}
