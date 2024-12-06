import React, { useEffect, useState } from "react";
import LogoDark from "../../resources/images/trip_page/LogoDark.svg";
import { useParams } from "react-router-dom";
import { ReactComponent as ShareIcon } from "../../resources/images/trip_page/share-icon.svg";
import "./TripPage.css";
import Modal from "@mui/material/Modal";
import Insta from "../../resources/images/trip_page/insta.svg";
import { Helmet } from "react-helmet";
import TextWithMultiLine from "../TextWithMultiLine";
import { url } from "../../helper";

import { ReactComponent as Location } from "../../resources/images/trip_page/location.svg";
import { ReactComponent as Date1 } from "../../resources/images/trip_page/dates.svg";
import { ReactComponent as GroupSize } from "../../resources/images/trip_page/group-size.svg";
import { ReactComponent as Cross1 } from "../../resources/images/trip_page/cross.svg";
import { ReactComponent as SpotLight } from "../../resources/images/trip_page/spot-light.svg";
import { ReactComponent as ItnDate } from "../../resources/images/trip_page/date-itn.svg";
import { ReactComponent as ChevronDown } from "../../resources/images/trip_page/chevron-down.svg";
// import { ReactComponent as Building } from "../../resources/images/trip_page/building-office.svg";
import { ReactComponent as Meals1 } from "../../resources/images/trip_page/meals1.svg";
import { ReactComponent as Transport } from "../../resources/images/trip_page/transport.svg";
import { ReactComponent as Reserve1 } from "../../resources/images/trip_page/r1.svg";
import { ReactComponent as Reserve2 } from "../../resources/images/trip_page/r2.svg";
import { ReactComponent as Reserve3 } from "../../resources/images/trip_page/r3.svg";
import { ReactComponent as UpArrowIt } from "../../resources/images/trip_page/uparraowit.svg";
import { ReactComponent as Whatsapp } from "../../resources/images/trip_page/whatsapp.svg";
import { ReactComponent as Activity1 } from "../../resources/images/trip_page/activity.svg";
import { ReactComponent as Building } from "../../resources/images/trip_page/building-office.svg";
import { Drawer } from "@mui/material";

import ImageCarousel from "./ImageCarousel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import axios from "axios";

