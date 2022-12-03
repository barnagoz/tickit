/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import Select from "react-select";
import { HexColorPicker } from "react-colorful";
import {LoadingContext} from "../App"

function PageSettings(props) {
  const [PageValues, setPageValues] = useState();
  const [FieldValues, setFieldValues] = useState();
  const [Loadingstate, setLoadingState] = useContext(LoadingContext);

  const options = [
    { value: 1, label: "Single line text input" },
    { value: 2, label: "Multiline text input" },
    { value: 3, label: "Checkbox" },
  ];

  useEffect(() => {
    GetPageSettings();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function saveData(e) {
    e.preventDefault();
    setLoadingState(true)
    const logintoken = localStorage.getItem("loginToken");
    let CurrentFields = JSON.parse(JSON.stringify(FieldValues));
    CurrentFields.forEach((value, index) => {
      value.number = index;
    });
    const resp = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/page/savePageSettings",
      {
        loginToken: logintoken,
        pagesettings: PageValues,
        fieldsettings: CurrentFields,
      }
    );
    setLoadingState(false)
    console.log(resp);
  }
  return (
    <div className="w-full flex flex-col justify-start items-center gap-2">
      {typeof PageValues !== "undefined" ? (
        <>
          <div className="w-5/6 flex flex-col lg:flex-row justify-start lg:justify-center items-center bg-blue-300 p-3 rounded-md gap-1 text-center lg:text-start">
            <h1 className="text-blue-600 text-2xl font-black font-poppins mr-3 hidden lg:block">
              i
            </h1>
            <h1 className="text-blue-600 font-extrabold font-poppins">
              Your users can report their problems at:
            </h1>
            <a
              className="text-blue-600 font-extrabold font-poppins"
              href={`https://tickit.vercel.app/r/${PageValues.link_slug}`}
            >
              https://tickit.vercel.app/r/{PageValues.link_slug}
            </a>
          </div>
          <div className="w-5/6 flex-col flex items-center justify-start p-2 h-auto bg-white rounded-md border-2 shadow-md">
            <h1 className="text-black font-poppins font-semibold">
              Page Title
            </h1>
            <input
              className="w-11/12 text-center p-2 rounded-md border-2"
              value={PageValues.page_title}
              onChange={(e) => {
                ChangePageDataValue(
                  e.target.value,
                  PageValues.subheading,
                  PageValues.background,
                  PageValues.color_scheme,
                  PageValues.link_slug
                );
              }}
              type="text"
            ></input>
          </div>
          <div className="w-5/6 flex-col flex items-center justify-start p-2 h-auto bg-white rounded-md border-2 shadow-md">
            <h1 className="text-black font-poppins font-semibold">
              Subheading
            </h1>
            <input
              value={PageValues.subheading}
              className="w-11/12 text-center p-2 rounded-md border-2"
              onChange={(e) => {
                ChangePageDataValue(
                  PageValues.page_title,
                  e.target.value,
                  PageValues.background,
                  PageValues.color_scheme,
                  PageValues.link_slug
                );
              }}
              type="text"
            ></input>
          </div>
          <div className="w-5/6 flex-col flex items-center justify-start p-2 h-auto bg-white rounded-md border-2 shadow-md">
            <h1 className="text-black font-poppins font-semibold">
              Background Color
            </h1>
            <details>
              <summary className="flex flex-row justify-center">
                <div
                  className="w-10 h-10 rounded-full border-2 cursor-pointer"
                  style={{ backgroundColor: PageValues.background }}
                />
              </summary>
              <HexColorPicker
                color={PageValues.background}
                onChange={(e) => {
                  ChangePageDataValue(
                    PageValues.page_title,
                    PageValues.subheading,
                    e,
                    PageValues.color_scheme,
                    PageValues.link_slug
                  );
                }}
              />
            </details>
          </div>
          <div className="w-5/6 flex-col flex items-center justify-start p-2 h-auto bg-white rounded-md border-2 shadow-md">
            <h1 className="text-black font-poppins font-semibold">
              Text Color
            </h1>
            <div className="w-11/12 text-center p-2 rounded-md bg-white border-2">
              <h1 className="font-bold">
                {PageValues.color_scheme === 1 ? "Light" : "Dark"}
              </h1>
              <button
                onClick={() => {
                  PageValues.color_scheme === 1
                    ? ChangePageDataValue(
                        PageValues.page_title,
                        PageValues.subheading,
                        PageValues.background,
                        2,
                        PageValues.link_slug
                      )
                    : ChangePageDataValue(
                        PageValues.page_title,
                        PageValues.subheading,
                        PageValues.background,
                        1,
                        PageValues.link_slug
                      );
                }}
              >
                Change
              </button>
            </div>
          </div>
          <div className="w-5/6 flex-col flex items-center justify-start p-2 h-auto bg-white rounded-md border-2 shadow-md">
            <h1 className="text-black font-poppins font-semibold">Pagelink</h1>
            <input
              value={PageValues.link_slug}
              className="w-11/12 text-center p-2 rounded-md border-2"
              onChange={(e) => {
                ChangePageDataValue(
                  PageValues.page_title,
                  PageValues.subheading,
                  PageValues.background,
                  PageValues.color_scheme,
                  e.target.value
                );
              }}
              type="text"
            ></input>
          </div>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
      <h1 className="text-lg font-poppins font-semibold">Input fields:</h1>
      {typeof FieldValues !== "undefined" ? (
        <div className="w-5/6 flex flex-col gap-1">
          {FieldValues.map((element, index) => (
            <div className="w-full border-2 rounded-md flex justify-evenly items-center">
              <div
                className="flex flex-col justify-start items-center p-1 gap-1 w-5/6"
                key={element.id / 6}
              >
                <h1 className="text-black font-poppins font-semibold">
                  Placeholder or name:
                </h1>
                <input
                  key={element.id}
                  type="text"
                  value={element.placeholder}
                  className="w-11/12 text-center p-2 rounded-md border-2"
                  onChange={(e) => {
                    ChangeFieldsValue(e.target.value, element.type, index);
                  }}
                ></input>
                <h1 className="text-black font-poppins font-semibold">Type:</h1>
                <Select
                  options={options}
                  className="w-11/12 text-center rounded-md"
                  key={element.id / 1}
                  value={getType(index)}
                  onChange={(e) => {
                    console.log(element.placeholder);
                    ChangeFieldsValue(element.placeholder, e.value, index);
                  }}
                />
              </div>
              <div
                key={element.id / 7}
                className="w-10 flex h-full items-center flex-col justify-between gap-1"
              >
                <button
                  key={element.id / 2}
                  onClick={() => moveUp(index)}
                  className="bg-white rounded-md w-9 h-9 flex items-center justify-center border-2"
                  disabled={index === 0}
                >
                  <h1>↑</h1>
                </button>
                <button
                  key={element.id / 3}
                  className="bg-white rounded-md w-10 h-10 flex items-center justify-center border-2"
                  onClick={() => deleteMe(index)}
                >
                  <h1 className="font-poppins font-bold">X</h1>
                </button>
                <button
                  key={element.id / 4}
                  onClick={() => moveDown(index)}
                  className="bg-white rounded-md w-9 h-9 flex items-center justify-center border-2"
                  disabled={index === FieldValues.length - 1}
                >
                  <h1>↓</h1>
                </button>
              </div>
            </div>
          ))}
          <div className="flex justify-start gap-2">
            <button
              onClick={() => addNewField()}
              className="bg-blue-500 rounded-md text-white font-poppins font-bold w-full p-2"
            >
              <span className="text-xl">+</span> Add input field
            </button>
            <button
              onClick={(e) => saveData(e)}
              className="bg-red-500 rounded-md text-white font-poppins font-bold w-full p-2"
            >
              Save data
            </button>
          </div>
        </div>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );

  async function GetPageSettings() {
    setLoadingState(true)
    const logintoken = await localStorage.getItem("loginToken");
    const settings = await axios.post(
      process.env.REACT_APP_SERVER_DOMAIN + "/page/getPageSettings",
      { loginToken: logintoken }
    );

    settings.data.fields.sort((a, b) => a.number - b.number);

    setPageValues(settings.data.page[0]);
    setFieldValues(settings.data.fields);
    setLoadingState(false)
  }

  function deleteMe(index) {
    let currentFields = [...FieldValues];
    currentFields.splice(index, 1);
    setFieldValues(currentFields);
  }

  function addNewField() {
    const currentFields = [...FieldValues];
    let tempId = Math.floor(Math.random() * 10000);
    let test = (element) => element.id === tempId;
    while (currentFields.some(test)) {
      tempId = (Math.random() * 10000).floor();
      // eslint-disable-next-line no-loop-func
      test = (element) => element.id === tempId;
    }
    const newField = {
      id: tempId,
      type: 1,
      placeholder: "",
      number: FieldValues.length,
    };
    currentFields.push(newField);
    setFieldValues(currentFields);
  }

  function ChangePageDataValue(
    page_title,
    subheading,
    background,
    color_scheme,
    link_slug
  ) {
    let currentSetting = {
      id: PageValues.id,
      page_title: page_title,
      subheading: subheading,
      background: background,
      color_scheme: color_scheme,
      link_slug: link_slug,
      users_id: PageValues.users_id,
    };
    setPageValues(currentSetting);
  }

  function ChangeFieldsValue(placeholder, type, index) {
    let currentSetting = [...FieldValues];
    currentSetting[index].type = type;
    currentSetting[index].placeholder = placeholder;
    console.log(currentSetting);
    setFieldValues(currentSetting);
  }

  function getType(index) {
    if (FieldValues[index].type === 1) {
      return { value: 1, label: "Single line text input" };
    } else if (FieldValues[index].type === 2) {
      return { value: 2, label: "Multiline text input" };
    } else if (FieldValues[index].type === 3) {
      return { value: 3, label: "Checkbox" };
    } else {
      return { value: 0, label: "Error" };
    }
  }

  function moveUp(index) {
    let currentFields = [...FieldValues];
    const origInplace = currentFields[index];
    const origInPlacePrevious = currentFields[index - 1];

    origInplace.number -= 1;
    origInPlacePrevious.number += 1;

    currentFields[index] = origInPlacePrevious;
    currentFields[index - 1] = origInplace;
    setFieldValues(currentFields);
  }

  function moveDown(index) {
    let currentFields = [...FieldValues];
    const origInplace = currentFields[index];
    const origInPlacePrevious = currentFields[index + 1];

    origInplace.number += 1;
    origInPlacePrevious.number -= 1;

    currentFields[index] = origInPlacePrevious;
    currentFields[index + 1] = origInplace;
    setFieldValues(currentFields);
  }
}

export default PageSettings;
