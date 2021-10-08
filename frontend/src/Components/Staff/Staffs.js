import React, { useState, useEffect } from "react";
import StaffService from "../../Services/StaffService";

import MUIDataTable from "mui-datatables";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import StaffAdd from "./StaffAdd";
import StaffDelete from "./StaffDelete";
import StaffEdit from "./StaffEdit";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";

import "../stylies/Table.css";
import "../stylies/add-bar.css";

const Staffs = (props) => {
  const [staffs, setStaffs] = useState([]);

  const getPosts = async () => {
    StaffService.getStaffs()
      .then((data) => {
        setStaffs(data.staffs);
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
      name: "Position",
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
              <Link to={"/StaffEdit/" + value} className="Linkd">
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
              <Link to={"/StaffDelete/" + value} className="Linkd">
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
          <Link to={"/StaffAdd"} className="Linkb">
            <AddBoxIcon />
          </Link>
        </div>
        <MUIDataTable
          title="Staff"
          data={staffs}
          columns={columns}
          options={options}
        />
        <Route path="/StaffEdit/:id" component={StaffEdit} />
        <Route path="/StaffAdd" component={StaffAdd} />
        <Route path="/StaffDelete/:id" component={StaffDelete} />
      </div>
    </Router>
  );
};

export default Staffs;
