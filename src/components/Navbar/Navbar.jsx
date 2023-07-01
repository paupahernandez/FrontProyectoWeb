import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <header>
        <nav className="navbar">
            <NavLink to="/" className="logo-display">
                <img src={logo} alt="logo-image" className="logo-image" />
                <span className="name title"> RocketInvasion </span>
            </NavLink>
            <ul className="navbar-links-container">
                <li className="navbar-element">
                    <NavLink to="MainPage" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                        Home
                    </NavLink>
                </li>
                <li className="navbar-element"> 
                    <NavLink to="AboutUs" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                        About Us
                    </NavLink>
                </li>
                <li className="navbar-element">
                    <NavLink to="LeaderBoard" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                        LeaderBoard
                    </NavLink>    
                </li>
                <li className="navbar-element">
                    <NavLink to="LogIn" className={({isActive}) => isActive ? "navbar-link name" : "navbar-link"}>
                        LogIn
                    </NavLink>    
                </li>
            </ul>

        </nav>
    </header>
  )
}

export default Navbar;