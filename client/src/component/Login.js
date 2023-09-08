import React, { useState } from "react";
import "./Style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/login", {
        ...inputValues,
      });
      localStorage.setItem("token", JSON.stringify(response));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label htmlFor="email" className="lable"></label>
          <input
            type="email"
            id="email"
            name="email"
            value={inputValues.email}
            placeholder="Enter your email"
            onChange={handleOnChange}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="password" className="lable"></label>
          <input
            type="password"
            id="password"
            name="password"
            value={inputValues.password}
            placeholder="Enter your password"
            onChange={handleOnChange}
            className="input"
          />
        </div>
        <button type="submit" className="button">
          Login
        </button>
        <span>
          Don't have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
