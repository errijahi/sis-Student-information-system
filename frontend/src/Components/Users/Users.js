import React, { useState, useEffect } from "react";
import userservice from "../../Services/UserService";

import MUIDataTable from "mui-datatables";

import { BrowserRouter as Router } from "react-router-dom";

import "../stylies/Table.css";

const Users = (props) => {
  const [users, setUsers] = useState([]);

  const getPosts = async () => {
    userservice
      .getUsers()
      .then((data) => {
        setUsers(data.users);
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

  const columns = [
    {
      name: "username",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "role",
      options: {
        filter: true,
        sort: true,
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
        <MUIDataTable
          title="Users"
          data={users}
          columns={columns}
          options={options}
        />
      </div>
    </Router>
  );
};

export default Users;
