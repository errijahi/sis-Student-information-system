import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorDelete.css";

export default function StudentDelete(props) {
  const [professor, setProfessor] = useState({
    Id: "",
    Name: "",
    Family_name: "",
    Faculty: "",
    Department: "",
    Address: "",
    Phone_number: "",
    Email: "",
    Jmbg: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/professor/" + props.match.params.id)
      .then((response) => setProfessor(response.data));
  }, []);

  const DeleteStudent = (e) => {
    e.preventDefault();
    const data = {
      Id: props.match.params.id,
      Name: professor.Name,
      Family_name: professor.Family_name,
      Faculty: professor.Faculty,
      Department: professor.Department,
      Address: professor.Address,
      Phone_number: professor.Phone_number,
      Email: professor.Email,
      Jmbg: professor.Jmbg,
    };

    axios
      .delete(
        "http://localhost:3000/user/professordel/" + props.match.params.id,
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
          <form onSubmit={DeleteStudent}>
            <div>
              <input className="inputd" type="submit" value="Delete" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/professor" className="Linkc">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
