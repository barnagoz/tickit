/* eslint-disable no-unused-vars */
import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Helmet } from "react-helmet";
import { LoadingContext } from "../App";

function ReporterView(props) {
  const { id } = useParams();
  const [Page, setPage] = useState();
  const [Data, setData] = useState([])
  const [Email, setEmail] = useState();
  //{field: "", value: "", id: 1}
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  async function submit(e) {
    e.preventDefault();
    setLoadingState(true);
    
    const respt = await axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN}/page/submitReportData`,
      {
        pageID: id,
        email: Email,
        responses: Data,
      }
    );

    console.log(respt)

    if (respt.status === 200) {
      alert("Successfully submitted report.");
    } else {
      alert("Something went wrong.");
    }
    setLoadingState(false);
  }

  function InputPicker(element, index) {
    if (element.type === 1) {
      return (
        <input
          style={{
            backgroundColor:
              Page[0].color_scheme === 1
                ? "rgb(216, 216, 216)"
                : "rgb(176, 183, 195)",
          }}
          className="inherit-placeholder font-poppins w-full h-auto p-3 font-semibold text-center rounded-md glassbck bg-opacity-50"
          type="text"
          value={Data[index].value}
          onChange={(e) => {
            const currentdata = [...Data];
            currentdata[index].value = e.target.value
            setData(currentdata)
          }}
          placeholder={element.field}
        />
      );
    } else if (element.type === 2) {
      return (
        <textarea
          style={{
            backgroundColor:
              Page[0].color_scheme === 1
                ? "rgb(216, 216, 216)"
                : "rgb(176, 183, 195)",
          }}
          className="inherit-placeholder font-poppins w-full h-auto p-3 font-semibold text-center rounded-md glassbck bg-opacity-50"
          value={Data[index].value}
          onChange={(e) => {
            const currentdata = [...Data];
            currentdata[index].value = e.target.value
            setData(currentdata)
          }}
          placeholder={element.field}
        />
      );
    } else if (element.type === 3) {
      return (
        <div className="w-auto flex justify-start items-center h-auto gap-2">
          <input
            name={index}
            type="checkbox"
            value={Data[index].value}
            onChange={(e) => {
              const currentdata = [...Data];
              currentdata[index].value = e.target.checked
              setData(currentdata)
            }}
          />
          <label for={index}>{element.field}</label>
        </div>
      );
    }
  }

  useEffect(() => {
    async function getPageData() {
      setLoadingState(true);
      const pageData = await axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN}/page/getPageData`,
        {
          link: id,
        }
      );
      await pageData.data.sort(function (a, b) {
        return a.number - b.number;
      });
      setPage(pageData.data);
      const currentdata = []
      pageData.data.map((element, index) => {
        currentdata.push({field: element.placeholder, value: "", id: element.id, type: element.type, number: element.number})
      })
      setData(currentdata)
      setLoadingState(false);
    }

    getPageData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Page && (
        <div
          className="min-h-screen h-auto max-w-screen w-full-width flex flex-col items-center justify-center gap-3 p-2"
          style={{
            backgroundColor: Page[0].background,
            color: Page[0].color_scheme === 1 ? "white" : "black",
          }}
        >
          <Helmet>
            <title>{Page[0].page_title}</title>
          </Helmet>
          <div className="lg:w-1/3 w-full">
            <h1
              className="font-poppins text-6xl font-bold overflow-x-hidden overflow-y-hidden h-auto p-2 text-center"
              style={{ color: "inherit" }}
            >
              {Page[0].page_title}
            </h1>
            <h1
              className="font-poppins text-l font-semibold overflow-x-hidden overflow-y-hidden h-auto pt-0 p-2 text-center"
              style={{ color: "inherit" }}
            >
              {Page[0].subheading}
            </h1>
          </div>
          <div className="lg:w-1/3 w-full p-3 h-auto flex flex-col gap-2 justify-items-start items-center">
            <input
              style={{
                backgroundColor:
                  Page[0].color_scheme === 1
                    ? "rgb(216, 216, 216)"
                    : "rgb(176, 183, 195)",
              }}
              className="inherit-placeholder font-poppins w-full h-auto p-3 font-semibold text-center rounded-md glassbck bg-opacity-50"
              type="email"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            ></input>
            {Data.map((element, index) => {
              return InputPicker(element, index);
            })}
            <button
              onClick={(e) => submit(e)}
              style={{
                backgroundColor:
                  Page[0].color_scheme === 1
                    ? "rgb(216, 216, 216)"
                    : "rgb(176, 183, 195)",
              }}
              className="font-poppins w-full h-auto p-3 font-semibold text-center rounded-md glassbck bg-opacity-50"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ReporterView;
