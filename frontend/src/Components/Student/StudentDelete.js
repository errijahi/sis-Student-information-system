import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorDelete.css";

export default function StudentDelete(props) {
  const [students, setStudents] = useState({
    Id: "",
    Name: "",
    Family_name: "",
    Faculty: "",
    Department: "",
    Study_program: "",
    Address: "",
    Phone_number: "",
    Email: "",
    Jmbg: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/user/student/" + props.match.params.id)
      .then((response) => setStudents(response.data));
  }, []);

  const DeleteStudent = (e) => {
    e.preventDefault();
    const data = {
      Id: props.match.params.id,
      Name: students.Name,
      Family_name: students.Family_name,
      Faculty: students.Faculty,
      Department: students.Department,
      Study_program: students.Study_program,
      Address: students.Address,
      Phone_number: students.Phone_number,
      Email: students.Email,
      Jmbg: students.Jmbg,
    };

    axios
      .delete(
        "http://localhost:3000/user/studentdel/" + props.match.params.id,
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
              <Link to="/students" className="Linkc">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
