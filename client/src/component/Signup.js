import { React, useState } from "react";
import "./Style.css";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/signup", {
        ...inputValues,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
    setInputValues({
      ...inputValues,
      email: "",
      password: "",
      username: "",
    });
  };
  return (
    <div>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputValues.email}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="username" className="label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={inputValues.username}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            onChange={handleOnChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="button">
          Sign Up
        </button>
        <span>
          Already have an account? <Link to={"/login"}>Login</Link>
        </span>
      </form>
    </div>
  );
};
export default Signup;
