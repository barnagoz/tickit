/* eslint-disable no-unused-vars */
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import errorimg from "../images/cancel.png";
import HashLoader from "react-spinners/HashLoader";
import Head from "../components/head";
import { LoadingContext } from "../App";

function ViewReport(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ReportData, setReportData] = useState();
  const [IsLoading, setIsLoading] = useState(false);
  const [Groups, setGroups] = useState();
  const [Error, setError] = useState(false);
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  async function getUserGroups() {
    setLoadingState(true);
    const loginToken = localStorage.getItem("loginToken");
    const groups = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/getUserGroups",
      { loginToken: loginToken }
    );
    setGroups(groups.data);
    setLoadingState(false);
  }

  async function deleteReport() {
    setLoadingState(true);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/reports/deleteReport`,
      { loginToken: props.LoginToken, reportID: id }
    );

    console.log(response);
    if (response.status === 200) {
      setLoadingState(false);
      navigate("/admin");
    }
  }

  useEffect(() => {
    if (props.IsAuthenticated === false) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.IsAuthenticated]);

  async function getReportData() {
    setIsLoading(true);
    const reportData = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/reports/getReportData`,
      {
        loginToken: props.LoginToken,
        reportId: id,
      }
    );
    reportData.data.sort(function (a, b) {
      return a.number - b.number;
    });
    setReportData(reportData.data);
  }

  useEffect(() => {
    getReportData();
    getUserGroups();

    if (ReportData && ReportData.length > 0) {
      setIsLoading(false);
      setError(false);
    } else {
      setError(true);
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head></Head>
      <div className="w-screen h-screen flex flex-col lg:flex-row justify-center items-center bg-dtickit-green gap-2 p-2">
        <div
          onClick={() => {
            navigate("/admin");
          }}
          className="w-16 h-16 rounded-full bg-white font-poppins text-2xl justify-center items-center cursor-pointer hidden lg:flex"
        >
          ⬅
        </div>
        <div className="w-full lg:w-5/6 h-auto bg-white rounded-md text-center pt-10 pb-10">
          <h1 className="font-poppins text-3xl font-bold mb-2">
            The data from <br />
            the report:
          </h1>
          {IsLoading && (
            <>
              <br />
              <HashLoader color="#FDC325" />
            </>
          )}
          {Error && !ReportData && !IsLoading && (
            <div className="w-full h-auto flex flex-col items-center justify-start gap-3">
              <img className="w-28 h-auto" src={errorimg} alt="error sign" />
              <h1 className="font-poppins font-semibold">
                Hmm, strange... No report...
                <br />
                Do you have access to it?
                <br />
                If yes, then please go back using the button and restart the
                process.
              </h1>
            </div>
          )}
          {ReportData && ReportData[0] && !IsLoading && (
            <div className="flex flex-col items-center w-auto h-auto justify-start gap-2">
              <p className="w-5/6 bg-white border-2 text-black font-poppins h-auto mr-auto shadow-md ml-auto p-2 rounded-md font-semibold">
                Reporter e-mail address: {ReportData[0].reporter_email}
              </p>
              {ReportData.map((element, index) => {
                return (
                  <p className="w-5/6 bg-white text-black border-2 shadow-md font-poppins h-auto mr-auto ml-auto p-2 rounded-md font-semibold">
                    {ReportData[index].input_name}: {ReportData[index].value}
                  </p>
                );
              })}
              <div className="flex justify-evenly w-5/6 gap-2">
                <a
                  className="p-2 bg-blue-500 shadow-md rounded-md text-white font-poppins font-bold w-full"
                  href={`mailto:${ReportData[0].reporter_email}?subject=Response%20to%20your%20request&body=This%20email%20is%20sent%20from%20tickit%20web%20admin%20panel%2C%20and%20is%20a%20response%20to%20your%20report.`}
                >
                  Reply
                </a>

                <button
                  onClick={() => deleteReport()}
                  className="p-2 bg-red-500 rounded-md text-white font-poppins shadow-md font-bold w-full"
                >
                  Delete
                </button>
              </div>
              <div className="w-5/6 bg-white text-black font-poppins font-semibold border-2 p-2 rounded-md shadow-md">
                <h1>Set group</h1>
                <div className="flex justify-center w-full gap-1 flex-wrap">
                  {Groups &&
                    Groups.map((element, index) => (
                      <div
                        className="flex flex-col justify-start items-center border-2 p-2 rounded-md cursor-pointer font-normal"
                        onClick={() => changeReportGroup(element.id)}
                      >
                        <div
                          style={{ backgroundColor: element.color }}
                          className="w-4 h-4 rounded-full border-2"
                        >
                          {" "}
                        </div>
                        <h1>{element.name}</h1>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          onClick={() => {
            navigate("/admin");
          }}
          className="w-16 h-16 rounded-full bg-white font-poppins text-2xl justify-center items-center cursor-pointer lg:hidden flex"
        >
          ⬅
        </div>
      </div>
    </>
  );

  async function changeReportGroup(groupID) {
    setLoadingState(true);
    const logintoken = localStorage.getItem("loginToken");
    await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/group/addReportToGroup",
      {
        reportId: id,
        groupId: groupID,
        loginToken: logintoken,
      }
    );
    setLoadingState(false);
  }
}

export default ViewReport;
