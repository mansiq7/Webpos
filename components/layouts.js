// import Navbar from "./navbar.js";
import Footer from "./footer.js";
import { useRouter } from "next/router";
import AfterHeader from './afterHeader.js';
import Sidebar from "./layouts/sidebar.js";
// import { Navbar } from "react-bootstrap";
import Navbar from "./navbar.js";
export default function Layout({ children, isLoggedIn, userType }) {
  const location = useRouter();
  const urlpath = location.pathname;
  return (
    <>
    <Sidebar/>
      <div className="rightWrapper">
        <Navbar/>
        <main>{children}</main>
      </div>
    </>
  );
}
