import React from "react";
import LogoLight from "../../resources/images/triphome/logolight.svg";

export default function Navbar({ isMobile }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        zIndex: 10,
        position: "relative",
      }}
    >
      <img src={LogoLight} style={{ height: isMobile ? 25 : 30 }} />
      {!isMobile && (
        <>
          <div
            style={{
              display: "flex",
              width: 354,
              borderRadius: "32px",
              border: "1px solid #FFF",
              padding: "13px 13px 13px 24px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p className="nav_para_1">Home</p>
            <p className="nav_para_1">About</p>
            <p className="nav_para_1">FAQ</p>
            <p className="nav_para_1">Contact</p>
          </div>
          <button
            data-cal-namespace=""
            data-cal-link="supersquad/30min"
            data-cal-config='{"layout":"month_view",}'
            className="nav_button"
          >
            {"Book a Call ->"}
          </button>
        </>
      )}
    </div>
  );
}
