/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {LoadingContext} from "../App"; 

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errM, setErrM] = useState("");
  const navigate = useNavigate();
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    if (props.IsAuthenticated === true) {
      navigate("/admin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.IsAuthenticated]);

  function somethingWentWrong() {
    setErrM("Something went wrong, maybe your credentials. Please try again!");
    setTimeout(() => {
      setErrM("");
    }, 1000);
  }

  async function submit(e) {
    setLoadingState(true)
    const loginData = {
      username: username,
      password: password,
    };
    e.preventDefault();
    console.log(loginData);
    const response = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/auth/login",
      loginData,
      {
        headers: { "Access-Control-Allow-Origin": "*" },
      }
    );
    if (!response || !response.status) {
      somethingWentWrong();
      return;
    }
    if (response.status === 200) {
      localStorage.setItem("loginToken", JSON.stringify(response.data));
      props.setIsAuthenticated(true);
    } else if (response.status === 404) {
      setErrM("The username or the password is wrong. Please try again!");
      setTimeout(() => {
        setErrM("");
      }, 1000);
    }
    setLoadingState(false)
  }

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="lg:w-4/12 w-full flex flex-col justify-center h-full ml-2 mr-2">
        <div className="flex flex-col w-full h-auto p-4 bg-dtickit-green text-center rounded-md mb-6">
          <h1 className="text-6xl text-white font-bold font-poppins mb-5">
            Login
          </h1>
          <input
            className="m-2 p-2 rounded-md text-center font-poppins"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="m-2 p-2 rounded-md text-center font-poppins"
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            onClick={submit}
            className="m-2 p-2 rounded-md bg-white font-poppins"
          >
            Login
          </button>
          <h1>{errM}</h1>
          <Link to="/register">
            <h1 className="text-white underline font-poppins">
              Click to register.
            </h1>
          </Link>
        </div>
        <div className="bg-red-300 p-3 rounded-md flex justify-evenly items-center gap-3">
          <h1 className="text-red-600 text-2xl font-black font-poppins">!</h1>
          <h1 className="text-red-600 font-extrabold font-poppins">
            This is an alpha (development) version of the tickit application.
            Please be aware that your data may be corrupted or deleted.
          </h1>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {};

export default Login;
