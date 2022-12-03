/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Item,
  Separator,
  Submenu,
  useContextMenu,
} from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import {LoadingContext} from "../App";

function Dashboard(props) {
  const [Reports, setReports] = useState([]);
  const [Groups, setGroups] = useState();
  const navigate = useNavigate();
  const MENU_ID = "selector";
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  useEffect(() => {
    GetReports();
    getUserGroups();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.IsAuthenticated]);

  const { show } = useContextMenu({ id: MENU_ID });

  return (
    <>
      <div className="mt-0">
        <div className="bg-red-300 p-3 rounded-md flex justify-evenly items-center gap-3 m-2">
          <h1 className="text-red-600 text-2xl font-black font-poppins">!</h1>
          <h1 className="text-red-600 font-extrabold font-poppins">
            This is a development version of the tickit application.
            Please be aware that your data may be corrupted or deleted.
          </h1>
        </div>
        <h1 className="text-5xl font-poppins font-extrabold p-4">Reports:</h1>
        <div className="w-full flex flex-wrap justify-items-start card-gap card-padding h-auto row-gap-1">
          {Object.keys(Reports).map((element, index) => {
            return (
              <div
                onClick={() => navigate("/view-report/" + Reports[index].id)}
                onContextMenu={displayMenu}
                style={{ borderColor: Reports[index].color }}
                id={Reports[index].id}
                className="text-base hover:text-xl rounded-xl card-width text-center pt-3 pb-3 border-2 shadow-mx hover:shadow-lg duration-200 flex overflow-hidden items-center justify-center gap-1"
              >
                <div
                  className="rounded-full w-4 h-4 border-2"
                  style={{
                    backgroundColor: Reports[index].color,
                  }}
                ></div>
                <h1 className="font-poppins overflow-hidden">
                  {Reports[index].reporter_email}
                </h1>
              </div>
            );
          })}
        </div>
      </div>
      <Menu id={MENU_ID}>
        {Groups && Groups[0] && (
          <Submenu label="Groups">
            {Groups.map((element, index) => (
              <Item id={element.id} onClick={handleClickGroup}>
                <div className="w-full h-full flex justify-start items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2"
                    style={{ backgroundColor: element.color }}
                  ></div>
                  <h1>{element.name}</h1>
                </div>
              </Item>
            ))}
          </Submenu>
        )}
        <Separator />
        <Item onClick={deleteReport}>Delete</Item>
      </Menu>
    </>
  );

  async function GetReports() {
    const logintoken = await localStorage.getItem("loginToken");
    setLoadingState(true)
    const reports = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/reports/getUserReports",
      { loginToken: logintoken }
    );
    setLoadingState(false)
    setReports(reports.data);
  }

  async function getUserGroups() {
    const loginToken = localStorage.getItem("loginToken");
    setLoadingState(true);
    const groups = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/getUserGroups",
      { loginToken: loginToken }
    );
    setLoadingState(false)
    setGroups(groups.data);
  }

  function displayMenu(e) {
    // pass the item id so the `onClick` on the `Item` has access to it
    show(e, { props: { id: Number(e.currentTarget.id) } });
  }

  async function handleClickGroup({ event, props }) {
    const logintoken = localStorage.getItem("loginToken");
    setLoadingState(true)
    await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/addReportToGroup",
      {
        reportId: props.id,
        groupId: event.currentTarget.id,
        loginToken: logintoken,
      }
    );
    setLoadingState(false);
    GetReports();
  }

  async function deleteReport({ event, props }) {
    const logintoken = localStorage.getItem("loginToken");
    setLoadingState(true)
    await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/reports/deleteReport",
      { loginToken: logintoken, reportID: props.id }
    );
    setLoadingState(false)
    GetReports();
  }
}

export default Dashboard;
