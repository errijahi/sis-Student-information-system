import React, { useState, useEffect } from "react";
import AssistanceService from "../../Services/AssistancesService";

import MUIDataTable from "mui-datatables";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AssistancesAdd from "./AssistancesAdd";
import AssistancesDelete from "./AssistancesDelete";
import AssistancesEdit from "./AssistancesEdit";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";

import "../stylies/Table.css";
import "../stylies/add-bar.css";

const Assistances = (props) => {
  const [assistances, setAssistances] = useState([]);

  const getPosts = async () => {
    AssistanceService.getAssistances()
      .then((data) => {
        setAssistances(data.assistances);
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
      lable: Family,
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
              <Link to={"/AssistancesEdit/" + value} className="Linkd">
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
              <Link to={"/AssistancesDelete/" + value} className="Linkd">
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
      <div>
        <div className="add-bar">
          <Link to={"/AssistancesAdd"} className="Linkb">
            <AddBoxIcon />
          </Link>
        </div>
        <MUIDataTable
          title="Assistance"
          data={assistances}
          columns={columns}
          options={options}
        />
        <Route path="/AssistancesEdit/:id" component={AssistancesEdit} />
        <Route path="/AssistancesAdd" component={AssistancesAdd} />
        <Route path="/AssistancesDelete/:id" component={AssistancesDelete} />
      </div>
    </Router>
  );
};

export default Assistances;
