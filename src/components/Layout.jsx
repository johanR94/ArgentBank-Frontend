import Footer from "./Footer";
import Header from "./Header";
import { useLocation } from "react-router-dom";

export default function Layout({ children }) {
  const location = useLocation();


  const mainClass = location.pathname === "/login" || location.pathname === "/profile" ? "main bg-dark" : "main";
  return (
    <>
      <Header />
      <main className={mainClass}>{children} </main>
      <Footer />
    </>
  );
}
