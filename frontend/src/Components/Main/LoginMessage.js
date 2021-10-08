import React from "react";

import "../stylies/Loginst.css";

const getStyle = (props) => {
  let baseClass = "alert ";
  baseClass = baseClass + "alert-danger";
  return baseClass;
};

const LoginMessage = (props) => {
  return (
    <div className={getStyle(props)} role="alert">
      {props.message}
    </div>
  );
};

export default LoginMessage;
