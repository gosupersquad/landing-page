import React from "react";
import Confirm from "../resources/images/triphome/Ellipse 1.svg";

export default function Confirmation() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <p
        style={{
          fontFamily: "Poppins",
          fontSize: 36,
          color: "black",
          lineHeight: "150%",
        }}
      >
        Thank You!
      </p>
      <img style={{ margin: "12px 0px" }} src={Confirm} />
      <p
        style={{
          fontFamily: "Poppins",
          fontSize: 24,
          color: "black",
          lineHeight: "150%",
        }}
      >
        Your response was submitted
      </p>
    </div>
  );
}
