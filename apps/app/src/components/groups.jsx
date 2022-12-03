/* eslint-disable no-unused-vars */
import React from "react";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { HexColorPicker } from "react-colorful";
import {LoadingContext} from "../App"

function Groups(props) {
  const [Group, setGroup] = useState();
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  async function getUserGroups() {
    const loginToken = localStorage.getItem("loginToken");
    setLoadingState(true)
    const groups = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/getUserGroups",
      { loginToken: loginToken }
    );
    setLoadingState(false);
    setGroup(groups.data);
  }

  useEffect(() => {
    getUserGroups();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.IsAuthenticated]);

  async function saveData(e) {
    e.preventDefault();
    const logintoken = localStorage.getItem("loginToken");
    setLoadingState(true)
    const resp = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/saveGroups",
      {
        loginToken: logintoken,
        groups: Group,
      }
    );
    setLoadingState(false)
    console.log(resp);
  }

  return (
    <div className="h-auto pb-8">
      <h1 className="text-5xl font-poppins font-extrabold p-4">Groups:</h1>
      <div className="w-full h-full flex flex-col justify-start items-center gap-2">
        {Group &&
          Group[0] &&
          Group.map((element, index) => (
            <div className="w-5/6 flex items-center justify-evenly p-2 h-auto bg-white rounded-md border-2 shadow-md">
              <div className="flex flex-col justify-start items-center p-1 gap-1 w-5/6">
                <h1 className="text-black font-poppins font-semibold">
                  Group name
                </h1>
                <input
                  type="text"
                  className="text-center border-2 w-5/6 p-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={element.name === "Ungrouped" ? true : false}
                  value={Group[index].name}
                  onChange={(e) =>
                    changeData(e.target.value, Group[index].color, index)
                  }
                ></input>
                <h1 className="text-black font-poppins font-semibold">Color</h1>
                <details>
                  <summary className="flex flex-row justify-center">
                    <div
                      className="w-10 h-10 rounded-full border-2 cursor-pointer"
                      style={{ backgroundColor: Group[index].color }}
                    />
                  </summary>
                  <HexColorPicker
                    color={Group[index].color}
                    onChange={(e) => {
                      changeData(Group[index].name, e, index);
                    }}
                  />
                </details>
              </div>
              <div
                key={element.id / 7}
                className="w-10 flex h-full items-center flex-col justify-center gap-1"
              >
                <button
                  key={element.id / 3}
                  className="bg-white rounded-md w-10 h-10 flex items-center justify-center border-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={element.name === "Ungrouped" ? true : false}
                  onClick={() => {
                    return null;
                  }}
                >
                  <h1 className="font-poppins font-bold">X</h1>
                </button>
              </div>
            </div>
          ))}
        <div className="w-5/6 flex justify-evenly gap-2">
          <button
            className="bg-red-500 rounded-md w-full h-auto p-2 text-white font-bold font-poppins"
            onClick={saveData}
          >
            Save groups
          </button>
          <button onClick={addGroup} className="bg-blue-500 rounded-md w-full h-auto p-2 text-white font-bold font-poppins">
            + Add group
          </button>
        </div>
      </div>
    </div>
  );

  function changeData(name, color, index) {
    let currentGroup = [...Group];
    currentGroup[index].name = name;
    currentGroup[index].color = color;
    setGroup(currentGroup);
  }

  function addGroup() {
    let currentGroup = [...Group];
    currentGroup.push({color: '#000000', name: "New group"})
    setGroup(currentGroup)
  }
}

export default Groups;
