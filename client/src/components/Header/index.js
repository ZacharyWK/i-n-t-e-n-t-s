import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import styled, { css } from "styled-components";

import Auth from "../../utils/auth";

const Header = () => {
  let authData = Auth.getProfile().data; //.username
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header>

      <div className="headWrapper">
        <Link to="/">
          <h1 className="title">
            in<b>TENTS</b>
          </h1>
        </Link>
      </div>

      <div className="barWrap">
        <div className="bar">
          <Link className="navItem" to="/search">
            find<b>PARK</b>
          </Link>
          <Link className="navItem" to="/basecamp">
            base<b>CAMP</b>
          </Link>
          <Link className="logOut" onClick={logout}>
            log<b>OUT</b>
          </Link>
        </div>
      </div>

    </header>
  );
};

export default Header;
