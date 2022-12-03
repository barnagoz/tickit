import React, { Component } from "react";

class ProjectUnderDev extends Component {
  render() {
    return (
      <div className="bg-tickit-dark-green from-green-300 via-blue-500 to-purple-600 w-full h-auto flex justify-center text-center p-2 m-0">
        <h1 className="text-center font-poppins font-bold text-2xl w-auto h-auto text-white">
          This project is currently under development, some of the features may
          be unavailable.
        </h1>
      </div>
    );
  }
}

export default ProjectUnderDev;
