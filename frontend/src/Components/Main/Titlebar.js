import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthService from "../../Services/AuthService";
import { AuthContext } from "../../Context/AuthContext";

import "../stylies/Titlebar.css";

const Titlebar = (props) => {
  const { isAuthenticated, setIsAuthenticated, setUser } =
    useContext(AuthContext);

  const onClickLogoutHandler = () => {
    AuthService.logout().then((data) => {
      if (data.success) {
        setUser(data.user);
        setIsAuthenticated(false);
      }
    });
  };

  const unauthenticatedNavBar = () => {
    return (
      <div className="fragment">
        <div className="menub">
          <Link to="/login" className="Linka">
            Login
          </Link>{" "}
          &nbsp;&nbsp;
          <Link to="/register" className="Linka">
            Register
          </Link>
        </div>
      </div>
    );
  };

  const authenticatedNavBar = () => {
    return (
      <div className="fragment">
        <Link to="/menu" className="Linka">
          Menu
        </Link>{" "}
        &nbsp;&nbsp;
        <Link onClick={onClickLogoutHandler} className="Linka">
          Logout
        </Link>
      </div>
    );
  };
  return (
    <nav>
      <div className="Title-bar">
        <div className="Title-bar-title">
          <div>&nbsp;&nbsp;&nbsp;SIS</div>
        </div>
        <ul className="Title-bar-menu">
          {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
        </ul>
      </div>
    </nav>
  );
};

export default Titlebar;