export default function TripPage() {
  const { id } = useParams();
  const { hostname } = useParams();
  console.log(id);
  const getSystemTheme = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
  };

  const icons = {
    Location: <Location className="share_icon" />,
    Clock: <Date1 className="share_icon" />,
    GroupSize: <GroupSize className="share_icon" />,
    Meals: <Meals1 className="share_icon" />,
    Activity: <Activity1 className="share_icon" />,
    Transport: <Transport className="share_icon" />,
    Building: <Building className="share_icon" />,
  };

  const [activeAm, setActiveAm] = useState("amb-0");
  const [activeFaqType, setActiveFaqType] = useState("ft-0");
  const [theme, setTheme] = useState(getSystemTheme());
  const [selectedIt, setSelectedIt] = useState(["itn-0"]);
  const [selectedFaq, setSelectedFaq] = useState("faq-0");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

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

  const [tripData, setTripData] = useState();
  useEffect(() => {
    axios
      .post(url + "v1/tripv2/", {
        slug: id,
      })
      .then((res) => {
        console.log(res.data);
        setTripData(res.data.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleShare = async () => {
    // const currentUrl = window.location.href;
    // navigator.clipboard.writeText(currentUrl).then(() => {
    //   setShowSnackbar(true);
    // });
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: tripData?.title,
          url: window.location.href, // current URL
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      console.log("Web Share API not supported.");
      // Fallback: handle non-supported browsers here (e.g., show a modal with copy link)
    }
  };

  // const toggleTheme = () => {
  //   setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  // };

  // const getThemeObject = (light, dark) => {
  //   return theme == "dark" ? dark : light;
  // };

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
          alt="logo"
        />
      </div>
    );
  };

  const heroSection = () => {
    const title = () => {
      return (
        <div
          style={{
            display: "flex",
            alignItems: isMobile ? "flex-start" : "center",
            justifyContent: "space-between",
            marginBottom: isMobile ? 20 : 24,
            gap: isMobile ? 32 : 32,
            marginTop: isMobile ? 20 : 0,
          }}
        >
          <p className="t_head_1">{tripData?.title}</p>
          <button className="share_btn" onClick={handleShare}>
            <ShareIcon className="share_icon" />
            {!isMobile && <p className="share_text">Share</p>}
          </button>
        </div>
      );
    };
    return (
      <div style={{ marginTop: isMobile ? 15 : 32 }}>
        {!isMobile && title()}
        <div style={{ display: "flex", gap: 8, overflow: "auto" }}>
          <img
            src={tripData?.coverImages[0]}
            style={{ borderRadius: 16 }}
            className="hero_img_1"
            alt="cover"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <img
              src={tripData?.coverImages[1]}
              style={{ borderRadius: 16 }}
              className="hero_img_2"
              alt="cover"
            />
            <img
              src={tripData?.coverImages[2]}
              style={{ borderRadius: 16 }}
              className="hero_img_2"
              alt="cover"
            />
          </div>
          <img
            src={tripData?.coverImages[3]}
            style={{ borderRadius: 16 }}
            className="hero_img_1"
            alt="cover"
          />
        </div>
        {tripData?.coverIcon && logo()}
        {isMobile && title()}
      </div>
    );
  };

  const hostInfo = () => {
    const line = () => {
      return <div className="line_trip" />;
    };
    return (
      <div>
        {line()}
        <div className="host_container">
          <div
            style={{
              margin: "9px 0px",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <p className="host_info_head">
              Travel with {tripData?.hostId.name}
            </p>
            <p className="host_info_para" onClick={() => setShowModal(true)}>
              {"Know more ->"}
            </p>
          </div>
          <img
            src={tripData?.hostId.profile_pic}
            style={{
              borderRadius: 12,
              width: 64,
              height: 64,
              objectFit: "cover",
              cursor: "pointer",
            }}
            onClick={() => setShowModal(true)}
            alt="Host"
          />
        </div>
        {line()}
      </div>
    );
  };

  const tripInfo = () => {
    const insideDiv = (Icon, text1, text2, classname) => {
      return (
        <>
          <div className="trip_info_header_container">
            {<Icon className={classname ?? "share_icon"} />}
            <p
              className="trip_info_container_para"
              style={{ marginTop: text1 === "Meals" ? 4 : 0 }}
            >
              {text1}
            </p>
          </div>
          <p className="trip_info_container_para_2">{text2}</p>
        </>
      );
    };
    const endDate = new Date(tripData?.endDate);
    const startDate = new Date(tripData?.startDate);
    return (
      <div>
        <div style={{ marginTop: isMobile ? 20 : 32 }} className="info_grid">
          <div className="trip_info_container">
            {insideDiv(
              Location,
              "Location",
              tripData?.state
                ? tripData?.city + ", " + tripData?.state
                : tripData?.city
            )}
          </div>
          <div className="trip_info_container">
            {insideDiv(
              Date1,
              "Dates",
              `${startDate?.getDate()} ${startDate?.toLocaleString("default", {
                month: "short",
              })} ${startDate?.getFullYear()} - ${endDate?.getDate()} ${endDate?.toLocaleString(
                "default",
                { month: "short" }
              )} ${endDate?.getFullYear()}`
            )}
          </div>
          <div className="trip_info_container">
            {insideDiv(GroupSize, "Group size", tripData?.groupSize)}
          </div>
          <div className="trip_info_container">
            {insideDiv(Meals1, "Meals", tripData?.mealsIncluded)}
          </div>
        </div>
        {/* <p
          style={{ marginTop: isMobile ? 20 : 32 }}
          className="host_description"
        >
          {tripData?.description}
        </p> */}
        <div
          style={{ marginTop: isMobile ? 20 : 32 }}
          className="host_description"
          dangerouslySetInnerHTML={{ __html: tripData?.description }}
        ></div>
      </div>
    );
  };

  const spotLightEvents = () => {
    const card = (i) => {
      return (
        <div className="spot_card_container_div" key={i.id}>
          {/* <img
            src={i.img}
            style={{
              height: 212,
              width: isMobile ? "100%" : "100%",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              objectFit: "cover",
            }}
          /> */}
          <ImageCarousel
            images={[i.image]}
            style={{
              height: 212,
              width: isMobile ? "100%" : "100%",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              objectFit: "cover",
              cursor: "pointer",
            }}
          />
          <div style={{ padding: "16px 8px" }}>
            <p className="spot_p">{i.title}</p>
          </div>
        </div>
      );
    };
    return (
      <div>
        <div
          style={{ marginTop: isMobile ? 48 : 32 }}
          className="spot_light_header_container"
        >
          <SpotLight />
          <p className="section_header">Spotlight events</p>
        </div>
        <div className="spotlight_card_container">
          {tripData?.spotlightEvents.map((i) => card(i))}
        </div>
      </div>
    );
  };
  const handleSelectedIt = (id) => {
    if (selectedIt.includes(id)) {
      console.log("id");
      setSelectedIt((prevSelected) =>
        prevSelected.filter((item) => item !== id)
      );
    } else {
      console.log("id", id);
      setSelectedIt((prevSelected) => [...prevSelected, id]);
    }
  };

  const itinerary = () => {
    const startDate = new Date(tripData?.startDate);
    const endDate = new Date(tripData?.endDate);

    const itExpandedCard = (i) => {
      const detailItImg = (k) => {
        return (
          <div
            style={{
              display: "flex",
              flex: isMobile ? "0 1 calc(50% - 6px)" : "0 1 calc(50% - 12px)",
              boxSizing: "border-box",
              padding: isMobile ? "0px" : "0px 12px",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* <img
              src={k.img[0]}
              style={{ width: "100%", aspectRatio: 264 / 144, borderRadius: 8 }}
            /> */}
            <ImageCarousel
              images={[k.url]}
              style={{
                width: "100%",
                aspectRatio: 264 / 144,
                borderRadius: 8,
                cursor: "pointer",
                objectFit: "cover",
              }}
              width={isMobile ? 12 : 20}
            />
            {/* {k.description && (
              <p style={{ marginTop: 8 }} className="detailItImg_p">
                {k.description}
              </p>
            )} */}
            {k.description && (
              <div
                style={{ marginTop: 8 }}
                className="detailItImg_p"
                // dangerouslySetInnerHTML={{ __html: k.description }}
              >
                <TextWithMultiLine text={k.description} />
              </div>
            )}
          </div>
        );
      };
      const detailsIt = (j, index) => {
        return (
          <div>
            <div className="detail_it_container">
              {/* {j.imgType === "svg" ? (
                <j.icon className="share_icon" />
              ) : (
                <img src={j.icon} alt="icon" />
              )} */}
              {/* <Activity1 className="share_icon" /> */}
              {/* {j.icon === "Activity" && <Activity1 className="share_icon" />}
              {j.icon === "Meals" && <Meals1 className="share_icon" />}
              {j.icon === "Transport" && <Transport className="share_icon" />} */}
              {icons[j.icon]}
              <p className="detail_it_p" style={{ marginTop: 8 }}>
                {j.title}
              </p>
              {j.description && (
                <div
                  style={{ marginTop: 8 }}
                  className="detail_it_p_1"
                  // dangerouslySetInnerHTML={{ __html: j.description }}
                >
                  <TextWithMultiLine text={j.description} />
                </div>
              )}
              {j.images && j.images.length > 0 && (
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: isMobile ? 12 : 24,
                    flexWrap: "wrap",
                  }}
                >
                  {j.images.map((k) => detailItImg(k))}
                </div>
              )}
            </div>
            {index !== i.activities?.length - 1 && (
              <div
                style={{ margin: "24px 16px 24px 16px" }}
                className="line_trip"
              />
            )}
          </div>
        );
      };
      return (
        <div className="it_expanded_container">
          <div></div>
          {i.activities.map((j, index) => detailsIt(j, index))}
        </div>
      );
    };

    const itnCard = (i, index) => {
      const itnDate = new Date(
        startDate.getTime() + index * 24 * 60 * 60 * 1000
      );
      return (
        <div>
          <div
            className="it_container"
            key={i.id}
            onClick={() => {
              handleSelectedIt(i._id);
            }}
          >
            <div
              className={
                !selectedIt.includes(i._id)
                  ? "it_date_container"
                  : "it_date_container_selected"
              }
            >
              <p className="it_text" style={{ textAlign: "center" }}>
                {/* {Number(i.id[4]) + 15} */}
                {itnDate?.getDate()}
                <br />
                {itnDate?.toLocaleString("default", { month: "short" })}
              </p>
            </div>
            <div
              className={
                !selectedIt.includes(i._id)
                  ? "it_title_container"
                  : "it_title_container_selected"
              }
            >
              <p className="it_title_text">{i.title}</p>
              {!selectedIt.includes(i._id) ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    cursor: "pointer",
                  }}
                >
                  <p className="it_expand_text">Expand</p>
                  <ChevronDown className="share_icon" />
                </div>
              ) : (
                <UpArrowIt className="uparrowit" />
              )}
            </div>
          </div>
          {selectedIt.includes(i._id) && itExpandedCard(i)}
          {/* </div> */}
        </div>
      );
    };
    return (
      <div style={{ marginTop: 48 }}>
        <div
          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
        >
          <p className="section_header">Itinerary</p>
          <button className="date_button">
            <ItnDate />
            <p style={{ color: "#000" }}>
              {startDate?.getDate()} - {endDate?.getDate()}{" "}
              {startDate?.toLocaleString("default", { month: "short" })},{" "}
              {startDate?.getFullYear()}
            </p>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginTop: 29,
          }}
        >
          {tripData?.itinerary.map((i, index) => itnCard(i, index))}
        </div>
      </div>
    );
  };

  const optionButtons = (options, active, setter) => {
    return (
      <div className="option-btn-container">
        {options.map((i) => (
          <button
            className={
              active === i.id
                ? "option-btn option-btn-active"
                : "option-btn option-btn-inactive"
            }
            onClick={() => {
              setter(i.id);
            }}
          >
            <p
              className={
                active === i.id
                  ? "option-btn-text option-btn-text-active"
                  : "option-btn-text option-btn-text-inactive"
              }
            >
              {i.text}{" "}
            </p>
          </button>
        ))}
      </div>
    );
  };

  const amenities = () => {
    const optArr = [
      {
        id: "amb-0",
        text: "Included",
      },
      {
        id: "amb-1",
        text: "Not Included",
      },
      {
        id: "amb-2",
        text: "Add-ons",
      },
    ];

    const amCard = (i) => {
      return (
        <div className="am_card_container">
          <div className="am_card_top_container">
            {/* <img src={i.icon} alt="amenities" className="share_icon" /> */}
            {icons[i.icon]}
            <p className="am_card_top_text">{i.title}</p>
          </div>
          <div
            // dangerouslySetInnerHTML={{ __html: i.description }}
            className="am_card_bottom_text"
          >
            <TextWithMultiLine text={i.description} />
          </div>
          <div className="am_line" />
        </div>
      );
    };
    return (
      <div style={{ marginTop: 48 }}>
        <p className="section_header">Amenities</p>
        <div style={{ marginTop: 27 }}>
          {optionButtons(optArr, activeAm, setActiveAm)}
        </div>
        <div className="am_container">
          {activeAm === "amb-0" && tripData?.inclusions.map((i) => amCard(i))}
          {activeAm === "amb-1" && tripData?.exclusions.map((i) => amCard(i))}
          {activeAm === "amb-2" && tripData?.addOns.map((i) => amCard(i))}
        </div>
      </div>
    );
  };

  const accomodation = () => {
    const roomCard = (i) => {
      return (
        <div
          className="room_card_container"
          style={{ flex: isMobile ? "1 1 100%" : 1 }}
          key={i.id}
        >
          <ImageCarousel
            images={i.images}
            style={{
              width: "100%",
              aspectRatio: 264 / 144,
              borderRadius: 8,
              cursor: "pointer",
              objectFit: "cover",
            }}
            width={isMobile ? 12 : 20}
          />
          <div className="room_card_bottom_container">
            <p className="room_card_bottom_container_title">{i.title}</p>
            <p className="room_card_bottom_container_text">{i.description}</p>
          </div>
        </div>
      );
    };
    return (
      <div style={{ marginTop: 48 }}>
        <p className="section_header">Accomodation</p>
        <div style={{ marginTop: 16 }} className="room_container">
          {tripData?.accommodations.map((i) => roomCard(i))}
        </div>
      </div>
    );
  };

  const reserveSpot = () => {
    const endDate = new Date(tripData?.endDate);
    const startDate = new Date(tripData?.startDate);
    return (
      <div
        style={{
          width: 370,
          position: "sticky",
          top: 32,
          height: "fit-content",
        }}
        className="reserve_container"
      >
        <div className="resever_top_container" style={{ width: "100%" }}>
          <div className="reserver_top_subcontainer">
            <Reserve1 className="share_icon" />
            <p className="reserve_top_container_text">{tripData?.city}</p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve2 className="share_icon" />
            <p className="reserve_top_container_text">
              {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1}{" "}
              Days, {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}{" "}
              Nights
            </p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve3 className="share_icon" />
            <p className="reserve_top_container_text">
              {startDate?.getDate()}{" "}
              {startDate?.toLocaleString("default", { month: "short" })}{" "}
              {startDate?.getFullYear()} - {endDate?.getDate()}{" "}
              {endDate?.toLocaleString("default", { month: "short" })}{" "}
              {endDate?.getFullYear()}
            </p>
          </div>
        </div>
        <div className="reserve_line" />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <p className="total_price_text">Total Price</p>
          <p className="total_price_number_text">
            {tripData?.currency}
            {tripData?.price?.toLocaleString()}
          </p>
        </div>
        <div className="hurry_container">
          <p className="hurry_text">{tripData?.tag_line}</p>
        </div>
        <button
          className="reserve_btn"
          onClick={() => {
            window.open(
              "https://gosupersquad.com/" + hostname + "/" + id + "/checkout",
              "_self"
            );
          }}
        >
          <p className="reserve_btn_text">Request a spot</p>
        </button>
      </div>
    );
  };

  const faq = () => {
    const optArr = [
      {
        id: "ft-0",
        text: "Experience",
      },
      {
        id: "ft-1",
        text: "General",
      },
    ];
    const handleSelectFaq = (id) => {
      if (selectedFaq === id) {
        setSelectedFaq(null);
      } else {
        setSelectedFaq(id);
      }
    };
    const faqCard = (i) => {
      return (
        <div
          style={{ marginTop: 16, cursor: "pointer" }}
          onClick={() => {
            handleSelectFaq(i._id);
          }}
        >
          <div className="faq_card_container">
            <div className="faq_card_top">
              <p className="faq_question">{i.question}</p>
              <ChevronDown
                style={{
                  cursor: "pointer",
                  WebkitTransform:
                    selectedFaq === i._id ? "rotate(180deg)" : "",
                  transform: selectedFaq === i._id ? "rotate(180deg)" : "",
                }}
                className="share_icon"
              />
            </div>
            <div
              className={`faq-content ${selectedFaq === i._id ? "open" : ""}`}
            >
              {selectedFaq === i._id && (
                <div
                  style={{ marginTop: 0 }}
                  className="faq_answer"
                  // dangerouslySetInnerHTML={{ __html: i.answer }}
                >
                  <TextWithMultiLine text={i.answer} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    };

    return (
      <div style={{ marginTop: 48 }}>
        <p className="section_header">FAQs</p>
        <div>
          <div style={{ marginTop: 8 }}>
            {optionButtons(optArr, activeFaqType, setActiveFaqType)}
          </div>
        </div>
        {activeFaqType === "ft-0" &&
          tripData?.faqs?.experience.map((i) => faqCard(i))}
        {activeFaqType === "ft-1" &&
          tripData?.faqs?.general.map((i) => faqCard(i))}
      </div>
    );
  };

  const stickyPay = () => {
    return (
      <div style={{ position: "sticky", bottom: 0, zIndex: 1000 }}>
        <div className="hurry_container">
          <p className="hurry_text">{tripData?.tag_line}</p>
        </div>
        <div className="sticky_pay_container">
          <div className="sticky_text_container">
            <div className="sticky_price">
              {tripData?.currency}
              {tripData?.price?.toLocaleString()}
            </div>
            <div className="sticky_price_helper">Pay in parts</div>
          </div>
          <button
            className="reserve_button"
            onClick={() => {
              window.open(
                "https://gosupersquad.com/" + hostname + "/" + id + "/checkout",
                "_self"
              );
            }}
          >
            <p className="reserver_button_text">Request a spot</p>
          </button>
        </div>
      </div>
    );
  };

  const whatsapp = () => {
    return (
      <div className="whatsapp_container">
        <Whatsapp className="whatsapp_icon" />
        <p className="whatsapp_text">Still got questions? Talk to us</p>
      </div>
    );
  };

  const creatorModal = () => {
    return (
      <Modal
        open={showModal}
        style={{ padding: "24px" }}
        onClose={() => setShowModal(false)}
      >
        <div
          style={{
            padding: "48px 80px",
            width: 887,
            borderRadius: 24,
            margin: "auto",
            position: "relative",
            outline: "none",
            backgroundColor: "var(--background-color-modal)",
          }}
        >
          <Cross1
            onClick={() => setShowModal(false)}
            style={{
              cursor: "pointer",
              position: "absolute",
              top: 16,
              right: 16,
            }}
            className="share_icon"
            alt="Cross"
          />
          <div className="modal-container">
            <div className="modal-left">
              <p className="modal-left-head">Meet {tripData?.hostId.name}</p>
              {tripData?.hostId.social_media_follower && (
                <div
                  className="insta_info"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    window.open(tripData?.hostId.social_media_link)
                  }
                >
                  <img src={Insta} alt="Insta" />
                  <div className="insta_info_text">
                    <p className="insta_text">
                      {tripData?.hostId.social_media_follower}
                    </p>
                    <p className="insta_subtext">Followers</p>
                  </div>
                </div>
              )}
              {/* <p className="modal-left-para">{tripData?.hostId.bio}</p> */}
              <div
                style={{ marginTop: 16 }}
                className="modal-left-para"
                dangerouslySetInnerHTML={{ __html: tripData?.hostId.bio }}
              ></div>
            </div>
            <div className="modal-right">
              <img
                src={tripData?.hostId.profile_pic}
                alt="Host Pic"
                style={{
                  width: 326,
                  height: 469,
                  borderRadius: 8,
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  const creatorModalMobile = () => {
    return (
      <Drawer
        anchor="bottom"
        open={showModal}
        onClose={() => setShowModal(false)}
      >
        <div
          style={{
            padding: "24px",
            background: `var(--background-color-modal)`,
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p className="modal-left-head">Meet {tripData?.hostId.name}</p>
            <Cross1
              onClick={() => setShowModal(false)}
              style={{
                cursor: "pointer",
              }}
              className="share_icon"
              alt="Cross"
            />
          </div>
          {tripData?.hostId.social_media_follower && (
            <div
              className="insta_info"
              style={{ marginTop: 8 }}
              onClick={() => window.open(tripData?.hostId.social_media_link)}
            >
              <img src={Insta} alt="Insta" />
              <div className="insta_info_text">
                <p className="insta_text">
                  {tripData?.hostId.social_media_follower}
                </p>
                <p className="insta_subtext">Followers</p>
              </div>
            </div>
          )}
          <div
            style={{ marginTop: 16 }}
            className="modal-left-para"
            dangerouslySetInnerHTML={{ __html: tripData?.hostId.bio }}
          ></div>
          <img
            src={tripData?.hostId.profile_pic}
            alt="Host Pic"
            style={{
              width: "100%",
              height: 320,
              borderRadius: 8,
              objectFit: "cover",
              marginTop: 15,
            }}
          />
        </div>
      </Drawer>
    );
  };

  const snakbar = () => {
    return (
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Link copied to clipboard!"
      />
    );
  };

  const logo = () => {
    return (
      <img
        src={tripData?.coverIcon}
        alt="Logo"
        style={{
          marginTop: 0,
          marginBottom: -27,
          objectFit: "cover",
          width: 100,
        }}
      />
    );
  };

  return (
    <div style={{ background: "var(--background-color)" }}>
      <div style={{ maxWidth: 1440, margin: "auto" }}>
        <div style={{ padding: isMobile ? "0px 16px" : "0px 9.375vw" }}>
          {navbar()}
          <Helmet>
            <title>{tripData?.hostId?.name || "Supersquad"} | Supersquad</title>
            <meta name="description" content=" | Supersquad" />
            <meta
              property="og:site_name"
              content={`${tripData?.hostId?.name} | Supersquad`}
            />
            <meta
              property="og:title"
              content={`${tripData?.hostId?.name} | Supersquad`}
            />
            <meta
              property="og:description"
              content={`${tripData?.title} | Supersquad`}
            />
          </Helmet>
          {heroSection()}
          <div
            style={{
              display: isMobile ? "" : "flex",
              marginTop: isMobile ? 0 : 32,
              gap: 32,
            }}
          >
            <div style={{ flex: 1, marginBottom: 36 }}>
              {hostInfo()}
              {tripInfo()}
              {spotLightEvents()}
              {itinerary()}
              {amenities()}
              {accomodation()}
              {faq()}
              <a
                href={
                  tripData?.title.includes("Joel")
                    ? "https://wa.me/918769322028?text=Hey,%20I%20have%20some%20queries%20regarding%20Fun%20in%20the%20Sun%20at%20Andamans%20with%20Joel"
                    : "https://wa.me/918930700021?text=hi"
                }
                style={{ height: 22, textDecoration: "none" }}
                aria-label="Whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                {whatsapp()}
              </a>
              {showModal && !isMobile && creatorModal()}
              {showModal && isMobile && creatorModalMobile()}
              {snakbar()}
            </div>
            {!isMobile && reserveSpot()}
          </div>
        </div>
      </div>

      {isMobile && stickyPay()}
    </div>
  );
}
