/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PassChangeLoggedIn from "../components/passchange_logged_in";
import{LoadingContext} from "../App"

function UserSettings(props) {
  const [AccData, setAccData] = useState();
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    GetUserSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <h1 className="font-bold font-poppins text-xl">
          Your account settings:
        </h1>
        {AccData && (
          <>
            <div className="w-5/6 flex flex-col justify-start items-center border-2 p-1 rounded-md gap-1">
              <h1 className="text-black font-poppins font-semibold">
                Username
              </h1>
              <input
                type="text"
                value={AccData.username}
                className="w-11/12 text-center p-2 rounded-md border-2"
                onChange={(e) => {
                  ChangeAccDataValue(
                    e.target.value,
                    AccData.email,
                    AccData.emailNotifications
                  );
                }}
              />
            </div>
            <div className="w-5/6 flex flex-col justify-start items-center border-2 p-1 rounded-md gap-1">
              <h1 className="text-black font-poppins font-semibold">
                Email address
              </h1>
              <input
                className="w-11/12 text-center p-2 rounded-md border-2"
                type="email"
                value={AccData.email}
                onChange={(e) => {
                  ChangeAccDataValue(
                    AccData.username,
                    e.target.value,
                    AccData.emailNotifications
                  );
                }}
              />
            </div>
            <div className="w-5/6 flex justify-center items-center border-2 p-1 rounded-md gap-1">
              <input
                type="checkbox"
                id="notif"
                defaultChecked={AccData.emailNotifications}
                onChange={(e) => {
                  ChangeAccDataValue(
                    AccData.username,
                    AccData.email,
                    !AccData.emailNotifications
                  );
                }}
              />
              <label
                for="notif"
                className="text-black font-poppins font-semibold"
              >
                I would like to recive email notifications.
              </label>
            </div>
            <button
              className="bg-red-500 rounded-md text-white font-poppins font-bold w-5/6 p-2"
              onClick={() => {
                saveAccData();
              }}
            >
              Save data
            </button>
          </>
        )}
      </div>
      <br />
      <div className="w-full flex justify-start items-center flex-col">
        <details className="w-full flex-col flex justify items-center">
          <summary className="font-poppins font-bold text-xl text-center w-full mb-2">
            Change password
          </summary>
          <PassChangeLoggedIn></PassChangeLoggedIn>
        </details>
      </div>

      <br />
      <div className="w-full flex flex-col justify-start items-center gap-2 pb-6">
        <h1 className="text-xl font-bold font-poppins">Others:</h1>
        <button
          onClick={Logout}
          className="bg-red-500 rounded-md text-white font-poppins font-bold w-5/6 p-2"
        >
          Logout
        </button>
      </div>
    </>
  );

  async function saveAccData() {
    setLoadingState(true)
    const logintoken = await localStorage.getItem("loginToken");
    const resp = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/users/saveUserSettings",
      { loginToken: logintoken, data: AccData }
    );
    console.log(resp);
    if (resp.status === 200) {
      localStorage.removeItem("loginToken");
      alert(
        "Your data has been saved successfully! Please refresh this page and log in again!"
      );
      setLoadingState(false)
    }
  }

  async function GetUserSettings() {
    setLoadingState(true)
    const logintoken = await localStorage.getItem("loginToken");
    const set = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/users/getUserSettings",
      { loginToken: logintoken }
    );
    setAccData(set.data[0]);
    setLoadingState(false)
  }

  function ChangeAccDataValue(username, email, notifications) {
    let notif = notifications ? 1 : 0;
    let currentSetting = {
      id: AccData.id,
      username: username,
      password: AccData.password,
      email: email,
      emailNotifications: notif,
    };
    setAccData(currentSetting);
  }

  function Logout() {
    localStorage.removeItem("loginToken");
    window.location.href = "https://app-tickit.vercel.app/login";
  }
}

export default UserSettings;
