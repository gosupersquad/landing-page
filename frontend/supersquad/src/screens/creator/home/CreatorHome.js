import React, { useEffect, useState } from "react";
import Logo from "../../../resources/images/triphome/logo.svg";
import TripIconLight from "../../../resources/images/creatorhome/archive-box-light.svg";
import ItnIconDark from "../../../resources/images/creatorhome/rectangle-stack-dark.svg";
import TripIconDark from "../../../resources/images/creatorhome/archive-box-dark.svg";
import ItnIconLight from "../../../resources/images/creatorhome/rectangle-stack-light.svg";
import Itineraries from "./Itineraries";
import MyTrips from "./MyTrips";
import Down from "../../../resources/images/creatorhome/chevron-down-light.svg";
import "./CreatorHome.css";
import { url } from "../../../helper";
import axios from "axios";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export default function CreatorHome() {
  const [active, setActive] = useState(1);
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    axios
      .get(url + "v1/auth/get_user_info", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUserInfo(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);
  const leftBar = () => {
    return (
      <div
        style={{
          // borderRight: "1px solid var(--Grey-Grey-03, #E2E2E2)",
          minHeight: "100vh",
          height: "auto",
          width: 264,
        }}
      >
        <div style={{ padding: 24, height: 81.5, boxSizing: "border-box" }}>
          <img src={Logo} style={{ height: 40 }} />
        </div>
        <div
          style={{
            padding: 24,
            // borderTop: "1px solid var(--Grey-Grey-03, #E2E2E2)",
          }}
        >
          <div
            className={active == 0 ? "left_box_active left_box" : "left_box"}
            onClick={() => setActive(0)}
          >
            <img src={active == 0 ? TripIconDark : TripIconLight} />
            <p
              className={active == 0 ? "left_div_text_active" : "left_div_text"}
            >
              My Trips
            </p>
          </div>
          <div
            className={active == 1 ? "left_box_active left_box" : "left_box"}
            onClick={() => setActive(1)}
            style={{ marginTop: 12 }}
          >
            <img src={active == 1 ? ItnIconDark : ItnIconLight} />
            <p
              className={active == 1 ? "left_div_text_active" : "left_div_text"}
            >
              Itineraries
            </p>
          </div>
        </div>
      </div>
    );
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios
      .post(
        url + "v1/auth/logout",
        {
          token: token,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        if (res.data.status == "success") {
          localStorage.removeItem("token");
          window.open("login", "_self");
        }
      })
      .catch((err) => console.log(err));
  };

  const rightDiv = () => {
    return (
      <div style={{ width: "100%" }}>
        <div
          style={{
            padding: 24,
            display: "flex",
            alignItems: "center",
            // borderBottom: "1px solid var(--Grey-Grey-03, #E2E2E2)",
          }}
        >
          <p className="header_text_dashboard" style={{ flex: 1 }}>
            {active == 0 ? "My Trips" : "Itineraries"}
          </p>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div
              style={{
                padding: "4.5px 4px",
                width: 20,
                height: 20,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 62.5,
                background: "#DFF5FF",
                display: "flex",
              }}
            >
              <p className="icon_name_text">
                {userInfo?.name &&
                  userInfo.name.split(" ")[0][0] +
                    userInfo.name.split(" ")[1][0]}
              </p>
            </div>
            <p className="person_name_text">{userInfo?.name}</p>
            <img
              src={Down}
              style={{ cursor: "pointer", color: "#323232" }}
              onClick={handleClick}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout} className="title_text_itn_card">
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
        {active == 1 ? <Itineraries /> : <MyTrips />}
      </div>
    );
  };

  return (
    <div style={{ display: "flex" }}>
      {leftBar()}
      <React.Suspense fallback={null}>{rightDiv()}</React.Suspense>
    </div>
  );
}
