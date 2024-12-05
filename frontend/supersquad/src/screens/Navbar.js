import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Logo from "../resources/images/triphome/logo.svg";
import MenuBtn from "../resources/images/triphome/menu_btn.svg";

import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton } from "@mui/base/MenuButton";
import { MenuItem } from "@mui/base/MenuItem";

export default function Navbar() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const navbar = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 0px",
        }}
      >
        <img src={Logo} style={{ height: 40 }} />
        {!isMobile && (
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 24 }}
          >
            <p className="nav_p">Trips</p>
            <p className="nav_p" style={{ margin: "0px 24px" }}>
              About us
            </p>
            <p className="nav_p">Contact</p>
            <button
              style={{
                border: "1px solid #000",
                background: "rgba(0, 0, 0, 0.05)",
                height: 44,
                width: 180,
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "150%",
                color: "#000",
                marginLeft: 24,
              }}
            >
              Explore trips
            </button>
          </div>
        )}
        {isMobile && (
          <div>
            <Dropdown>
              <MenuButton>
                <img src={MenuBtn} />
              </MenuButton>
              <Menu slots={{ listbox: "div" }}>
                <div style={{ padding: 16 }}>
                  <p className="nav_p_mob">Trips</p>
                  <p className="nav_p_mob" style={{ margin: "6px 0px" }}>
                    About us
                  </p>
                  <p className="nav_p_mob">Contact</p>
                  <button
                    style={{
                      border: "1px solid #000",
                      background: "rgba(255, 255, 255, 0.15)",
                      height: 40,
                      width: 140,
                      borderRadius: 100,
                      fontSize: 14,
                      fontWeight: 600,
                      lineHeight: "150%",
                      color: "#000",
                      marginTop: 6,
                    }}
                  >
                    Explore trips
                  </button>
                </div>
              </Menu>
            </Dropdown>
          </div>
        )}
      </div>
    );
  };
  return <div>{navbar()}</div>;
}
