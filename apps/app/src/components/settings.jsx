import React from "react";
import PageSettings from "./page-settings";
import UserSettings from "./user-settings";

function Settings(props) {
  return (
    <div className="mt-0">
      <details open>
        <summary className="text-4xl font-poppins font-extrabold p-4 w-auto h-auto">
          Page settings:
        </summary>
        <PageSettings></PageSettings>
      </details>
      <details>
        <summary className="text-4xl font-poppins font-extrabold p-4 w-auto h-auto">
          Account settings:
        </summary>
        <UserSettings></UserSettings>
      </details>
    </div>
  );
}

export default Settings;
