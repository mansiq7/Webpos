// import Navbar from "./navbar.js";
import Footer from "../footer.js";
import { useRouter } from "next/router";
import AfterHeader from '../afterHeader.js';
import Sidebar from "../sidebar.js";
// import { Navbar } from "react-bootstrap";
import Navbar from "../navbar.js";
import { useState } from "react";
export default function Layout({ children, isLoggedIn, userType }) {
  const location = useRouter();
  const urlpath = location.pathname;
  const [activeSidebar, setActiveSidebar] = useState(true)
  console.log(activeSidebar,"activeSidebar");
  const sidebarToggle = (value) => {
    setActiveSidebar(value)
  }

  return (
    <>
      <Sidebar sidebarToggle={(e) => sidebarToggle(e)} />
      <div className= {`rightWrapper ${activeSidebar ? 'show' : 'hide'}`}>
        <main>
          {/* <Navbar activeSidebar={activeSidebar} /> */}
          {children}
        </main>
      </div>
    </>
  );
}
