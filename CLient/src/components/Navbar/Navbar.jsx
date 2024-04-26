import "./Navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpIcon from '@mui/icons-material/Help';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Close, DarkMode } from "@mui/icons-material";
import LightModeIcon from '@mui/icons-material/LightMode';
import { useAppContext } from "../../Context/AppContext.js";
import { useUserContext } from "../../Context/UserContext.js";

const Navbar = () => {

  const location = useLocation();
  const [showVerticalNav, setShowVerticalNav] = useState(false);
  const { mode, toggleMode } = useAppContext();
  const { user } = useUserContext();

  if (localStorage.getItem("authToken")) {

    const profileImg = document.querySelector(".profile-img");
    profileImg.addEventListener("mouseover", () => {

    })
  }
  return (
    <>
      {
        !showVerticalNav &&
        <nav className="navbar">
          <div className="logo d-flex align-items-center justify-content-between">
            <h2>
              <NavLink to={"/"}>
                Foodzie
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/foodzie-bcbf4.appspot.com/o/foodzie_logo.png?alt=media&token=8ce6cfe2-8ff4-4186-8721-690d25eb7e2c"
                  alt="logo"
                />
              </NavLink>
            </h2>
          </div>
          <ul className="nav-items">
            <NavLink to={"/"} className={location.pathname === '/' ? "nav-item active" : "nav-item"}>
              <HomeIcon /> Home
            </NavLink>
            <NavLink to={"/search"} className={location.pathname === '/search' ? "nav-item active" : "nav-item"}>
              <SearchIcon /> Search
            </NavLink>
            <NavLink to={"/help"} className={location.pathname === '/help' ? "nav-item active" : "nav-item"}>
              <HelpIcon /> Help
            </NavLink>
            <li className="nav-item toggle-btn" onClick={() => toggleMode()}>
              {
                mode === "light-mode" ? <LightModeIcon /> :
                  <DarkMode />
              }
            </li>
            {
              user === null ? (
                <NavLink to={"/login"} className="nav-item">
                  <button className="btn">Log In/Sign Up</button>
                </NavLink>
              ) : (
                <NavLink to={'/profile'} className={"nav-item"} style={{ borderBottom: "none" }}>
                  <img className="profile-img" src={user.image} alt="profile-img" />
                </NavLink>
              )
            }
            <NavLink to={"/cart"} className={location.pathname === '/cart' ? "nav-item active" : "nav-item"}>
              <div className="circle">10</div>
              <ShoppingCartIcon />
              Cart
            </NavLink>
            <li onClick={() => setShowVerticalNav(!showVerticalNav)}>
              <MenuIcon id="hamburger-menu" />
            </li>
          </ul>
        </nav>
      }


      {
        showVerticalNav && <ul className="vertical-nav">
          <li onClick={() => setShowVerticalNav(!showVerticalNav)} className="nav-item">
            <Close className="close-menu-btn" style={{ cursor: "pointer", position: "absolute", top: "1.8rem", right: "1.6rem", fontSize: "1.5rem" }} />
          </li>
          <NavLink to={"/"} className={location.pathname === '/' ? "nav-item active" : "nav-item"}>
            <HomeIcon /> Home
          </NavLink>
          <NavLink to={"/search"} className={location.pathname === '/search' ? "nav-item active" : "nav-item"}>
            <SearchIcon /> Search
          </NavLink>
          <NavLink to={"/help"} className={location.pathname === '/help' ? "nav-item active" : "nav-item"}>
            <HelpIcon /> Help
          </NavLink>
          <li className="nav-item" onClick={() => toggleMode()}>
            {
              mode === "light-mode" ? <LightModeIcon /> :
                <DarkMode />
            }
          </li>
          <NavLink to={"/login"} className="nav-item">
            <button className="btn">Log In/Sign Up</button>
          </NavLink>
          <NavLink to={"/cart"} className={location.pathname === '/cart' ? "nav-item active" : "nav-item"}>
            <div className="circle">10</div>
            <ShoppingCartIcon />Cart
          </NavLink>
        </ul>
      }

    </>
  );
}

export default Navbar;