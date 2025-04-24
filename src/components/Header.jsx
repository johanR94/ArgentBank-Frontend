import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../redux/actions/login.actions";
import logo from "../assets/images/argentBankLogo1.avif";

export default function Header() {
  const dispatch = useDispatch();
  const { userName, isLoggedIn } = useSelector((state) => state.user); // Get userName and isLoggedIn from the Redux store

  const handleLogout = () => {
    // Logout function to handle user logout
    dispatch(logOut());
    localStorage.removeItem("jwtToken");
    sessionStorage.removeItem("jwtToken");
  };

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
          <div className="main-nav-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "main-nav-item router-link-exact-active"
                  : "main-nav-item"
              }
              to="/profile"
            >
              <i className="fa fa-user-circle"></i>
              {userName}
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
              loading="lazy"
            />
            <h1 className="sr-only">Argent Bank</h1>
          </NavLink>
          <div className="main-nav-container">
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "main-nav-item router-link-exact-active"
                  : "main-nav-item"
              }
              to="/login"
            >
              <i className="fa fa-user-circle"></i>
              Sign In
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
}
