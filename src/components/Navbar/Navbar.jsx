import React from "react";
import "./navbar.scss";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="" />

      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="navright">
        <select>
          <option value="usd">USD</option>
          <option value="eur">Eur</option>
          <option value="mxn">MXN</option>
        </select>
        <button>
          Sign Up <img src={arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
