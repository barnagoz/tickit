/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";
import { useState, useContext } from "react";
import {LoadingContext} from "../App"

function PassChangeLoggedIn(props) {
  const [OldPass, setOldPass] = useState();
  const [NewPass1, setNewPass1] = useState();
  const [NewPass2, setNewPass2] = useState();
  const [ViewPasses, setViewPasses] = useState(false);
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  return (
    <div className="w-full h-auto flex flex-col gap-2 justify-start items-center">
      <div className="w-5/6 border-2 flex flex-col items-center p-1 rounded-md gap-1">
        <h1 className="text-black font-poppins font-semibold">Old password</h1>
        <input
          type={ViewPasses ? "text" : "password"}
          value={OldPass}
          onChange={(e) => {
            setOldPass(e.target.value);
          }}
          className="w-11/12 bg-white p-2 rounded-md text-center border-2"
        />
      </div>
      <div className="w-5/6 border-2 flex flex-col items-center p-1 rounded-md gap-1">
        <h1 className="text-black font-poppins font-semibold">New password</h1>
        <input
          type={ViewPasses ? "text" : "password"}
          value={NewPass1}
          onChange={(e) => {
            setNewPass1(e.target.value);
          }}
          className="w-11/12 bg-white p-2 rounded-md text-center border-2"
        />
      </div>
      <div className="w-5/6 border-2 flex flex-col items-center p-1 rounded-md gap-1">
        <h1 className="text-black font-poppins font-semibold">
          New password again
        </h1>
        <input
          type={ViewPasses ? "text" : "password"}
          value={NewPass2}
          onChange={(e) => {
            setNewPass2(e.target.value);
          }}
          className="w-11/12 bg-white p-2 rounded-md text-center border-2"
        />
      </div>
      {!ViewPasses ? (
        <button
          className="w-5/6 border-2 rounded-md text-center p-2 font-poppins text-black font-bold"
          onClick={() => setViewPasses(!ViewPasses)}
        >
          Show passwords
        </button>
      ) : (
        <button
          className="w-5/6 bg-dtickit-green rounded-md text-center p-2 font-poppins text-white font-bold"
          onClick={() => setViewPasses(!ViewPasses)}
        >
          Hide passwords
        </button>
      )}
      <button
        className="w-5/6 bg-red-500 rounded-md text-center p-2 font-poppins text-white font-bold"
        onClick={() => savePass()}
      >
        Save data
      </button>
    </div>
  );

  async function savePass() {
    setLoadingState(true);
    if (
      NewPass1 !== NewPass2 ||
      OldPass === "" ||
      NewPass1 === "" ||
      NewPass2 === ""
    ) {
      alert("The new passwords must match and every field must be filled in.");
      setLoadingState(false);
      return;
    }
    const loginToken = localStorage.getItem("loginToken");

    const resp = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/users/changePass`,
      {
        loginToken: loginToken,
        oldPass: OldPass,
        newPass: NewPass1,
      }
    );
    setLoadingState(false)
    console.log(resp);
  }
}

export default PassChangeLoggedIn;
