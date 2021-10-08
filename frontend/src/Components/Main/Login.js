import React, { useState, useContext, useRef } from "react";
import AuthService from "../../Services/AuthService";
import Message from "./Message";
import { AuthContext } from "../../Context/AuthContext";

import "../stylies/Loginst.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);
  const authContext = useContext(AuthContext);

  const [message1, setMessage1] = useState();
  const [message2, setMessage2] = useState();

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  const onClick = () => {
    if (usernameInput.current.value === "") {
      setMessage1(
        <p className="alert-danger-text">Username cannot be empty</p>
      );
    } else {
      setMessage1("");
    }

    if (passwordInput.current.value === "") {
      setMessage2(
        <p className="alert-danger-text">Password cannot be empty</p>
      );
    } else {
      setMessage2("");
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.login(user).then((data) => {
      // console.log(data);
      const { isAuthenticated, user, message } = data;
      if (isAuthenticated) {
        authContext.setUser(user);
        authContext.setIsAuthenticated(isAuthenticated);
        props.history.push("/menu");
      } else setMessage(message);
    });
  };

  return (
    <div>
      <form className="box" onSubmit={onSubmit}>
        <h1>SIS</h1>
        <h2>Login</h2>

        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={onChange}
            ref={usernameInput}
          />
        </div>
        {message1}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            ref={passwordInput}
          />
        </div>
        {message2}
        <div>
          <input type="submit" onClick={onClick} value="Login" />
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Login;
