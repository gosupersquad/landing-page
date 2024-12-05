import React, { useState, useEffect } from "react";
import Logo from "../resources/images/triphome/logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Minus from "../resources/images/checkout/minus.svg";
import Plus from "../resources/images/checkout/plus.svg";
import { useParams } from "react-router-dom";
import axios from "axios";
import Edit from "../resources/images/checkout/Edit.svg";
import Calender from "../resources/images/triphome/calendar 2.svg";
import Clock from "../resources/images/triphome/clock.svg";
import Location from "../resources/images/triphome/map-pin.svg";
import PhoneInput, {
  isValidPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";

import { url } from "../helper";

import "./Checkout.css";
export default function Checkout() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [number, setNumber] = useState(1);
  const [checked, setChecked] = useState(true);
  const [trip, setTrip] = useState();
  const [host, setHost] = useState();
  const [shouldShowSave, setShouldShowSave] = useState(true);
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const [guests, setGuests] = useState([
    {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      isSaved: false,
      insta: "",
    },
  ]);

  const [open, setOpen] = React.useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    let x = false;
    for (let i = 0; i < guests.length; i++) {
      if (
        guests[i].firstName &&
        guests[i].lastName &&
        guests[i].email &&
        guests[i].phone &&
        isValidPhoneNumber(guests[i].phone) &&
        validateEmail(guests[i].email)
      ) {
      } else {
        x = true;
      }
    }
    if (x) {
      setShouldShowSave(true);
    } else {
      setShouldShowSave(false);
    }
  }, [guests]);

  const params = useParams();
  useEffect(() => {
    const slug = params.slug;
    axios
      .post(url + "v1/trip/get_trip", { slug: slug })
      .then((res) => {
        setTrip(res.data.trip);
        setHost(res.data.host_info);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleNumber = (type) => {
    if (type == "-" && number > 1) {
      setNumber(number - 1);
      const g = [...guests];
      g.pop();
      setGuests([...g]);
    } else if (type == "+") {
      setNumber(number + 1);
      const g = [...guests];
      g.push({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        insta: "",
        isSaved: false,
      });
      setGuests([...g]);
    }
  };

  const navbar = () => {
    return (
      <div
        style={{
          padding: !isMobile ? "24px 8.33%" : "24px 16px",
        }}
      >
        <img src={Logo} style={{ height: 30 }} />
      </div>
    );
  };
  const leftDiv = () => {
    const handleSave = () => {
      const g = [...guests];
      let x = false;
      for (let i = 0; i < g.length; i++) {
        if (
          guests[i].firstName &&
          guests[i].lastName &&
          guests[i].email &&
          guests[i].phone &&
          isValidPhoneNumber(guests[i].phone) &&
          validateEmail(guests[i].email)
        ) {
          guests[i].isSaved = true;
        } else {
          x = true;
        }
      }
      if (x) {
        setShouldShowSave(true);
      } else {
        setShouldShowSave(false);
      }
      setGuests([...g]);
    };
    const setFirstName = (val, index) => {
      const g = [...guests];
      g[index].firstName = val;
      setGuests([...g]);
    };
    const setLastName = (val, index) => {
      const g = [...guests];
      g[index].lastName = val;
      setGuests([...g]);
    };
    const setEmail = (val, index) => {
      const g = [...guests];
      g[index].email = val;
      setGuests([...g]);
    };
    const setPhone = (val, index) => {
      const g = [...guests];
      g[index].phone = val;
      setGuests([...g]);
    };
    const setInsta = (val, index) => {
      const g = [...guests];
      g[index].insta = val;
      setGuests([...g]);
    };
    const saved = (i, index) => {
      return (
        <div
          style={{
            marginTop: 32,
            width: "100%",
            padding: 24,
            boxSizing: "border-box",
            background: "#F5F5F5",
            borderRadius: 16,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <p
              style={{
                color: "rgb(0,0,0,0.7)",
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "150%",
              }}
            >
              {i.firstName + " "}
              {i.lastName}
            </p>
            <p className="savedText">{i.email}</p>
            <p className="savedText">{formatPhoneNumberIntl(i.phone)}</p>
            {i.insta && <p className="savedText">@{i.insta}</p>}
            <p className="savedText">India</p>
          </div>
          <div>
            <img
              src={Edit}
              style={{ cursor: "pointer" }}
              onClick={() => {
                const g = [...guests];
                g[index].isSaved = false;
                setGuests([...g]);
                setShouldShowSave(true);
              }}
            />
          </div>
        </div>
      );
    };
    const details = (i, index) => {
      return (
        <div style={{ marginTop: isMobile ? 16 : 32 }}>
          <p
            style={{
              fontFamily: "Poppins",
              fontSize: 24,
              lineHeight: "150%",
              marginBottom: isMobile ? 16 : 24,
            }}
          >
            Guest {index + 1}
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: isMobile ? "wrap" : "",
              gap: isMobile ? "24px" : 16,
              gap: 16,
            }}
          >
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <p className="text_checkout">First Name</p>
              <input
                style={{
                  height: 40,
                  borderRadius: "100px",
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "rgb(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  marginTop: 4,
                  border: "1px solid #F0F0F0",
                  paddingLeft: 16,
                  width: "-webkit-fill-available",
                  outline: "none",
                }}
                placeholder="First Name"
                value={guests[index].firstName}
                onChange={(e) => {
                  setFirstName(e.target.value, index);
                }}
              />
            </div>
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <p className="text_checkout">Last Name</p>
              <input
                style={{
                  height: 40,
                  borderRadius: "100px",
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "rgb(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  marginTop: 4,
                  border: "1px solid #F0F0F0",
                  paddingLeft: 16,
                  width: "-webkit-fill-available",
                  outline: "none",
                }}
                placeholder="Last Name"
                value={guests[index].lastName}
                onChange={(e) => {
                  setLastName(e.target.value, index);
                }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: isMobile ? "wrap" : "",
              gap: isMobile ? "24px" : 16,
              marginTop: isMobile ? 24 : 32,
            }}
          >
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <p className="text_checkout">Email Addresss</p>
              <input
                style={{
                  height: 40,
                  borderRadius: "100px",
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "rgb(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  marginTop: 4,
                  border: "1px solid #F0F0F0",
                  paddingLeft: 16,
                  width: "-webkit-fill-available",
                  outline: "none",
                }}
                placeholder="Email Addresss"
                value={guests[index].email}
                onChange={(e) => {
                  setEmail(e.target.value, index);
                }}
              />
            </div>
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <p className="text_checkout">Phone Number</p>
              <div style={{ display: "flex", gap: 8 }}>
                <PhoneInput
                  placeholder="Phone"
                  value={guests[index].phone}
                  maxLength={11}
                  onChange={(val) => {
                    setPhone(val, index);
                  }}
                  defaultCountry="IN"
                  className="checkout_input"
                  style={{
                    display: "flex",
                    height: 18,
                  }}
                />
              </div>
            </div>
          </div>
          <div style={{ marginTop: isMobile ? 24 : 32 }}>
            <div style={{ width: isMobile ? "100%" : "50%" }}>
              <p className="text_checkout">Instagram Handle (optional)</p>
              <input
                style={{
                  height: 40,
                  borderRadius: "100px",
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "rgb(0,0,0,0.4)",
                  display: "flex",
                  alignItems: "center",
                  marginTop: 4,
                  border: "1px solid #F0F0F0",
                  paddingLeft: 16,
                  width: "-webkit-fill-available",
                  outline: "none",
                }}
                placeholder="Instagram username"
                value={guests[index].insta}
                onChange={(e) => {
                  setInsta(e.target.value, index);
                }}
              />
            </div>
          </div>
        </div>
      );
    };
    return (
      <div style={{ width: isMobile ? "100%" : "47vw", paddingTop: 18 }}>
        {/* {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  background: "black",
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 32,
                  width: 32,
                }}
              >
                <p
                  style={{
                    color: "white",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    lineHeight: "150%",
                    fontWeight: 500,
                  }}
                >
                  1
                </p>
              </div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "#000000",
                }}
              >
                Confirm details
              </p>
            </div>
            <div style={{ width: 100, height: 1, background: "black" }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: 100,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 32,
                  width: 32,
                  border: "1px solid black",
                  cursor: "normal",
                  boxSizing: "border-box",
                }}
              >
                <p
                  style={{
                    color: "black",
                    fontFamily: "Poppins",
                    fontSize: 14,
                    lineHeight: "150%",
                    fontWeight: 500,
                    cursor: "normal",
                  }}
                >
                  2
                </p>
              </div>
              <p
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: "150%",
                  color: "#000000",
                }}
              >
                Payment
              </p>
            </div>
          </div>
        )} */}
        <div style={{ marginBottom: 18 }}>
          <p className="step_p">Step 1: Fill the details</p>
          <p className="step_p">
            Step 2: We'll get back to you within 12 hrs, you can clear any
            queries
          </p>
          <p className="step_p">
            Step 3: Pay the booking amount & get confirmation
          </p>
        </div>
        <p
          className="heading"
          style={{ marginTop: isMobile ? 0 : 24, fontSize: isMobile ? 24 : 36 }}
        >
          Confirm your details
        </p>
        <div
          style={{
            height: 1,
            background: "#F0F0F0",
            width: "100%",
            marginTop: 24,
          }}
        />
        <div
          style={{
            margin: "24px 0px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p className="text_checkout">No. of guests</p>
          <div
            style={{
              width: 106,
              height: 40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              border: "1px solid #F0F0F0",
              borderRadius: 100,
            }}
          >
            <img
              onClick={() => {
                handleNumber("-");
              }}
              src={Minus}
              style={{ color: "indigo", cursor: "pointer", fontSize: 20 }}
            />
            <span style={{ fontFamily: "Poppins", fontSize: 16 }}>
              {number}
            </span>
            <img
              onClick={() => {
                handleNumber("+");
              }}
              src={Plus}
              style={{ color: "indigo", cursor: "pointer", fontSize: 20 }}
            />
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: "#F0F0F0",
            width: "100%",
            // marginTop: 32,
          }}
        />
        <div>
          {guests.map((i, index) => {
            if (i.isSaved) {
              return saved(i, index);
            } else {
              return details(i, index);
            }
          })}
        </div>
        {/* {shouldShowSave && (
          <button
            style={{
              border: "none",
              outline: "none",
              cursor: "pointer",
              background: "#2B2B2B",
              width: 108,
              height: 44,
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              color: "white",
              fontWeight: 500,
              fontFamily: "Poppins",
              marginTop: isMobile ? 24 : 30,
            }}
            onClick={handleSave}
          >
            <img src={tick} style={{ cursor: "pointer" }} />
            <p>Save</p>
          </button>
        )}
        {!shouldShowSave && (
          <img
            src={AddTravel}
            style={{ cursor: "pointer", marginTop: isMobile ? 24 : 32 }}
            onClick={() => {
              handleNumber("+");
              setShouldShowSave(true);
            }}
          />
        )} */}
        {/* <div
          style={{
            display: "flex",
            gap: 8,
            alignItems: isMobile ? "flex-start" : "center",
            marginBottom: isMobile ? 24 : 36,
          }}
        >
          <img
            src={checked ? CheckGreen : Unchecked}
            onClick={() => {
              setChecked(!checked);
            }}
            style={{ cursor: "pointer" }}
          />
          <p style={{ fontSize: 14, fontFamily: "Poppins" }}>
            I agree to all Supersquad’s{" "}
            <span style={{ fontWeight: 500 }}>Privacy Policy</span> &{" "}
            <span style={{ fontWeight: 500 }}>Terms & Conditions</span>
          </p>
        </div> */}
        {isMobile && (
          <div
            style={{
              background: "#F0F0F0",
              marginBottom: 24,
              height: 1,
              marginTop: isMobile ? 24 : 16,
            }}
          />
        )}
      </div>
    );
  };
  const handleBook = () => {
    const data = [];
    const slug = params.slug;
    for (let i of guests) {
      data.push({
        name: i.firstName + " " + i.lastName,
        email: i.email,
        phone: i.phone,
        instagram_handle: i.insta,
      });
    }
    axios
      .post(url + "v1/leads/create_lead", { trip_slug: slug, leads: data })
      .then((res) => {
        window.open(`/prabir/${slug}/checkout/confirmation`, "_self");
      })
      .catch((err) => console.log(err));
  };
  const rightDiv = () => {
    const startDate = new Date(trip?.start_date);
    const endDate = new Date(trip?.end_date);
    const months = [
      "Jab",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];

    return (
      <div>
        <div
          style={{
            boxShadow: "0px 0px 24px 1px rgba(102, 102, 102, 0.1)",
            width: isMobile ? "100%" : "33vw",
            borderRadius: 24,
            padding: 16,
            boxSizing: "border-box",
            marginBottom: 32,
            position: "absolute",
            top: 46,
          }}
        >
          <img
            src={trip?.cover_img?.replace(
              "http://localhost:5005",
              "https://gosupersquad.com:5005"
            )}
            style={{
              width: "100%",
              borderRadius: 16,
              aspectRatio: 443.2 / 249.22,
              objectFit: "cover",
              objectPosition: "0% 23%",
            }}
          />
          <p
            style={{
              marginTop: 16,
              fontFamily: "Poppins",
              lineHeight: "150%",
              color: "black",
              fontSize: 18,
              fontWeight: 500,
            }}
          >
            {trip?.title}
          </p>
          <button
            style={{
              padding: isMobile ? "4px 10px" : "8px",
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              background: "#F0F0F0",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <img
              src={host?.profile_pic?.replace(
                "http://localhost:5005",
                "https://gosupersquad.com:5005"
              )}
              style={{
                width: isMobile ? 24 : 24,
                height: isMobile ? 24 : 24,
                borderRadius: 100,
                objectFit: "cover",
              }}
            />
            <p
              style={{
                marginLeft: 8,
                fontWeight: 400,
                fontSize: 18,
                fontFamily: "Poppins",
                lineHeight: "150%",
                color: "black",
              }}
            >
              {host?.name}
            </p>
          </button>
          <div
            style={{
              marginTop: 12,
              display: "flex",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div className="text_wrapper_book_now">
              <img src={Calender} className="img_book_now" />
              <p
                className="secondary_text_book_now"
                style={{
                  fontFamily: "Poppins",
                  marginLeft: 8,
                  textAlign: "center",
                }}
              >
                {startDate.getDate() +
                  " - " +
                  endDate.getDate() +
                  " " +
                  months[endDate.getMonth()] +
                  ", " +
                  endDate.getFullYear()}
              </p>
            </div>
            <div
              style={{
                borderRadius: 100,
                background: "#C2C2C2",
                height: 4,
                width: 4,
              }}
            />
            <div className="text_wrapper_book_now">
              <img src={Clock} className="img_book_now" />
              <p
                className="secondary_text_book_now"
                style={{
                  fontFamily: "Poppins",
                  marginLeft: 8,
                  textAlign: "center",
                }}
              >
                {Math.ceil((endDate - startDate) / (1000 * 24 * 3600))} days
              </p>
            </div>
            <div
              style={{
                borderRadius: 100,
                background: "#C2C2C2",
                height: 4,
                width: 4,
              }}
            />
            <div className="text_wrapper_book_now">
              <img src={Location} className="img_book_now" />
              <p
                className="secondary_text_book_now"
                style={{
                  fontFamily: "Poppins",
                  marginLeft: 8,
                  textAlign: "center",
                }}
              >
                {trip?.location}
              </p>
            </div>
          </div>
          <div
            style={{
              margin: "8px 0px 15px",
              background: " #F0F0F0",
              height: 1,
            }}
          />
          <div>
            <p
              style={{
                marginLeft: 16,
                fontFamily: "Poppins",
                fontWeight: 500,
                fontSize: 16,
                lineHeight: "auto",
                color: "black",
              }}
            >
              PRICE DETAILS
            </p>
            <div
              style={{
                padding: 16,
                background: "#E7FFF8",
                border: "1px solid #02EBA5",
                borderRadius: 12,
                marginTop: 6,
              }}
            >
              <p
                style={{
                  color: "#444444",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: "150%",
                }}
              >
                Payment options available at checkout
              </p>
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 16,
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0px 16px",
              }}
            >
              <p
                style={{
                  color: "rgb(0, 0, 0, 0.7)",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                  lineHeight: "150%",
                  fontSize: 16,
                }}
              >
                {number > 1 && "Trip Price x " + number + " guests"}
                {number == 1 && "Trip Price"}
              </p>
              <p
                style={{
                  color: "rgb(0, 0, 0)",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  lineHeight: "150%",
                  fontSize: 18,
                }}
              >
                ₹{trip?.price?.toLocaleString()}
              </p>
            </div>
            {trip?.is_early_bird_price_active && (
              <div
                style={{
                  display: "flex",
                  marginTop: 12,
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0px 16px",
                }}
              >
                <p
                  style={{
                    color: "rgb(0, 0, 0, 0.7)",
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    lineHeight: "150%",
                    fontSize: 16,
                  }}
                >
                  Early Bird Discount
                </p>
                <p
                  style={{
                    color: "rgb(0, 0, 0)",
                    fontFamily: "Poppins",
                    fontWeight: 500,
                    lineHeight: "150%",
                    fontSize: 18,
                  }}
                >
                  - ₹{""}
                  {(
                    number *
                    (trip?.price - trip?.early_bird_price)
                  )?.toLocaleString()}
                </p>
              </div>
            )}
            <div
              style={{
                background: "#F5F5F5",
                borderRadius: 12,
                padding: 16,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: 12,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <p
                  style={{
                    color: "rgb(0,0,0,0.7)",
                    fontFamily: "Poppins",
                    fontSize: 16,
                    lineHeight: "150%",
                  }}
                >
                  Total
                </p>
                {/* <ClickAwayListener onClickAway={handleTooltipClose}>
                  <Tooltip
                    title="Just pay half now and rest within a month of the trip"
                    onClose={handleTooltipClose}
                    open={open}
                  >
                    <img
                      src={Question}
                      onClick={handleTooltipOpen}
                      style={{ marginLeft: 4 }}
                    />
                  </Tooltip>
                </ClickAwayListener> */}
              </div>
              <p
                style={{
                  color: "rgb(0, 0, 0)",
                  fontFamily: "Poppins",
                  fontWeight: 500,
                  lineHeight: "150%",
                  fontSize: 24,
                }}
              >
                ₹
                {(
                  number *
                  (trip?.firstPayment ??
                    Number(
                      trip?.is_early_bird_price_active
                        ? trip?.early_bird_price
                        : trip?.price
                    ))
                )?.toLocaleString()}
              </p>
            </div>
            {/* <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: 12,
              }}
            >
              <img src={Info} />
              <div style={{ marginLeft: 8, marginBottom: 8 }}>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "150%",
                    color: "rgb(0,0,0,0.7)",
                  }}
                >
                  Fully refundable
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "150%",
                    color: "rgb(0,0,0,0.7)",
                    marginTop: 4,
                  }}
                >
                  Until trip confirms, then partial refund
                </p>
              </div>
            </div> */}
            <button
              style={{
                marginTop: 12,
                width: "100%",
                borderRadius: "100px",
                height: 44,
                background: shouldShowSave || !checked ? "#DEDEDE" : "#02EBA5",
                color: shouldShowSave || !checked ? "rgb(0,0,0,0.4)" : "black",
                cursor: shouldShowSave || !checked ? "not-allowed" : "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Poppins",
                fontWeight: 500,
                lineHeight: "150%",
                fontSize: 14,
              }}
              disabled={shouldShowSave || !checked}
              onClick={handleBook}
            >
              Request a Spot
            </button>
          </div>
        </div>
      </div>
    );
  };

  const stickyPay = () => {
    return (
      <div>
        <p
          style={{
            marginLeft: 16,
            fontFamily: "Poppins",
            fontWeight: 500,
            fontSize: 16,
            lineHeight: "auto",
            color: "black",
          }}
        >
          PRICE DETAILS
        </p>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0px 16px",
          }}
        >
          <p
            style={{
              color: "rgb(0, 0, 0, 0.7)",
              fontFamily: "Poppins",
              fontWeight: 400,
              lineHeight: "150%",
              fontSize: 16,
            }}
          >
            {number > 1 && "Trip Price x " + number + " guests"}
            {number == 1 && "Trip Price"}
          </p>
          <p
            style={{
              color: "rgb(0, 0, 0)",
              fontFamily: "Poppins",
              fontWeight: 500,
              lineHeight: "150%",
              fontSize: 18,
            }}
          >
            ₹{trip?.price?.toLocaleString()}
          </p>
        </div>
        {trip?.is_early_bird_price_active && (
          <div
            style={{
              display: "flex",
              marginTop: 12,
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0px 16px",
            }}
          >
            <p
              style={{
                color: "rgb(0, 0, 0, 0.7)",
                fontFamily: "Poppins",
                fontWeight: 400,
                lineHeight: "150%",
                fontSize: 16,
              }}
            >
              Early Bird Discount
            </p>
            <p
              style={{
                color: "rgb(0, 0, 0)",
                fontFamily: "Poppins",
                fontWeight: 500,
                lineHeight: "150%",
                fontSize: 18,
              }}
            >
              - ₹{""}
              {(
                number *
                (trip?.price - trip?.early_bird_price)
              )?.toLocaleString()}
            </p>
          </div>
        )}
        <div
          style={{
            background: "#F5F5F5",
            borderRadius: 12,
            padding: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <p
              style={{
                color: "rgb(0,0,0,0.7)",
                fontFamily: "Poppins",
                fontSize: 16,
                lineHeight: "150%",
              }}
            >
              Total
            </p>
            {/* <ClickAwayListener onClickAway={handleTooltipClose}>
              <Tooltip
                title="Just pay half now and rest within a month of the trip"
                onClose={handleTooltipClose}
                open={open}
              >
                <img
                  src={Question}
                  onClick={handleTooltipOpen}
                  style={{ marginLeft: 4 }}
                />
              </Tooltip>
            </ClickAwayListener> */}
          </div>
          <p
            style={{
              color: "rgb(0, 0, 0)",
              fontFamily: "Poppins",
              fontWeight: 500,
              lineHeight: "150%",
              fontSize: 24,
            }}
          >
            ₹
            {(
              number *
              (trip?.firstPayment ??
                Number(
                  trip?.is_early_bird_price_active
                    ? trip?.early_bird_price
                    : trip?.price
                ))
            )?.toLocaleString()}
          </p>
        </div>
        {/* <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: 12,
              }}
            >
              <img src={Info} />
              <div style={{ marginLeft: 8, marginBottom: 8 }}>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 600,
                    fontSize: "14px",
                    lineHeight: "150%",
                    color: "rgb(0,0,0,0.7)",
                  }}
                >
                  Fully refundable
                </p>
                <p
                  style={{
                    fontFamily: "Poppins",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "150%",
                    color: "rgb(0,0,0,0.7)",
                    marginTop: 4,
                  }}
                >
                  Until trip confirms, then partial refund
                </p>
              </div>
            </div> */}
        <button
          style={{
            marginTop: 12,
            width: "100%",
            borderRadius: "100px",
            height: 44,
            background: shouldShowSave || !checked ? "#DEDEDE" : "#02EBA5",
            color: shouldShowSave || !checked ? "rgb(0,0,0,0.4)" : "black",
            cursor: shouldShowSave || !checked ? "not-allowed" : "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "Poppins",
            fontWeight: 500,
            lineHeight: "150%",
            fontSize: 14,
            marginBottom: 12,
          }}
          disabled={shouldShowSave || !checked}
          onClick={handleBook}
        >
          Request a Spot
        </button>
        {/* <div
          style={{
            padding: 16,
            background: "#E7FFF8",
            border: "1px solid #02EBA5",
            borderRadius: 12,
            marginBottom: 24,
          }}
        >
          <p
            style={{
              color: "#444444",
              fontFamily: "Poppins",
              fontSize: 14,
              lineHeight: "150%",
            }}
          >
            Payment options available at checkout
          </p>
        </div> */}
      </div>
    );
  };
  const mobileDesign = () => {
    const startDate = new Date(trip?.start_date);
    const endDate = new Date(trip?.end_date);
    const months = [
      "Jab",
      "Feb",
      "March",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sept",
      "Oct",
      "Nov",
      "Dec",
    ];
    return (
      <div
        style={{
          width: "100%",
          borderRadius: 24,
          boxSizing: "border-box",
          marginTop: 16,
        }}
      >
        {/* <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "black",
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 32,
                width: 32,
              }}
            >
              <p
                style={{
                  color: "white",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: "150%",
                  fontWeight: 500,
                }}
              >
                1
              </p>
            </div>
            <p
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "150%",
                color: "#000000",
              }}
            >
              Confirm details
            </p>
          </div>
          <div style={{ flex: 1, height: 1, background: "black" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                background: "white",
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: 32,
                width: 32,
                border: "1px solid black",
                cursor: "normal",
                boxSizing: "border-box",
              }}
            >
              <p
                style={{
                  color: "black",
                  fontFamily: "Poppins",
                  fontSize: 14,
                  lineHeight: "150%",
                  fontWeight: 500,
                  cursor: "normal",
                }}
              >
                2
              </p>
            </div>
            <p
              style={{
                fontFamily: "Poppins",
                fontWeight: 400,
                fontSize: 14,
                lineHeight: "150%",
                color: "#000000",
              }}
            >
              Payment
            </p>
          </div>
        </div> */}
        <img
          src={trip?.cover_img?.replace(
            "http://localhost:5005",
            "https://gosupersquad.com:5005"
          )}
          style={{
            width: "100%",
            borderRadius: 16,
            // marginTop: 24,
            aspectRatio: 343 / 192.88,
            objectFit: "cover",
            objectPosition: "0% 23%",
          }}
        />
        <p
          style={{
            marginTop: 16,
            fontFamily: "Poppins",
            lineHeight: "150%",
            color: "black",
            fontSize: 18,
            fontWeight: 500,
          }}
        >
          {trip?.title}
        </p>
        <button
          style={{
            padding: isMobile ? "4px 10px" : "8px",
            borderRadius: 100,
            display: "flex",
            alignItems: "center",
            background: "#F0F0F0",
            justifyContent: "center",
            marginTop: 12,
          }}
        >
          <img
            src={host?.profile_pic?.replace(
              "http://localhost:5005",
              "https://gosupersquad.com:5005"
            )}
            style={{
              width: isMobile ? 24 : 24,
              height: isMobile ? 24 : 24,
              borderRadius: 100,
              objectFit: "cover",
            }}
          />
          <p
            style={{
              marginLeft: 8,
              fontWeight: 400,
              fontSize: 18,
              fontFamily: "Poppins",
              lineHeight: "150%",
              color: "black",
            }}
          >
            {host?.name}
          </p>
        </button>
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 12,
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div className="text_wrapper_book_now" style={{ marginBottom: 0 }}>
            <img src={Calender} className="img_book_now" />
            <p
              className="secondary_text_book_now"
              style={{
                fontFamily: "Poppins",
                marginLeft: 8,
                textAlign: "center",
              }}
            >
              {startDate.getDate() +
                " - " +
                endDate.getDate() +
                " " +
                months[endDate.getMonth()] +
                ", " +
                endDate.getFullYear()}
            </p>
          </div>
          <div
            style={{
              borderRadius: 100,
              background: "#C2C2C2",
              height: 4,
              width: 4,
            }}
          />
          <div className="text_wrapper_book_now" style={{ marginBottom: 0 }}>
            <img src={Clock} className="img_book_now" />
            <p
              className="secondary_text_book_now"
              style={{
                fontFamily: "Poppins",
                marginLeft: 8,
                textAlign: "center",
              }}
            >
              {Math.ceil((endDate - startDate) / (1000 * 24 * 3600))} days
            </p>
          </div>
          <div className="text_wrapper_book_now" style={{ marginBottom: 0 }}>
            <img src={Location} className="img_book_now" />
            <p
              className="secondary_text_book_now"
              style={{
                fontFamily: "Poppins",
                marginLeft: 8,
                textAlign: "center",
              }}
            >
              {trip?.location}
            </p>
          </div>
        </div>
        {leftDiv()}
        {stickyPay()}
      </div>
    );
  };

  return (
    <div>
      {navbar()}
      {isMobile && <div style={{ background: "#F0F0F0", height: 1 }} />}
      <div style={{ padding: !isMobile ? "0px 8.33%" : "0px 16px" }}>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 0,
              flexWrap: "wrap-reverse",
            }}
          >
            {leftDiv()}
            {rightDiv()}
          </div>
        )}
        {isMobile && mobileDesign()}
      </div>
    </div>
  );
}
