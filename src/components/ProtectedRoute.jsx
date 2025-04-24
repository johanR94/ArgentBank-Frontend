import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
/// This component checks if the user is logged in and redirects to the login page if not
export default function ProtectedRoute({ children }) {
  const isLoggedIn = useSelector((state) => !!state.login?.token); // Check if the user is logged in by checking the token in the Redux store

  if (!isLoggedIn) {
    // If the user is not logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return children;
}
