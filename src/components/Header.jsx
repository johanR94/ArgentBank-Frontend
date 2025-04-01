import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from 'react';
import { loginSuccess } from '../actions/login.actions';
import { fetchUserData } from '../actions/user.actions';
import logo from "../assets/images/argentBankLogo.avif";

export default function Header() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state.user);
console.log(userName, "userName")
  console.log(isLoggedIn, "isLoggedIn")
 
  // const handleLogout = () => {
  //   dispatch(logout());
  // }
  useEffect(() => {
    const token = localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken');
    if (token) {
      dispatch(loginSuccess(token)); // Restaure le statut connecté
      dispatch(fetchUserData(token)); // Récupère les données utilisateur
    }
  }, [dispatch]);

  return (
    <>
      {isLoggedIn && location.pathname === "/profile" ? (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {userName}!
          </h1>
          <button className="edit-button">Edit Name</button>
          {/* <button className="main-nav-item" onClick={handleLogout}>
            Logout
          </button> */}
        </div>
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
