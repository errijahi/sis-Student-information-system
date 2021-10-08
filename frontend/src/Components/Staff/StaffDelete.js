import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorDelete.css";

export default function StaffEdit(props) {
  const [staffs, setStaff] = useState({
    Id: "",
    Name: "",
    Family_name: "",
    Position: "",
    Address: "",
    Phone_number: "",
    Email: "",
    Jmbg: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/staff/" + props.match.params.id)
      .then((response) => setStaff(response.data));
  }, []);

  const DeleteStaff = (e) => {
    e.preventDefault();
    const data = {
      Id: props.match.params.id,
      Name: staffs.Name,
      Family_name: staffs.Family_name,
      Position: staffs.Position,
      Address: staffs.Address,
      Phone_number: staffs.Phone_number,
      Email: staffs.Email,
      Jmbg: staffs.Jmbg,
    };

    axios
      .delete(
        "http://localhost:3000/user/staffdel/" + props.match.params.id,
        data
      )
      .then((result) => {
        props.history.push("/");
      });
  };

  return (
    <div>
      <div className="modal-overlay"></div>
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="box3">
          <h2>Are you sure you want to delete?</h2>
          <form onSubmit={DeleteStaff}>
            <div>
              <input className="inputd" type="submit" value="Delete" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/staffs" className="Linkc">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
