import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorAdd.css";

export default function StudentEdit(props, value, id) {
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

  const UpdateStudent = (e) => {
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
      .post(
        "http://localhost:3000/user/studentup/" + props.match.params.id,
        data
      )
      .then((result) => {
        props.history.push("/");
      });
  };

  const onChange = (e) => {
    e.presist = () => {};
    setStudents({ ...students, [e.target.name]: e.target.value });
  };

  const onClickDepartments = () => {
    var a = document.getElementById("Faculty").value;
    if (a === "Ekonomski fakultet") {
      var array = [
        "Ekonomija",
        "Racunovodstvo,finansije i revizja",
        "Finansijska trzista,instrumenti i institucije",
        "Preduzetnistvo",
        "Marketing i trgovina",
        "Menadzment",
        "Menadzment u obrazovanju",
        "Menadzment u zdravstvu",
        "Turizam i hoteljerstvo",
      ];
    } else if (a === "Ekoloski fakultet") {
      array = [
        "Ekologija i zastita zivotne sredine",
        "Inzinjerstvo zastite zivotne sredine",
        "Biodiverzitet",
        "Zastita okolisa u gradovima",
        "Odrzivi razvoj",
      ];
    } else if (a === "Saobracajni fakultet") {
      array = [
        "Drumski i gradski saobracaj",
        "Vazdusni saobracaj",
        "Sigurnost u drumskom saobracaju",
        "Saobracaj",
      ];
    } else if (a === "Pravni fakultet") {
      array = [
        "Gradanskopravni",
        "Historija drazave i prava",
        "Krivicnopravni",
        "Drzavno i medunarodno javno pravo",
        "Privrednopravni",
        "Javna uprava",
      ];
    } else if (a === "Fakultet informacionh tehnologija") {
      array = [
        "Informacione tehnologije",
        "Racunarski sistemi i mreze",
        "Softversko programiranje",
      ];
    } else if (a === "Fakultet za medije i komunikacije") {
      array = ["Odnosi sa javnoscu", "Mediji", "Komunikacije"];
    } else if (a === "Fakultet politehnickih nauka") {
      array = [
        "Motor i vozila",
        "Proizvodno masinstvo",
        "Energetika",
        "Masinske konstrukcije",
        "Energetska efikasnost i obnovljivi izvori energije",
        "Gradevinarstvo",
        "Hidrookolinski inzinjering",
        "Putevi",
        "Elektroenergetika",
        "Telekomunikacije",
        "Racunarstvo i informatika",
        "Privredna i tehnicka logistika",
        "Logistika sistema",
        "Logisticki menadzment",
        "Sigurnost",
        "Zastita na radu",
        "Korporativna sigurnost",
        "Inzinjerski menadzment",
        "Arhitektura i urabanizam",
      ];
    } else {
      array = [];
    }
    var string = "";
    for (var i = 0; i < array.length; i++) {
      string = string + "<option>" + array[i] + "</option>";
    }
    string = "<select name='lol'>" + string + "";
    document.getElementById("Department").innerHTML = string;
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
          <h2>Edit student</h2>
          <form onSubmit={UpdateStudent}>
            <div>
              <input
                name="Name"
                id="Name"
                type="text"
                placeholder="Name"
                className="form-control"
                defaultValue={students.Name}
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
                defaultValue={students.Family_name}
                onChange={onChange}
              />
            </div>

            <div>
              <select
                id="Faculty"
                name="Faculty"
                className="form-control"
                value={students.Faculty}
                onClick={onClickDepartments}
                onChange={onChange}
              >
                <option disabled={true} hidden value="">
                  Izaberi fakultet
                </option>
                <option value="Ekonomski fakultet">Ekonomski fakultet</option>
                <option value="Ekoloski fakultet">Ekoloski fakultet</option>
                <option value="Saobracajni fakultet">
                  Saobracajni fakultet
                </option>
                <option value="Pravni fakultet">Pravni fakultet</option>
                <option value="Fakultet informacionh tehnologija">
                  Fakultet informacionh tehnologija
                </option>
                <option value="Fakultet za medije i komunikacije">
                  Fakultet za medije i komunikacije
                </option>
                <option value="Fakultet politehnickih nauka">
                  Fakultet politehnickih nauka
                </option>
              </select>
            </div>

            <div>
              <select
                id="Department"
                name="Department"
                className="form-control"
                defaultValue={students.Department}
                onChange={onChange}
              ></select>
            </div>

            <div>
              <select
                placeholder=""
                id="Study_program"
                name="Study_program"
                className="form-control"
                value={students.Study_program}
                // onClick={this.onClick}
                onChange={onChange}
              >
                <option disabled={true} hidden value="">
                  Izaberi studiski program
                </option>
                <option value="3+2">3+2</option>
                <option value="4+1">4+1</option>
              </select>
            </div>

            <div>
              <input
                type="text"
                name="Address"
                id="Address"
                placeholder="Address"
                className="form-control"
                defaultValue={students.Address}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type="number"
                name="Phone_number"
                id="Phone_number"
                placeholder="Phone number"
                className="form-control"
                defaultValue={students.Phone_number}
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
                defaultValue={students.Email}
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
                defaultValue={students.Jmbg}
                onChange={onChange}
              />
            </div>

            <div>
              <input type="submit" className="btn btn-primary" value="Update" />
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
