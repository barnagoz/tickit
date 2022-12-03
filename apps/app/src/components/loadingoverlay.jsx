import React from "react";
import HashLoader from "react-spinners/HashLoader";

function LoadingOverlay() {
  return (
    <div className="z-50 w-screen h-screen bg-white opacity-50 absolute left-0 top-0 flex items-center justify-center backdrop-filter backdrop-blur-lg">
      <HashLoader color="#000000"></HashLoader>
    </div>
  );
}

export default LoadingOverlay;
