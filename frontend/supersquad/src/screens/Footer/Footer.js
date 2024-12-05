import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Gmail from "../../resources/images/triphome/Gmail.svg";
import Logo from "../../resources/images/triphome/logo.svg";
import Bck from "../../resources/images/triphome/footer_hd.png";
import WhatsApp from "../../resources/images/triphome/whatsapp.svg";
import Phone from "../../resources/images/triphome/phone.png";

import "./Footer.css";
export default function Footer() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const footer = () => {
    return (
      <div
        style={{
          borderTop: "1px solid var(--Light-Light-300, #F0F0F0)",
          padding: isMobile ? "32px 16px" : "48px 24px",
          backgroundImage: `url(${Bck})`,
        }}
      >
        <div style={{ padding: isMobile ? 0 : "0px 10%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <div>
              <img src={Logo} style={{ height: "64px" }} alt="Logo" />
              {/* <p className="address_text">Address</p>
              <p
                className="address_text_secondary"
                style={{ maxWidth: 334, marginBottom: 16 }}
              >
                Global Delivery Center <br />
                C-1401, Happiness Towers, Pacifica Aurum,
                <br />
                Old Mahabalipuram Road,
                <br />
                Padur, Chennai-603 103
              </p> */}
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  marginTop: 16,
                  alignItems: "center",
                }}
              >
                <a
                  href="mailto:support@gosupersquad.com"
                  style={{ height: 32 }}
                  aria-label="Mail"
                >
                  <img src={Gmail} style={{ cursor: "pointer" }} alt="Mail" />
                </a>
                <a
                  href="tel:+918769322028"
                  style={{ height: 22 }}
                  aria-label="Phone"
                >
                  <img
                    src={Phone}
                    style={{ cursor: "pointer", height: 22 }}
                    alt="Phone"
                  />
                </a>
                <a
                  href="https://www.wa.link/y16qwu"
                  style={{ height: 22 }}
                  aria-label="Whatsapp"
                >
                  <img
                    src={WhatsApp}
                    style={{ cursor: "pointer", height: 22 }}
                    alt="WhatsApp"
                  />
                </a>
              </div>
            </div>
            {/* <div style={{ marginTop: isMobile ? 16 : 0 }}>
              <p
                className="address_text"
                style={{ marginTop: 0, cursor: "pointer" }}
              >
                Company
              </p>
              <p
                className="address_text_secondary"
                style={{ marginTop: 12, cursor: "pointer" }}
              >
                Trips
              </p>
              <p
                className="address_text_secondary"
                style={{ marginTop: 8, cursor: "pointer" }}
              >
                About Us
              </p>
              <p
                className="address_text_secondary"
                style={{ marginTop: 8, cursor: "pointer" }}
              >
                Contact Us
              </p>
            </div> */}
          </div>
          <div
            style={{
              height: 1,
              background: "var(--Light-Light-300, #F0F0F0)",
              margin: isMobile ? "24px 0px" : "32px 0px",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: isMobile ? "wrap" : "nowrap",
            }}
          >
            {/* <p className="footer_text" style={{ flex: 1, minWidth: 183 }}>
              © 2024 Supersquad All rights reserved.
            </p> */}
            {/* <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: isMobile ? 8 : 0,
              }}
            >
              <p className="footer_text" style={{ cursor: "pointer" }}>
                Privacy
              </p>
              <div
                style={{
                  background: "var(--Text-Secondary, rgba(0, 0, 0, 0.70))",
                  borderRadius: 100,
                  width: 4,
                  height: 4,
                  margin: "0px 16px",
                }}
              />
              <p className="footer_text" style={{ cursor: "pointer" }}>
                Terms & Conditions
              </p>
            </div> */}
          </div>
        </div>
      </div>
    );
  };
  return <div>{footer()}</div>;
}
