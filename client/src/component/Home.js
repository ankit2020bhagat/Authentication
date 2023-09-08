import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const verifyCookies = async () => {
    const userToken = JSON.parse(localStorage.getItem("token"));
    if (userToken) {
      const token = userToken.data.token;

      const { response } = await axios.post(
        "http://localhost:4000/",
        { token },
        { withCredentials: true }
      );
      setUserName(userToken.data.username);
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    verifyCookies();
  }, []);

  const Logout = () => {
    window.localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>

        <button onClick={Logout}>LOGOUT</button>
      </div>
    </>
  );
};

export default Home;
