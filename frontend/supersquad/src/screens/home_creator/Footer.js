import React from "react";
import Lnk from "../../resources/images/home_creator/lnk.svg";
import Insta from "../../resources/images/home_creator/insta.svg";
import LogoLight from "../../resources/images/triphome/logolight.svg";

export default function Footer({ isMobile }) {
  return (
    <div
      style={{
        marginTop: isMobile ? 0 : 91,
        paddingBottom: isMobile ? 57 : 148,
        display: isMobile ? "" : "flex",
        justifyContent: "space-between",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}
    >
      <div>
        <img src={LogoLight} style={{ height: 30 }} />
        <p
          className="footer_p1"
          style={{ marginTop: isMobile ? 10 : 21, maxWidth: 382 }}
        >
          Iconic trips with Iconic <br />
          <span className="footer_p2">people</span>
        </p>
      </div>
      {/* <div style={{ marginTop: isMobile ? 21 : 0 }}>
        <p className="footer_p3">Company</p>
        <p className="footer_p4" style={{ marginTop: isMobile ? 6.38 : 18.28 }}>
          About
        </p>
        <p className="footer_p4" style={{ marginTop: 6.38 }}>
          Careers
        </p>
        <div
          style={{
            marginTop: isMobile ? 14 : 20.08,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <img src={Lnk} style={{ cursor: "pointer" }} />
          <img src={Insta} style={{ cursor: "pointer" }} />
        </div>
      </div> */}
    </div>
  );
}
