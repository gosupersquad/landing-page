import React from "react";
import { ReactComponent as Logo } from "../../resources/images/trip/logo-1.svg";
import { ReactComponent as NavMenu } from "../../resources/images/trip/nav-menu.svg";

export default function Navbar() {
  return (
    <div style={{ display: "flex", paddingTop: 12, margin: "0px 16px" }}>
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <Logo />
        <p
          style={{
            margin: 0,
            marginLeft: 12,
            fontFamily: "Kodchasan",
            color: "black",
            fontWeight: 400,
            fontSize: 17.4,
            lineHeight: "21.6px",
          }}
        >
          Supersquad
        </p>
      </div>
      <NavMenu />
    </div>
  );
}
