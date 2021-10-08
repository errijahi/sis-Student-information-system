import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";

import "../stylies/Menu.css";

const Menu = (props) => {
  const { user } = useContext(AuthContext);

  return (
    <div className="fragment">
      <div className="menu-cards">
        <div className="card">
          <div className="card-body">
            <h3 className="card-text-title">Professors</h3>
            <p className="card-text">
              {" "}
              To see more informations for professors click below.
            </p>
            <Link to="/professors" className="Linkc">
              Professors
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="card-text-title">Assistances</h3>
            <p className="card-text">
              To see more informations for assistances click below.
            </p>
            <Link to="/assistances" className="Linkc">
              Assistances
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="card-text-title">Staffs</h3>
            <p className="card-text">
              To see more informations for staffs click below.
            </p>
            <Link to="/staffs" className="Linkc">
              Staffs
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="card-text-title">Students</h3>
            <p className="card-text">
              To see more informations for students click below.
            </p>
            <Link to="/students" className="Linkc">
              Students
            </Link>
          </div>
        </div>

        {user.role === "admin" ? (
          <div className="card">
            <div className="card-body">
              <h3 className="card-text-title">Users</h3>
              <p className="card-text">
                To see more informations for users click below.
              </p>
              <Link to="/users" className="Linkc">
                Students
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
