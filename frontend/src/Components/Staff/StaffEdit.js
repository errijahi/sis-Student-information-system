import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorAdd.css";

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

  const UpdateStaff = (e) => {
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
      .post("http://localhost:3000/user/staffup/" + props.match.params.id, data)
      .then((result) => {
        props.history.push("/");
      });
  };

  const onChange = (e) => {
    e.presist = () => {};
    setStaff({ ...staffs, [e.target.name]: e.target.value });
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
        <div className="box2">
          <h2>Edit staff</h2>
          <form onSubmit={UpdateStaff}>
            <div>
              <input
                name="Name"
                id="Name"
                type="text"
                placeholder="Name"
                className="form-control"
                defaultValue={staffs.Name}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Family_name"
                id="Family_name"
                type="text"
                placeholder="Family name"
                className="form-control"
                defaultValue={staffs.Family_name}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Position"
                id="Position"
                type="text"
                placeholder="Position"
                className="form-control"
                defaultValue={staffs.Position}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Address"
                id="Address"
                type="text"
                placeholder="Address"
                className="form-control"
                defaultValue={staffs.Address}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Phone_number"
                id="Phone_number"
                type="number"
                placeholder="Phone number"
                className="form-control"
                defaultValue={staffs.Phone_number}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Email"
                id="Email"
                type="email"
                placeholder="Email"
                className="form-control"
                defaultValue={staffs.Email}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                name="Jmbg"
                id="Jmbg"
                type="number"
                placeholder="Jmbg"
                className="form-control"
                defaultValue={staffs.Jmbg}
                onChange={onChange}
              />
            </div>

            <div>
              <input type="submit" className="btn btn-primary" value="Update" />
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
