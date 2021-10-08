import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../stylies/ProfessorAdd.css";

export default function ProfessorEdit(props) {
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

  const UpdateProfessor = (e) => {
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
      .post(
        "http://localhost:3000/user/professorup/" + props.match.params.id,
        data
      )
      .then((result) => {
        props.history.push("/");
      });
  };

  const onChange = (e) => {
    e.presist = () => {};
    setProfessor({ ...professor, [e.target.name]: e.target.value });
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
          <h2>Edit professor</h2>
          <form onSubmit={UpdateProfessor}>
            <div>
              <input
                type="text"
                name="Name"
                id="Name"
                placeholder="Name"
                className="form-control"
                defaultValue={professor.Name}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type="text"
                name="Family_name"
                id="Family_name"
                placeholder="Family name"
                className="form-control"
                defaultValue={professor.Family_name}
                onChange={onChange}
              />
            </div>

            <div>
              <select
                id="Faculty"
                name="Faculty"
                className="form-control"
                value={professor.Faculty}
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
                defaultValue={professor.Department}
                onChange={onChange}
              ></select>
            </div>

            <div>
              <input
                type="text"
                name="Address"
                id="Address"
                placeholder="Address"
                className="form-control"
                defaultValue={professor.Address}
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
                defaultValue={professor.Phone_number}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type="email"
                name="Email"
                id="Email"
                placeholder="Email"
                className="form-control"
                defaultValue={professor.Email}
                onChange={onChange}
              />
            </div>

            <div>
              <input
                type="number"
                name="Jmbg"
                id="Jmbg"
                placeholder="Jmbg"
                className="form-control"
                defaultValue={professor.Jmbg}
                onChange={onChange}
              />
            </div>

            <div>
              <input type="submit" className="btn btn-primary" value="Update" />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Link to="/Professors" className="Linkc">
                Back
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
