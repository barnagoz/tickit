/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { LoadingContext } from "../App";

function Register(props) {
  const [Email, setEmail] = useState();
  const [Username, setUsername] = useState();
  const [Password1, setPassword1] = useState();
  const [Password2, setPassword2] = useState();
  const [EmailNotification, setEmailNotification] = useState();
  const [ErrM, setErrM] = useState();
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  function somethingWentWrong() {
    setErrM(
      "Something went wront. Maybe your credentials are used, but who knows. Please try again!"
    );
    setTimeout(() => {
      setErrM("");
    }, 5000);
  }

  async function submit(e) {
    e.preventDefault();
    setLoadingState(true)
    if (Password1 !== Password2) {
      somethingWentWrong();
      setLoadingState(false)
      return;
    }

    const response = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/auth/register",
      {
        username: Username,
        email: Email,
        password: Password1,
        email_notification: EmailNotification,
      }
    );

    if (response?.status !== 200) {
      somethingWentWrong();
      setLoadingState(false)
      return;
    }
    setLoadingState(false)
    setErrM("Successfull registration! Please log in!");
    setTimeout(() => {
      setErrM("");
    }, 5000);
  }

  return (
    <div className="flex justify-center w-full h-screen">
      <div className="lg:w-4/12 w-full flex flex-col justify-center h-full ml-2 mr-2">
        <div className="flex flex-col w-full h-auto p-4 bg-dtickit-green text-center rounded-md mb-6">
          <h1 className="text-6xl text-white font-bold font-poppins mb-5">
            Register
          </h1>
          <input
            className="m-2 p-2 rounded-md text-center font-poppins"
            type="text"
            placeholder="Email address"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="m-2 p-2 rounded-md text-center font-poppins1"
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="m-2 p-2 rounded-md text-center font-poppins1"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            className="m-2 p-2 rounded-md text-center font-poppins1"
            type="password"
            placeholder="Password again"
            onChange={(e) => setPassword2(e.target.value)}
          />
          <div className="flex justify-center items-center gap-1 font-poppins">
            <input
              type="checkbox"
              onChange={(e) => setEmailNotification(e.target.value)}
            ></input>
            <p className="text-white">Get email notifications.</p>
          </div>
          <button
            onClick={submit}
            className="m-2 p-2 rounded-md bg-white font-poppins"
          >
            Register
          </button>
          <p>{ErrM}</p>
          <Link to="/login">
            <h1 className="text-white font-poppins underline">
              Click to login.
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

Register.propTypes = {};

export default Register;
