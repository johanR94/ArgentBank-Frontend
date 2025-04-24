import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();

  const mainClass =
    location.pathname === "/login" || location.pathname === "/profile"
      ? "main bg-dark"
      : "main"; // Main class name based on the current path
  // If the path is /login or /profile, apply the bg-dark class to the main element
  return (
    <>
      <Header />
      <main className={mainClass}>{children} </main>
      <Footer />
    </>
  );
}
