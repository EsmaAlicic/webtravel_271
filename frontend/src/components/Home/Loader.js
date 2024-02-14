import React from "react";
import { ClipLoader } from "react-spinners";
const Loader = () => {
  return (
    <>
      <div
        style={{
          width: "100px",
          height: "80vh",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ClipLoader></ClipLoader>
      </div>
    </>
  );
};

export default Loader;
