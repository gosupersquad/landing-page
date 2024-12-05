import React, { useState, useEffect } from "react";
import "./TripPageCheckout.css";
import LogoDark from "../../resources/images/trip_page/LogoDark.svg";
import { useMediaQuery } from "@mui/material";
import H1 from "../../resources/images/trip_page/h1.jpg";
import Host1 from "../../resources/images/trip_page/host1.jpg";
import { ReactComponent as Cross1 } from "../../resources/images/trip_page/cross.svg";
import { ReactComponent as Plus1 } from "../../resources/images/trip_page/plus.svg";
import { ReactComponent as Minus1 } from "../../resources/images/trip_page/minus.svg";
import { ReactComponent as Clock1 } from "../../resources/images/trip_page/clock.svg";
import { ReactComponent as Location1 } from "../../resources/images/trip_page/location.svg";
import Lottie from "react-lottie";
import animationData from "../../resources/images/trip_page/lot.json";

import "./TripPageCheckout.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";
import { url } from "../../helper";
import Modal from "@mui/material/Modal";
import { Drawer } from "@mui/material";

const TripPageCheckout = () => {
  const getSystemTheme = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
  };
  const [theme, setTheme] = useState(getSystemTheme());
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  // Listen for changes to the system theme
  useEffect(() => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");

    const themeChangeListener = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    darkThemeMq.addEventListener("change", themeChangeListener);

    return () => {
      darkThemeMq.removeEventListener("change", themeChangeListener);
    };
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const isMobile = useMediaQuery("(max-width:600px)");
  const [guests, setGuests] = useState(1);
  const [guestDetails, setGuestDetails] = useState([
    { name: "", email: "", phone: "", instagram: "" },
  ]);

  const [showModal, setShowModal] = useState(false);

  // ... existing code ...

  const handleGuestDetailsChange = (index, field, value) => {
    const newGuestDetails = [...guestDetails];
    newGuestDetails[index][field] = value;
    setGuestDetails(newGuestDetails);
  };

  const addGuest = () => {
    setGuestDetails([
      ...guestDetails,
      { name: "", email: "", phone: "", instagram: "" },
    ]);
    setGuests(guests + 1);
  };

  const removeGuest = () => {
    if (guests > 1) {
      setGuestDetails(guestDetails.slice(0, -1));
      setGuests(guests - 1);
    }
  };
  const navbar = () => {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          padding: isMobile ? "15px 0px 0px 0px" : "8px 0px",
          height: isMobile ? "auto" : 64,
        }}
      >
        <img
          src={LogoDark}
          style={{ mixBlendMode: "exclusion", height: isMobile ? 16 : "auto" }}
          alt="Logo"
        />
      </div>
    );
  };

  const topSection = () => {
    return (
      <div style={{ marginTop: 15 }}>
        <img
          src={H1}
          style={{
            width: "100%",
            height: "140px",
            objectFit: "cover",
            borderRadius: 10,
          }}
          alt="H1"
        />
      </div>
    );
  };
  const line = () => {
    return <div className="line" />;
  };
  const tripDetails = () => {
    return (
      <div style={{}}>
        <div
          style={{
            marginTop: isMobile ? 24 : 32,
            marginBottom: isMobile ? 20 : 34,
          }}
        >
          <p className="trip-details-title">
            Book Reader's Retreat With Noharika
          </p>
        </div>
        {isMobile && line()}
        {isMobile && (
          <div className="host-info">
            <img src={Host1} alt="Profile" className="host-info-image" />
            <p className="host-info-text">Hosted by Noharika</p>
          </div>
        )}
        {isMobile && line()}
        {isMobile && (
          <div style={{ marginTop: 20 }} className="trip-details">
            <div className="trip-details-item">
              <div className="trip-details-item-title">
                {/* <img src={Clock} alt="Clock" /> */}
                <Clock1 className="share_icon" />
                <p className="trip-details-item-title-text">Dates</p>
              </div>
              <div className="trip-details-item-text">15th - 17th Nov</div>
            </div>
            <div className="trip-details-item">
              <div className="trip-details-item-title">
                {/* <img src={Location} alt="Location" /> */}
                <Location1 className="share_icon" />
                <p className="trip-details-item-title-text">Locations</p>
              </div>
              <div className="trip-details-item-text">Kasauli</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const requestSection = () => {
    return (
      <div style={{ marginTop: isMobile ? 32 : 0 }}>
        <p className="request-section-title">Request an invite</p>
        <p className="request-section-subtitle" style={{ marginTop: 8 }}>
          If you're selected, a team member will get in touch with you shortly!
        </p>
        <div style={{ margin: "24px 0px" }}>
          {line()}
          <div className="number-of-guest-container">
            <p className="number-of-guest-title">Number of guests</p>
            <div className="number-of-guest-input-container">
              {/* <img
                src={Minus}
                alt="Minus"
                style={{ cursor: "pointer" }}
                onClick={removeGuest}
              /> */}
              <Minus1
                style={{ cursor: "pointer" }}
                onClick={removeGuest}
                className="share_icon"
              />
              <p className="number-of-guest-input">{guests}</p>
              {/* <img
                src={Plus}
                alt="Plus"
                style={{ cursor: "pointer" }}
                onClick={addGuest}
              /> */}
              <Plus1
                style={{ cursor: "pointer" }}
                onClick={addGuest}
                className="share_icon"
              />
            </div>
          </div>
          {line()}
        </div>
      </div>
    );
  };

  const handleBook = () => {
    if (
      !guestDetails.every(
        (guest) =>
          guest.name &&
          guest.email &&
          guest.phone &&
          validateEmail(guest.email) &&
          isValidPhoneNumber(guest.phone)
      )
    ) {
      return;
    }
    const data = [];
    const slug = "Book Reader's Retreat With Noharika";
    for (let i of guestDetails) {
      data.push({
        name: i.name,
        email: i.email,
        phone: i.phone,
        instagram_handle: i.instagram,
      });
    }
    axios
      .post(url + "v1/leads/create_lead_temp", { trip_slug: slug, leads: data })
      .then((res) => {
        setShowModal(true);
      })
      .catch((err) => console.log(err));
    // setShowModal(true);
  };

  const guestDetailsSection = () => {
    return (
      <div style={{ marginTop: 32 }}>
        {guestDetails.map((guest, index) => (
          <div key={index} style={{ marginTop: 16 }}>
            <p className="guest-index">Guest {index + 1}</p>
            <p className="guest-details-input-label">Name</p>
            <input
              className="guest-details-input"
              label="Name"
              value={guest.name}
              onChange={(e) =>
                handleGuestDetailsChange(index, "name", e.target.value)
              }
              style={{ marginTop: 8 }}
              placeholder="What’s your name"
            />
            <p className="guest-details-input-label">Email address</p>
            <input
              className="guest-details-input"
              label="Email"
              value={guest.email}
              onChange={(e) =>
                handleGuestDetailsChange(index, "email", e.target.value)
              }
              style={{ marginTop: 8 }}
              placeholder="eg: john@gmail.com"
            />
            <p className="guest-details-input-label">Phone number</p>
            <PhoneInput
              placeholder="Phone"
              value={guest.phone}
              maxLength={11}
              onChange={(val) => {
                handleGuestDetailsChange(index, "phone", val);
              }}
              defaultCountry="IN"
              className="guest-details-input"
              style={{
                display: "flex",
                height: 14,
                marginTop: 8,
              }}
            />
            <p className="guest-details-input-label">
              Instagram Handle{" "}
              <span className="guest-details-input-label-optional">
                (Optional)
              </span>
            </p>
            <input
              className="guest-details-input"
              label="Instagram Handle (Optional)"
              value={guest.instagram}
              onChange={(e) =>
                handleGuestDetailsChange(index, "instagram", e.target.value)
              }
              style={{ marginTop: 8 }}
              placeholder="eg. @johndoe22"
            />
          </div>
        ))}
        <div style={{ marginTop: 32 }}>
          <button
            className={
              guestDetails.every(
                (guest) =>
                  guest.name &&
                  guest.email &&
                  guest.phone &&
                  validateEmail(guest.email) &&
                  isValidPhoneNumber(guest.phone)
              )
                ? "submit-button-active"
                : "submit-button-inactive"
            }
            onClick={handleBook}
          >
            Submit
          </button>
        </div>
        <p style={{ margin: "17px 0px" }} className="hurry-text">
          ⌛ Hurry up! only 4 spots left!
        </p>
      </div>
    );
  };

  const dashedLine = () => {
    return <div className="dashed-line" />;
  };

  const hostAndTripDetails = () => {
    return (
      <div className="host-and-trip-details-container">
        <div className="host-and-trip-details-title">
          <div className="host-info" style={{ marginTop: 0, marginBottom: 0 }}>
            <img src={Host1} alt="Profile" className="host-info-image" />
            <p className="host-info-text">Hosted by Noharika</p>
          </div>
          {line()}
        </div>
        <div className="trip-details">
          <div className="trip-details-item">
            <div className="trip-details-item-title">
              {/* <img src={Clock} alt="Clock" /> */}
              <Clock1 className="share_icon" />
              <p className="trip-details-item-title-text">Dates</p>
            </div>
            <div className="trip-details-item-text">15th - 17th Nov</div>
          </div>
          <div className="trip-details-item">
            <div className="trip-details-item-title">
              {/* <img src={Location} alt="Location" /> */}
              <Location1 className="share_icon" />
              <p className="trip-details-item-title-text">Locations</p>
            </div>
            <div className="trip-details-item-text">Kasauli</div>
          </div>
        </div>
        {dashedLine()}
        <div className="hurry-up-div">
          <p className="hurry-up-div-text">⌛ Hurry up! only 4 spots left!</p>
        </div>
      </div>
    );
  };

  const handleCloseModal = () => {
    window.open("https://gosupersquad.com/noharika/pages-and-peaks", "_self");
  };

  const customModal = () => {
    return (
      <Drawer
        anchor="bottom"
        open={showModal}
        onClose={() => handleCloseModal()}
        style={{ background: "var(--background-color-modal)" }}
        ModalProps={{
          keepMounted: true, // This helps with performance optimization
        }}
      >
        <div
          style={{
            padding: "24px",
            background: "var(--background-color-modal)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Cross1
              onClick={() => handleCloseModal()}
              style={{
                cursor: "pointer",
              }}
              className="share_icon"
              alt="Cross"
            />
          </div>
          {/* <div
            style={{
              width: "100%",
              height: "143px",
              background: "#CFCFCF",
              borderRadius: 8,
              marginTop: 24,
            }}
          ></div> */}
          <div style={{ width: "100%", borderRadius: 8, marginTop: 24 }}>
            <Lottie
              options={defaultOptions}
              height={273}
              width={326}
              borderRadius={24}
              style={{
                borderRadius: 24,
              }}
            />
          </div>
          <p className="confirmation-header">
            Thank you for requesting a spot!
          </p>
          <p className="confirmation-subheader">
            Our team carefully reviews every application. We only onboard users
            who’ll be the right fit for the trip to ensure a good experience.
            We’ll reach out soon if you’ll be a good fit for the trip.
          </p>
          <button
            style={{ marginTop: 48 }}
            className={"submit-button-active"}
            onClick={handleCloseModal}
          >
            Got it, thanks!
          </button>
        </div>
      </Drawer>
    );
  };
  const modalWeb = () => {
    return (
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        style={{ padding: "24px" }}
      >
        <div
          style={{
            padding: "24px",
            width: 375,
            borderRadius: 24,
            margin: "auto",
            backgroundColor: "var(--background-color-modal)",
            maxHeight: "84vh",
            overflow: "auto",
          }}
        >
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Cross1
              onClick={() => handleCloseModal()}
              style={{
                cursor: "pointer",
              }}
              className="share_icon"
              alt="Cross"
            />
          </div>
          {/* <div
            style={{
              width: "100%",
              height: "143px",
              background: "#CFCFCF",
              borderRadius: 8,
              marginTop: 24,
            }}
          ></div> */}
          <div
            style={{
              width: "100%",
              borderRadius: 8,
              marginTop: 24,
            }}
          >
            <Lottie
              options={defaultOptions}
              height={273}
              width={326}
              style={{
                borderRadius: 24,
              }}
            />
          </div>
          <p className="confirmation-header">
            Thank you for requesting a spot!
          </p>
          <p className="confirmation-subheader">
            Our team carefully reviews every application. We only onboard users
            who’ll be the right fit for the trip to ensure a good experience.
            We’ll reach out soon if you’ll be a good fit for the trip.
          </p>
          <button
            style={{ marginTop: 48 }}
            className={"submit-button-active"}
            onClick={handleCloseModal}
          >
            Got it, thanks!
          </button>
        </div>
      </Modal>
    );
  };
  return (
    <div style={{ background: "var(--background-color)" }}>
      <div
        style={{
          margin: isMobile ? "auto 16px" : "auto 8.33%",
        }}
      >
        {navbar()}
        <div style={{ display: "flex", gap: 97 }}>
          <div style={{ flex: 1 }}>
            {isMobile && topSection()}
            {tripDetails()}
            {requestSection()}
            {guestDetailsSection()}
          </div>
          {!isMobile && (
            <div className="sticky-div-checkout">{hostAndTripDetails()}</div>
          )}
          {showModal && isMobile && customModal()}
          {showModal && !isMobile && modalWeb()}
        </div>
      </div>
    </div>
  );
};

export default TripPageCheckout;
