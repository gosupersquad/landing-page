import React, { useEffect, useState, useRef } from "react";
import Logo from "../../../resources/images/triphome/logo.svg";
import LogoLight from "../../../resources/images/triphome/logolight.svg";
import InstaIcon from "../../../resources/images/triphome/insta.svg";
import Calender from "../../../resources/images/triphome/calendar 2.svg";
import Pay from "../../../resources/images/triphome/banknotes.svg";
import Clock from "../../../resources/images/triphome/clock.svg";
import Location from "../../../resources/images/triphome/map-pin.svg";
import Down from "../../../resources/images/triphome/chevron-down.svg";
import Star from "../../../resources/images/triphome/star.svg";
import CalMob from "../../../resources/images/triphome/calendarmob.svg";
import Check from "../../../resources/images/triphome/checkmark.svg";
import { useParams } from "react-router-dom";

import useMediaQuery from "@mui/material/useMediaQuery";
import UserGrp from "../../../resources/images/creatorhome/user-group.svg";
import Building from "../../../resources/images/creatorhome/building-office.svg";
import Cake from "../../../resources/images/creatorhome/cake.svg";

import "./TripHome.css";
import Footer from "../../Footer/Footer";
import axios from "axios";
import { url } from "../../../helper";
import BasicModal from "../../ErrorDialog";
import ImageCarousel from "./ImageCarousel";
import TextWithMultiLine from "../../TextWithMultiLine";
export default function TripHome() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const params = useParams();
  const [selectedIt, setSelectedIt] = useState("");
  const [selectAmenity, setSelectAmenity] = useState(0);
  const [faqType, setFaqType] = useState(0);
  const [selectedFaq, setSelectedFaq] = useState("");

  const [tripDetails, setTripDetails] = useState({});
  const [hostIn, setHostInfo] = useState({});
  const [faqTypes, setFaqTypes] = useState([]);
  const [hasError, setHasError] = useState(false);
  const slug = params.slug;
  const [isSticky, setIsSticky] = useState(false);
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Fetch the image URL from the API
    const img = new Image();
    img.src =
      "https://gosupersquad.com:5005/uploads/img1-1722259847611-377522762.jpg";
    img.onload = () => setImageLoaded(true);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const sectionTop = sectionRef.current.getBoundingClientRect().top;
        setIsSticky(sectionTop <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    axios
      .post(url + "v1/trip/get_trip", { slug: slug })
      .then((res) => {
        if (!res.data.trip) {
          setHasError(true);
        }
        setTripDetails(res.data.trip);
        setHostInfo(res.data.host_info);
        const unique = [...new Set(res.data.trip.faq.map((item) => item.type))];
        setFaqTypes(unique);
        setFaqType(unique[0]);
      })
      .catch((err) => console.log(err));
  }, []);
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
        <img
          alt="Logo"
          src={tripDetails?.logo_color == "black" ? Logo : LogoLight}
          style={{ height: 30 }}
        />
        {/* {!isMobile && (
          <div
            style={{ display: "flex", alignItems: "center", marginLeft: 24 }}
          >
            <p className="nav_p_1">Trips</p>
            <p className="nav_p_1" style={{ margin: "0px 24px" }}>
              About us
            </p>
            <p className="nav_p_1">Contact</p>
            <button
              style={{
                border: "1px solid var(--White-Color, #FFF)",
                background: "rgba(255, 255, 255, 0.15)",
                height: 44,
                width: 180,
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: "150%",
                color: "var(--White-Color, #FFF)",
                marginLeft: 24,
              }}
            >
              Explore trips
            </button>
          </div>
        )} */}
        {/* {isMobile && (
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
        )} */}
      </div>
    );
  };

  const topDiv = () => {
    const startDate = new Date(tripDetails?.start_date);
    const endDate = new Date(tripDetails?.end_date);
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
    const main_img =
      isMobile && tripDetails?.cover_img_mob
        ? tripDetails?.cover_img_mob
        : tripDetails?.cover_img;
    // const main_img = imageUrl;
    return (
      <div
        style={{
          backgroundImage:
            imageLoaded &&
            (tripDetails?.cover_video
              ? ""
              : `url(${main_img
                  ?.replace(
                    "http://localhost:5005",
                    "https://gosupersquad.com:5005"
                  )
                  .replace(
                    "http://20.193.229.199:5005",
                    "https://gosupersquad.com:5005"
                  )})`),
          backgroundSize: "cover",
          backgroundPositionY: !isMobile && "-340px",
          height: isMobile ? "629px" : 750,
          zIndex: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ padding: !isMobile ? "0px 8.33vw" : "0px 16px" }}>
          {navbar()}
          <div style={{ marginTop: isMobile ? 287 : 301 }}>
            <button
              style={{
                borderRadius: 100,
                background: isMobile ? "rgba(255, 255, 255, 0.30)" : "#DCF7F2",
                color: isMobile ? "#5BEAD5" : "#386D65",
                fontSize: isMobile ? 14 : 16,
                fontWeight: 600,
                letterSpacing: 2.4,
                padding: isMobile ? "4px 7px" : "8px 16px",
              }}
            >
              {tripDetails?.home_tag}
            </button>
            <p className="header_p" style={{ marginTop: isMobile ? 8 : 24 }}>
              {tripDetails?.title}
            </p>
            <div
              style={{
                marginTop: isMobile ? 8 : 24,
                display: isMobile ? "" : "flex",
                alignItems: "center",
              }}
            >
              <button
                style={{
                  padding: isMobile ? "4px 10px" : "8px 20px",
                  borderRadius: 100,
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(240, 240, 240, 0.30)",
                  justifyContent: "center",
                }}
              >
                <img
                  alt="Host Pic"
                  src={hostIn.profile_pic?.replace(
                    "http://localhost:5005",
                    "https://gosupersquad.com:5005"
                  )}
                  style={{
                    width: isMobile ? 24 : 32,
                    height: isMobile ? 24 : 32,
                    borderRadius: 100,
                    objectFit: "cover",
                  }}
                />
                <p style={{ marginLeft: 8 }} className="creator_button_text">
                  {hostIn.name}
                </p>
              </button>
              {!isMobile && (
                <div
                  style={{
                    margin: "0px 16px",
                    borderRadius: 100,
                    background: "rgba(255, 255, 255, 0.50)",
                    boxShadow: "0px 1px 0px 0px #000",
                    width: 8,
                    height: 8,
                  }}
                />
              )}
              <div style={{ display: "flex", alignItems: "center" }}>
                {isMobile && (
                  <img src={CalMob} style={{ marginRight: 8 }} alt="Calendar" />
                )}
                <p
                  style={{ margin: isMobile ? "16px 0px" : "0px" }}
                  className="trip_dates"
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
              {/* {!isMobile && (
                <div
                  style={{
                    margin: "0px 16px",
                    borderRadius: 100,
                    background: "rgba(255, 255, 255, 0.50)",
                    boxShadow: "0px 1px 0px 0px #000",
                    width: 8,
                    height: 8,
                  }}
                />
              )} */}
              {/* <div style={{ display: "flex", alignItems: "center" }}>
                {isMobile && <img src={ClockMob} style={{ marginRight: 8 }} />}
                <p style={{}} className="trip_dates">
                  {Math.ceil((endDate - startDate) / (1000 * 24 * 3600))} days
                </p>
              </div> */}
              {/* {isMobile && (
                <div style={{ marginTop: 8 }}>
                  <div
                    style={{ display: "flex", gap: 8, alignItems: "center" }}
                  >
                    {!isMobile && <p className="mob_book_now">(incl. taxes)</p>}
                    <p className="mob_book_now_pay">
                      {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                      {tripDetails?.price?.toLocaleString() ?? ""}
                    </p>
                  </div>
                  <button
                    style={{
                      width: 180,
                      height: 44,
                      background: "var(--White-Color, #FFF)",
                      borderRadius: 100,
                      fontSize: 14,
                      lineHeight: "150%",
                      fontWeight: 600,
                      color: "#000",
                      fontFamily: "Inter",
                    }}
                    onClick={() => {
                      window.open(`${slug}/checkout`);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              )} */}
            </div>
          </div>
        </div>
        {isMobile && (
          <div
            style={{
              height: 50,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)",
            }}
          ></div>
        )}

        {!isMobile && (
          <div
            style={{
              height: 72,
              marginTop: 64,
              background:
                "linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 100%)",
            }}
          />
        )}
      </div>
    );
  };

  const tripStats = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "relative",
          top: -76,
          zIndex: 5,
        }}
      >
        <div style={{ width: "fit-content" }} className="trip_stats">
          <div className="trip_stats_text_wrapper">
            <p className="trip_stats_text_primary">
              {tripDetails?.end_date &&
                Math.ceil(
                  (new Date(tripDetails?.end_date) -
                    new Date(tripDetails?.start_date)) /
                    (1000 * 24 * 3600)
                )}{" "}
              days
            </p>
            <p className="trip_stats_text_secondary">Experience</p>
          </div>
          <div className="trip_stats_text_wrapper">
            <p className="trip_stats_text_primary">
              {tripDetails?.total_seats}+
            </p>
            <p className="trip_stats_text_secondary">Like minded folks</p>
          </div>
          <div className="trip_stats_text_wrapper">
            <p className="trip_stats_text_primary">
              {/* {tripDetails?.inclusions?.length}+ */}∞
            </p>
            <p className="trip_stats_text_secondary">Memories</p>
          </div>
        </div>
      </div>
    );
  };

  const tripStatsMobile = () => {
    return (
      <div style={{ padding: "0px 16px" }}>
        <div className="mobile_stats_wrapper">
          <p className="mobile_stats_text">
            {Math.ceil(
              (tripDetails?.end_date &&
                new Date(tripDetails?.end_date) -
                  new Date(tripDetails?.start_date)) /
                (1000 * 24 * 3600)
            )}{" "}
            days
          </p>
          <p className="mobile_stats_text_secondary" style={{ marginTop: 2 }}>
            Experience
          </p>
        </div>
        <div className="mobile_stats_wrapper" style={{ marginTop: 16 }}>
          <p className="mobile_stats_text">{tripDetails?.total_seats}+</p>
          <p className="mobile_stats_text_secondary">Like minded folks</p>
        </div>
        <div className="mobile_stats_wrapper" style={{ marginTop: 16 }}>
          <p className="mobile_stats_text">
            {/* {tripDetails?.inclusions?.length}+ */}∞
          </p>
          <p className="mobile_stats_text_secondary">Memories</p>
        </div>
      </div>
    );
  };

  const description = () => {
    return (
      <div style={{ padding: isMobile ? "32px 0px" : "30px 0px 64px" }}>
        <p className="meet_host_text" ref={sectionRef}>
          About The Experience
        </p>
        <p style={{ marginTop: 16 }} className="host_description_text">
          <TextWithMultiLine text={tripDetails?.description} />
        </p>
      </div>
    );
  };

  const hostInfo = () => {
    return (
      <div style={{ padding: isMobile ? "32px 0px" : "44px 0px 64px" }}>
        <p className="meet_host_text">Meet Your Host</p>
        <div
          style={{
            display: "flex",
            marginTop: isMobile ? 16 : 32,
            alignItems: isMobile ? "" : "center",
            gap: 16,
            flexWrap: isMobile ? "wrap-reverse" : "",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                // marginTop: 16,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p className="host_name_text">{hostIn.name}</p>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  alt={"Instagram"}
                  src={InstaIcon}
                  style={{
                    cursor: "pointer",
                    marginRight: 16,
                    width: isMobile ? 16 : 24,
                  }}
                  onClick={() => {
                    window.open(hostIn?.social_media_link);
                  }}
                />
                {/* <img
                  src={XIcon}
                  style={{ cursor: "pointer", width: isMobile ? 16 : 24 }}
                /> */}
              </div>
            </div>
            <p className="host_type_text" style={{ marginTop: 4 }}>
              {hostIn.type ?? "Travel Photographer"}
            </p>
            <p style={{ marginTop: 16 }} className="host_description_text">
              <TextWithMultiLine
                text={
                  hostIn.bio ??
                  "Host is yet to write about himself. Stay tuned!"
                }
              />
            </p>
          </div>
          <img
            alt={"Creator"}
            src={
              hostIn?.profile_pic?.replace(
                "http://localhost:5005",
                "https://gosupersquad.com:5005"
              ) ?? ""
            }
            style={{
              // height: "auto",
              width: isMobile ? "100%" : "35%",
              height: isMobile ? 358 : "fit-content",
              borderRadius: 24,
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  };

  const bookNow = () => {
    const startDate = new Date(tripDetails?.start_date);
    const endDate = new Date(tripDetails?.end_date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div
        ref={stickyRef}
        style={{
          position: "sticky",
          top: 0,
          paddingTop: 30,
          height: "fit-content",
        }}
      >
        <div
          style={{
            // marginTop: 44,
            borderRadius: 24,
            background: "var(--White-Color, #FFF)",
            boxShadow: "0px 2px 24px 1px rgba(102, 102, 102, 0.10)",
            padding: 24,
            width: 486,
            // width: "33.75vw",
            height: "fit-content",
            marginBottom: 64,
          }}
        >
          <p className="book_now_text">{tripDetails?.title}</p>
          <button
            style={{
              // width: 184,
              // height: 43,
              padding: "8px 16px",
              borderRadius: 100,
              display: "flex",
              alignItems: "center",
              background: "var(--Light-Light-300, #F0F0F0)",
              justifyContent: "center",
              marginTop: 16,
            }}
          >
            <img
              alt="host pic"
              src={hostIn?.profile_pic?.replace(
                "http://localhost:5005",
                "https://gosupersquad.com:5005"
              )}
              style={{
                width: 24,
                height: 24,
                borderRadius: 100,
                objectFit: "cover",
              }}
            />
            <p style={{ marginLeft: 8 }} className="creator_dp_text">
              {hostIn.name}
            </p>
          </button>
          <div
            style={{
              background: "var(--Light-Light-300, #F0F0F0)",
              height: 1,
              margin: "16px 0px",
            }}
          />
          <div>
            <div className="text_wrapper_book_now">
              <p className="amount_text">
                {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                {(tripDetails?.is_early_bird_price_active
                  ? tripDetails?.early_bird_price
                  : tripDetails?.price
                )?.toLocaleString() ?? ""}
              </p>
              {!isMobile && (
                <p className="secondary_text_book_now">(incl. taxes)</p>
              )}
            </div>
            <div className="text_wrapper_book_now">
              <img src={Pay} className="img_book_now" alt="pay" />
              <p className="secondary_text_book_now">
                Part payment options available
              </p>
            </div>
            <div className="text_wrapper_book_now">
              <img src={Calender} className="img_book_now" alt="calendar" />
              <p className="secondary_text_book_now">
                {startDate.getDate() +
                  " - " +
                  endDate.getDate() +
                  " " +
                  months[endDate.getMonth()] +
                  ", " +
                  endDate.getFullYear()}
              </p>
            </div>
            <div className="text_wrapper_book_now">
              <img src={Clock} className="img_book_now" alt="Clock" />
              <p className="secondary_text_book_now">
                {endDate &&
                  Math.ceil((endDate - startDate) / (1000 * 24 * 3600))}{" "}
                days
              </p>
            </div>
            <div className="text_wrapper_book_now">
              <img src={Location} className="img_book_now" alt="Location" />
              <p className="secondary_text_book_now">{tripDetails?.location}</p>
            </div>
          </div>
          <button
            style={{
              background: "#02EBA5",
              borderRadius: 100,
              height: 44,
              width: "100%",
              color: "black",
              fontFamily: "Inter",
              fontSize: 14,
              lineHeight: "150%",
              fontWeight: 600,
              marginTop: 4,
            }}
            onClick={() => {
              window.open(`${slug}/checkout`);
            }}
          >
            Book Now
          </button>
        </div>
      </div>
    );
  };

  const cardWithText = (title, data) => {
    const cards = (i, index) => {
      return (
        <div
          key={i._id}
          style={{
            borderRadius: 24,
            boxShadow: "0px 2px 24px 1px rgba(102, 102, 102, 0.15)",
            marginTop: isMobile ? 16 : index == 0 ? 32 : 48,
          }}
        >
          {/* {title != "Accomodation" && (
            <img
              src={i.image}
              style={{
                width: "100%",
                height: "337.8px",
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
                objectFit: "cover",
              }}
            />
          )} */}
          {/* {title == "Accomodation" && ( */}
          <div>
            <ImageCarousel images={i.image} />
          </div>
          {/* )} */}
          <div style={{ padding: 24 }}>
            <p className="high_header">
              {title == "Accomodation" ? i.name : i.title}
            </p>
            <p className="high_description">
              {title == "Accomodation" ? i.address : i.description}
            </p>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="trip_high_text">{title}</p>
        {data?.map((i, index) => cards(i, index))}
      </div>
    );
  };

  const itinerary = () => {
    const itCard = (i, index) => {
      const handleItChange = (i) => {
        if (selectedIt == i._id) {
          setSelectedIt("");
          return;
        }
        setSelectedIt(i._id);
      };
      const itExpand = (j, index) => {
        return (
          <div
            style={{ marginTop: index != 0 ? 16 : 8 }}
            key={"its - " + index}
          >
            <div style={{ display: "flex" }}>
              <img src={Star} style={{ height: "fit-content" }} alt="Star" />
              <p style={{ marginLeft: 8 }} className="it_text_list">
                {j}
              </p>
            </div>
          </div>
        );
      };
      return (
        <div
          key={i._id}
          onClick={() => {
            handleItChange(i);
          }}
          style={{ cursor: "pointer" }}
        >
          <div style={{ padding: "24px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="it_day_text">Day {index + 1}</p>
              <img
                alt="Down"
                src={Down}
                style={{
                  cursor: "pointer",
                  WebkitTransform:
                    selectedIt == i._id ? "rotateX(180deg)" : "none",
                  transform: selectedIt == i._id ? "rotateX(180deg)" : "none",
                }}
              />
            </div>
          </div>

          {selectedIt == i._id && (
            <div style={{ padding: 24, paddingTop: 0 }}>
              {i.day.map((j, index) => itExpand(j, index))}
            </div>
          )}
          {index != tripDetails?.itinerary.length - 1 && (
            <div
              style={{
                background: "var(--Light-Light-400, #DEDEDE)",
                height: 1,
              }}
            />
          )}
        </div>
      );
    };

    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="it_header_text">Trip Itinerary</p>
        <div
          style={{
            background: "var(--Light-Light-200, #F5F5F5)",
            borderRadius: 24,
            marginTop: isMobile ? 16 : 32,
          }}
        >
          {tripDetails?.itinerary?.map((i, index) => itCard(i, index))}
        </div>
      </div>
    );
  };

  const amenities = () => {
    const amCard = (i, index, type) => {
      return (
        <div
          key={i._id}
          className="amenities_card_wrapper"
          style={{
            display: isMobile ? "flex" : "",
            width: isMobile ? "100%" : "",
            alignItems: "center",
          }}
        >
          {type == "inc" && (
            <img src={Check} style={{ width: 26, height: 26 }} alt="Check" />
          )}

          <p
            style={{
              marginTop: isMobile ? 0 : type == "inc" ? 16 : 0,
              marginLeft: isMobile && type == "inc" ? 16 : 0,
            }}
            className="am_card_text"
          >
            {i.text}
          </p>
        </div>
      );
    };
    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="it_header_text">Amenities</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: isMobile ? 16 : 32,
            gap: 8,
          }}
        >
          <button
            className={
              selectAmenity == 0
                ? "amenities_button_selected"
                : "amenities_button"
            }
            onClick={() => setSelectAmenity(0)}
          >
            Inclusions
          </button>
          <button
            className={
              selectAmenity == 1
                ? "amenities_button_selected"
                : "amenities_button"
            }
            onClick={() => setSelectAmenity(1)}
          >
            Exclusions
          </button>
          <button
            className={
              selectAmenity == 2
                ? "amenities_button_selected"
                : "amenities_button"
            }
            onClick={() => setSelectAmenity(2)}
          >
            Add ons
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            marginTop: 24,
          }}
        >
          {/* {amns.map((i, index) => amCard(i, index))} */}
          {selectAmenity == 0 &&
            tripDetails?.inclusions?.map((i, index) => amCard(i, index, "inc"))}
          {selectAmenity == 1 &&
            tripDetails?.exclusions?.map((i, index) => amCard(i, index, "exc"))}
          {selectAmenity == 2 &&
            tripDetails?.add_ons?.map((i, index) => amCard(i, index, "add"))}
        </div>
      </div>
    );
  };

  const roomOptions = () => {
    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="it_header_text">Room options</p>
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            flexWrap: "wrap",
            gap: isMobile ? 16 : 32,
            marginTop: isMobile ? 16 : 32,
          }}
        >
          {tripDetails?.room?.map((i) => (
            <div className="room_wrapper" key={i._id}>
              {/* <img
                src={i.image}
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  width: "-webkit-fill-available",
                }}
              /> */}
              <ImageCarousel
                images={i.image}
                style={{
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                  width: "-webkit-fill-available",
                }}
                width={"50px"}
              />
              <div style={{ padding: 24 }}>
                <p className="room_primary_text">{i.roomType}</p>
                <p className="room_secondary_text">{i.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const faqs = () => {
    const faq1 = tripDetails?.faq?.filter((i) => i.type == faqType);
    const faqCard = (i, index) => {
      return (
        <div
          key={index + "faq"}
          style={{
            background: "var(--White-Color, #FFF)",
            boxShadow: "0px 2px 24px 1px rgba(102, 102, 102, 0.10)",
            marginTop: 16,
            padding: 24,
            borderRadius: 24,
            cursor: "pointer",
          }}
          onClick={() => {
            if (i._id == selectedFaq) {
              setSelectedFaq();
              return;
            }
            setSelectedFaq(i._id);
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <p className="faq_question">{i.question}</p>
            <img
              alt="Down"
              src={Down}
              style={{
                cursor: "pointer",
                WebkitTransform:
                  selectedFaq == i._id ? "rotateX(180deg)" : "none",
                transform: selectedFaq == i._id ? "rotateX(180deg)" : "none",
              }}
            />
          </div>
          {selectedFaq == i._id && (
            <p className="answer_text" style={{ marginTop: 24 }}>
              <TextWithMultiLine text={i.answer} />
            </p>
          )}
        </div>
      );
    };

    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="it_header_text">FAQs</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
            gap: 8,
          }}
        >
          {faqTypes.map((i) => (
            <button
              className={
                faqType == i ? "amenities_button_selected" : "amenities_button"
              }
              onClick={() => setFaqType(i)}
            >
              {i}
            </button>
          ))}
        </div>
        <div style={{ marginTop: 8 }}>
          {faq1 && faq1?.map((i, index) => faqCard(i, index))}
        </div>
      </div>
    );
  };

  const bookNowMob = () => {
    const startDate = new Date(tripDetails?.start_date);
    const endDate = new Date(tripDetails?.end_date);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return (
      <div style={{ padding: 16, zIndex: 100 }} className="sticky_pay">
        <div
          className="text_wrapper_book_now"
          style={{ marginBottom: 16, justifyContent: "space-around" }}
        >
          <p className="amount_text">
            {tripDetails?.currency == "USD" ? "$ " : "₹ "}
            {(tripDetails?.is_early_bird_price_active
              ? tripDetails?.early_bird_price
              : tripDetails?.price
            )?.toLocaleString() ?? ""}
          </p>
          <button
            style={{
              width: 177,
              height: 40,
              borderRadius: 100,
              background: "#02EBA5",
              color: "black",
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: 600,
              lineHeight: "150%",
              marginLeft: 16,
            }}
            onClick={() => {
              window.open(`${slug}/checkout`);
            }}
          >
            Book now
          </button>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="text_wrapper_book_now" style={{ marginBottom: 0 }}>
            <img src={Pay} className="img_book_now" alt="Pay" />
            <p className="secondary_text_book_now">Pay in parts</p>
          </div>
          <div
            className="text_wrapper_book_now"
            style={{ marginLeft: 16, marginBottom: 0 }}
          >
            <img src={Calender} className="img_book_now" alt="Calendar" />
            <p className="secondary_text_book_now">
              {startDate.getDate() +
                " - " +
                endDate.getDate() +
                " " +
                months[endDate.getMonth()] +
                ", " +
                endDate.getFullYear()}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const [expArr, setExpArr] = useState([]);

  useEffect(() => {
    if (tripDetails?.experience?.description) {
      const days =
        tripDetails?.end_date &&
        Math.ceil(
          (new Date(tripDetails?.end_date) -
            new Date(tripDetails?.start_date)) /
            (1000 * 24 * 3600)
        ) + " days";
      const expArr_dummy = [
        {
          id: "exp-0",
          icon: UserGrp,
          text: tripDetails?.experience?.range_of_spots,
        },
        {
          id: "exp-1",
          icon: Building,
          text: tripDetails?.experience?.accommodation,
        },
        {
          id: "exp-2",
          icon: Cake,
          text: tripDetails?.experience?.included_meals,
        },
        {
          id: "exp-3",
          icon: Clock,
          text: days,
        },
      ];
      setExpArr(expArr_dummy);
    }
  }, [tripDetails]);

  const experience = () => {
    const expCard = (i, index) => {
      return (
        <div className="exp_card" key={i.id}>
          <img
            src={i.icon.replace(
              "http://localhost:5005",
              "https://gosupersquad.com:5005"
            )}
            alt="Icon"
          />
          <p className="text_preview_last">{i.text}</p>
        </div>
      );
    };
    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="trip_high_text">The Experience</p>
        <p style={{ marginTop: 32 }} className="exp_text">
          {tripDetails?.experience?.description}
        </p>
        {expArr.map((i, index) => expCard(i, index))}
      </div>
    );
  };
  if (!hasError) {
    return (
      <div>
        <div>
          {tripDetails?.cover_video && (
            <video
              autoPlay
              muted
              loop
              playsInline
              id="myVideo"
              style={{
                height: isMobile ? "" : 692,
                position: "absolute",
                width: "100%",
                objectFit: "cover",
                zIndex: 0,
              }}
            >
              <source
                src={
                  isMobile && tripDetails?.cover_video_mob
                    ? tripDetails?.cover_video_mob?.replace(
                        "http://localhost:5005",
                        "https://gosupersquad.com:5005"
                      )
                    : tripDetails?.cover_video?.replace(
                        "http://localhost:5005",
                        "https://gosupersquad.com:5005"
                      )
                }
                type="video/mp4"
              />
            </video>
          )}
          {topDiv()}
          {isMobile ? tripStatsMobile() : tripStats()}
        </div>
        <div
          style={{
            display: "flex",
            padding: !isMobile ? "0px 8.33vw" : "0px 16px",
          }}
        >
          <div
            style={{
              width: isMobile ? "100%" : "calc(83.34vw - 510px)",
              marginRight: 24,
            }}
          >
            {description()}
            {hostIn.name && hostInfo()}
            {/* {experience()} */}
            {cardWithText("Trip Highlights", tripDetails?.tripHighlight)}
            {itinerary()}
            {amenities()}
            {cardWithText("Accomodation", tripDetails?.accommodation)}
            {tripDetails?.room?.length > 1 && roomOptions()}
            {faqs()}
          </div>
          {!isMobile && bookNow()}
        </div>
        <Footer />
        {isMobile && isSticky && bookNowMob()}
      </div>
    );
  } else if (hasError) {
    return <BasicModal />;
  }
}
