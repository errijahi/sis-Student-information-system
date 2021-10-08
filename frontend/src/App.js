import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./hocs/PrivateRoute";
import UnPrivateRoute from "./hocs/UnPrivateRoute";
import Login from "./Components/Main/Login";
import Register from "./Components/Main/Register";
import Menu from "./Components/Main/Menu";
import Professors from "./Components/Professor/Professors";
import Assistances from "./Components/Assistance/Assistances";
import Staffs from "./Components/Staff/Staffs";
import Students from "./Components/Student/Students";
import Users from "./Components/Users/Users";

import Titlebar from "./Components/Main/Titlebar";

function App() {
  return (
    <Router>
      <div>
        <Titlebar />
        <Route exact path="/" component={Login} />
        <UnPrivateRoute path="/login" component={Login} />
        <UnPrivateRoute path="/register" component={Register} />
        <PrivateRoute
          path="/professors"
          roles={["user", "admin"]}
          component={Professors}
        />
        <PrivateRoute path="/menu" roles={["user", "admin"]} component={Menu} />
        <PrivateRoute
          path="/assistances"
          roles={["user", "admin"]}
          component={Assistances}
        />
        <PrivateRoute
          path="/staffs"
          roles={["user", "admin"]}
          component={Staffs}
        />
        <PrivateRoute
          path="/students"
          roles={["user", "admin"]}
          component={Students}
        />
        <PrivateRoute path="/users" roles={["admin"]} component={Users} />
      </div>
    </Router>
  );
}

export default App;
