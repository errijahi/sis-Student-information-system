import React, { useState, useRef, useEffect } from "react";
import AuthService from "../../Services/AuthService";
import Message from "../Main/Message";

import "../stylies/Loginst.css";

const Register = (props) => {
  const [user, setUser] = useState({ username: "", password: "", role: "" });
  const [message, setMessage] = useState(null);
  let timerID = useRef(null);

  const [message1, setMessage1] = useState();
  const [message2, setMessage2] = useState();
  const [message3, setMessage3] = useState();

  const usernameInput = useRef(null);
  const passwordInput = useRef(null);
  const roleInput = useRef(null);

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

    if (roleInput.current.value === "") {
      setMessage3(<p className="alert-danger-text">Role cannot be empty</p>);
    } else {
      setMessage3("");
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    AuthService.register(user).then((data) => {
      const { message } = data;
      setMessage(message);
      // resetForm();
      if (!message.msgError) {
        timerID = setTimeout(() => {
          props.history.push("/login");
        }, 2000);
      }
    });
  };

  return (
    <div>
      <form className="box" onSubmit={onSubmit}>
        <h1>SIS</h1>
        <h2>Please Register</h2>

        <div>
          <label htmlFor="username" className="sr-only">
            {" "}
          </label>
          <input
            type="text"
            name="username"
            defaultValue={user.username}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Username"
            ref={usernameInput}
          />
        </div>
        {message1}
        <div>
          <label htmlFor="password" className="sr-only">
            {" "}
          </label>
          <input
            type="password"
            name="password"
            defaultValue={user.password}
            onChange={onChange}
            className="form-control"
            placeholder="Enter Password"
            ref={passwordInput}
          />
        </div>
        {message2}
        <div>
          <select
            name="role"
            defaultValue={user.role}
            onChange={onChange}
            className="form-control"
            ref={roleInput}
          >
            <option disabled={true} hidden value="">
              Choose Role
            </option>
            <option value="user">Guest</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {message3}
        <div>
          <input defaultValue="Register" type="submit" onClick={onClick} />
        </div>
      </form>
      {message ? <Message message={message} /> : null}
    </div>
  );
};

export default Register;
