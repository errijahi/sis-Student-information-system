import React, { useState, useEffect } from "react";
import ProfessorService from "../../Services/ProfessorService";

import MUIDataTable from "mui-datatables";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProfessorAdd from "./ProfessorAdd";
import ProfessorDelete from "./ProfessorDelete";
import ProfessorEdit from "./ProfessorEdit";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";

import "../stylies/Table.css";
import "../stylies/add-bar.css";

const Professors = (props) => {
  const [professors, setProfessors] = useState([]);

  const getPosts = async () => {
    ProfessorService.getProfessors()
      .then((data) => {
        setProfessors(data.professors);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPosts();

    const interval = setInterval(() => {
      getPosts();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const Family = "Family name";
  const Phone = "Phone number";

  const columns = [
    {
      name: "Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: Family,
      name: "Family_name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Faculty",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Department",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Address",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: Phone,
      name: "Phone_number",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Email",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Jmbg",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "_id",
      label: "Edit",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className="fragment">
              {" "}
              <Link to={"/ProfessorEdit/" + value} className="Linkd">
                <AddCircleOutlineIcon />
              </Link>
            </div>
          );
        },
      },
    },
    {
      name: "_id",
      label: "Delete",
      options: {
        filter: false,
        sort: true,
        customBodyRender: (value) => {
          return (
            <div className="fragment">
              {" "}
              <Link to={"/ProfessorDelete/" + value} className="Linkd">
                <HighlightOffIcon />
              </Link>
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
    selectableRows: "none",
    pagination: true,
  };

  return (
    <Router>
      <div className="Students-list">
        <div className="add-bar">
          <Link to={"/ProfessorAdd"} className="Linkb">
            <AddBoxIcon />
          </Link>
        </div>
        <MUIDataTable
          title="Professor"
          data={professors}
          columns={columns}
          options={options}
        />
        <Route path="/ProfessorEdit/:id" component={ProfessorEdit} />
        <Route path="/ProfessorAdd" component={ProfessorAdd} />
        <Route path="/ProfessorDelete/:id" component={ProfessorDelete} />
      </div>
    </Router>
  );
};

export default Professors;
