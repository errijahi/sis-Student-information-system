import React, { useState, useEffect } from "react";
import StudentService from "../../Services/StudentService";

import MUIDataTable from "mui-datatables";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StudentAdd from "./StudentAdd";
import StudentDelete from "./StudentDelete";
import StudentEdit from "./StudentEdit";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";

// import axios from 'axios';

import "../stylies/Table.css";
import "../stylies/add-bar.css";

const Students = (props) => {
  const [students, setStudents] = useState([]);

  const getPosts = async () => {
    StudentService.getStudents()
      .then((data) => {
        setStudents(data.students);
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
  const Study = "Study program";
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
      label: Study,
      name: "Study_program",
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
              <Link to={"/StudentEdit/" + value} className="Linkd">
                {" "}
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
              <Link to={"/StudentDelete/" + value} className="Linkd">
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
    // rowsPerPage: 10,
    // rowsPerPageOptions:[10],
    // pagination: true,
  };

  return (
    <Router>
      <div className="Students-list">
        <div className="add-bar">
          <Link to={"/StudentAdd"} className="Linkb">
            <AddBoxIcon />
          </Link>
        </div>
        <MUIDataTable
          title="Students"
          data={students}
          columns={columns}
          options={options}
        />
        <div className="App"></div>

        <Route path="/StudentEdit/:id" component={StudentEdit} />
        <Route path="/StudentAdd" component={StudentAdd} />
        <Route path="/StudentDelete/:id" component={StudentDelete} />
      </div>
    </Router>
  );
};

export default Students;
