import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "../components/dashboard";
import Groups from "../components/groups";
import Settings from "../components/settings";
import Head from "../components/head";

function AdminView(props) {
  const [View, setView] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      props.IsAuthenticated === false &&
      localStorage.getItem("loginToken") == null
    ) {
      navigate("/login");
    } else {
      props.setIsAuthenticated(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.IsAuthenticated]);

  function getCurrentView() {
    // eslint-disable-next-line default-case
    switch (View) {
      case 1:
        return <Dashboard IsAuthenticated={props.IsAuthenticated}></Dashboard>;
      case 2:
        return <Groups></Groups>;
      case 3:
        return <Settings></Settings>;
    }
  }

  return (
    <>
      <Head></Head>
      <div className="flex w-full flex-col h-screen">
        <div className="w-full h-1/7 bg-dtickit-green flex flex-row justify-evenly gap-2 p-2">
          <button
            className="text-dtickit-green font-poppins font-bold text-lg bg-white w-full h-auto p-2 rounded-md"
            onClick={() => setView(1)}
          >
            Reports
          </button>
          <button
            className="text-dtickit-green font-poppins font-bold text-lg bg-white w-full h-auto p-2 rounded-md"
            onClick={() => setView(2)}
          >
            Groups
          </button>
          <div className="w-full h-auto overflow-hidden flex  flex- items-center justify-evenly">
            <button
              className="text-dtickit-green font-poppins font-bold text-lg bg-white w-full h-auto p-2 rounded-md"
              onClick={() => setView(3)}
            >
              Settings
            </button>
          </div>
        </div>

        <div className="h-full w-full">{getCurrentView()}</div>
      </div>
    </>
  );
}

AdminView.propTypes = {};

export default AdminView;
