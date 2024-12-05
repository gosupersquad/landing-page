import React, { useEffect, useState } from "react";
import LogoDark from "../../resources/images/trip_page/LogoDark.svg";
import { ReactComponent as ShareIcon } from "../../resources/images/trip_page/share-icon.svg";
import TextWithMultiLine from "../TextWithMultiLine";
import "./TripPage.css";
import Host1 from "../../resources/images/trip_page/host1.jpg";

import Acc1 from "../../resources/images/trip_page/acc1.webp";
import BookReader from "../../resources/images/trip_page/bookreader.png";
import Acc2 from "../../resources/images/trip_page/acc2.webp";
import Acc3 from "../../resources/images/trip_page/acc3.webp";
import Acc4 from "../../resources/images/trip_page/acc4.webp";
import Acc5 from "../../resources/images/trip_page/acc5.webp";
import Acc6 from "../../resources/images/trip_page/acc6.webp";
import Acc7 from "../../resources/images/trip_page/acc7.webp";
import Acc8 from "../../resources/images/trip_page/acc8.jpg";
import Acc9 from "../../resources/images/trip_page/acc9.webp";
import Acc10 from "../../resources/images/trip_page/acc10.webp";
import Acc11 from "../../resources/images/trip_page/acc11.webp";
import Acc12 from "../../resources/images/trip_page/acc12.webp";
import Ac1 from "../../resources/images/trip_page/ac1.jpg";
import Ac2 from "../../resources/images/trip_page/ac2.jpg";
import Ac3 from "../../resources/images/trip_page/ac3.jpg";
import DAc1 from "../../resources/images/trip_page/dac1.jpg";
import DAc2 from "../../resources/images/trip_page/dac2.jpg";
import DAc3 from "../../resources/images/trip_page/dac3.jpeg";
import DAc4 from "../../resources/images/trip_page/daa4.jpg";
import EAc1 from "../../resources/images/trip_page/eac1.jpg";
import EAc2 from "../../resources/images/trip_page/eac2.webp";
import EAc3 from "../../resources/images/trip_page/eac3.jpg";
import Modal from "@mui/material/Modal";

import Spot1 from "../../resources/images/trip_page/spot1.webp";
import Spot2 from "../../resources/images/trip_page/spot2.jpg";
import Spot3 from "../../resources/images/trip_page/spot3.jpg";
import Spot4 from "../../resources/images/trip_page/spot4.webp";
import Insta from "../../resources/images/trip_page/insta.svg";
import H1 from "../../resources/images/trip_page/h1.jpg";
import H2 from "../../resources/images/trip_page/h2.webp";
import H3 from "../../resources/images/trip_page/h3.jpg";
import H4 from "../../resources/images/trip_page/h4.jpg";
import { Helmet } from "react-helmet";

import { ReactComponent as Location } from "../../resources/images/trip_page/location.svg";
import { ReactComponent as Date } from "../../resources/images/trip_page/dates.svg";
import { ReactComponent as GroupSize } from "../../resources/images/trip_page/group-size.svg";
import { ReactComponent as Cross1 } from "../../resources/images/trip_page/cross.svg";
import { ReactComponent as SpotLight } from "../../resources/images/trip_page/spot-light.svg";
import { ReactComponent as ItnDate } from "../../resources/images/trip_page/date-itn.svg";
import { ReactComponent as ChevronDown } from "../../resources/images/trip_page/chevron-down.svg";
import { ReactComponent as Building } from "../../resources/images/trip_page/building-office.svg";
import { ReactComponent as Meals1 } from "../../resources/images/trip_page/meals1.svg";
import { ReactComponent as Transport } from "../../resources/images/trip_page/transport.svg";
import { ReactComponent as Reserve1 } from "../../resources/images/trip_page/r1.svg";
import { ReactComponent as Reserve2 } from "../../resources/images/trip_page/r2.svg";
import { ReactComponent as Reserve3 } from "../../resources/images/trip_page/r3.svg";
import { ReactComponent as UpArrowIt } from "../../resources/images/trip_page/uparraowit.svg";
import { ReactComponent as Whatsapp } from "../../resources/images/trip_page/whatsapp.svg";
import { ReactComponent as Activity1 } from "../../resources/images/trip_page/activity.svg";
import { Drawer } from "@mui/material";

import ImageCarousel from "./ImageCarousel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";

export default function TripPage() {
  const getSystemTheme = () => {
    const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
    return darkThemeMq.matches ? "dark" : "light";
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

  const handleShare = async () => {
    // const currentUrl = window.location.href;
    // navigator.clipboard.writeText(currentUrl).then(() => {
    //   setShowSnackbar(true);
    // });
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "This is a cool website I found.",
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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const getThemeObject = (light, dark) => {
    return theme == "dark" ? dark : light;
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
          <p className="t_head_1">Book Reader's Retreat With Noharika</p>
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
          <img src={H1} style={{ borderRadius: 16 }} className="hero_img_1" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <img src={H2} style={{ borderRadius: 16 }} className="hero_img_2" />
            <img src={H3} style={{ borderRadius: 16 }} className="hero_img_2" />
          </div>
          <img src={H4} style={{ borderRadius: 16 }} className="hero_img_1" />
        </div>
        {logo()}
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
            <p className="host_info_head">Travel with Noharika</p>
            <p className="host_info_para" onClick={() => setShowModal(true)}>
              {"Know more ->"}
            </p>
          </div>
          <img
            src={Host1}
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
              style={{ marginTop: text1 == "Meals" ? 4 : 0 }}
            >
              {text1}
            </p>
          </div>
          <p className="trip_info_container_para_2">{text2}</p>
        </>
      );
    };
    return (
      <div>
        <div style={{ marginTop: isMobile ? 20 : 32 }} className="info_grid">
          <div className="trip_info_container">
            {insideDiv(Location, "Location", "Kasauli, Himachal Pradesh")}
          </div>
          <div className="trip_info_container">
            {insideDiv(Date, "Dates", "15 - 17 November, 2024")}
          </div>
          <div className="trip_info_container">
            {insideDiv(GroupSize, "Group size", "15-20 book lovers")}
          </div>
          <div className="trip_info_container">
            {insideDiv(Meals1, "Meals", "2 Breakfast & 2 Dinner.")}
          </div>
        </div>
        <p
          style={{ marginTop: isMobile ? 20 : 32 }}
          className="host_description"
        >
          Join Noharika for a transformative group trip designed exclusively for
          book lovers! Set against the tranquil backdrop of Kasauli, this 3-day
          getaway is the perfect escape for readers looking to unwind, connect,
          and be inspired.
        </p>
      </div>
    );
  };

  const spotLightEvents = () => {
    const s_arr = [
      {
        id: "s-01",
        text: "Hill-side Game & Movie Nights",
        img: Spot1,
      },
      {
        id: "s-02",
        text: "Book Exchange & Book Reading",
        img: Spot2,
      },
      {
        id: "s-03",
        text: "Fun Activities: Sip & Paint, Bookmark Making",
        img: Spot3,
      },
      {
        id: "s-04",
        text: "Bonfire & BBQ",
        img: Spot4,
      },
    ];
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
            images={[i.img]}
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
            <p className="spot_p">{i.text}</p>
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
          {s_arr.map((i) => card(i))}
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
    const itnArr = [
      {
        id: "itn-0",
        title: "Books, Bonfire & Fun",
        date: "15th Nov: Day 1 (Fri)",
        details: [
          {
            icon: Transport,
            title: "Travel to Kasauli",
            description:
              "Leave for Kasauli from Delhi early morning by 15-seater bus.",
            imgType: "svg",
          },
          {
            icon: Activity1,
            title: "Stay at Villa nestled between hills",
            description: "Check-in to our villa nestled between hills.",
            imgType: "svg",
            imgArr: [
              { img: [Acc8] },
              { img: [Acc11] },
              { img: [Acc2] },
              { img: [Acc9] },
            ],
          },
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description:
              "- Breakfast/Lunch on the way (own expense). \n- BBQ Dinner at the retreat (included)",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [Ac1],
                title:
                  "After getting refreshed, we further break ice with an exciting Book Exchange Session",
              },
              {
                img: [Ac2],
                title:
                  "Evening: We come together for a Sundowner Silent Reading Session by the hills.",
              },
              {
                img: [Ac3],
                title:
                  "The night is young! We gather around for Game Night, Bonfire & BBQ Dinner.",
              },
            ],
          },
        ],
      },
      {
        id: "itn-1",
        title: "Awaken, Create, Enjoy",
        date: "16th Nov: Day 2 (Sat)",
        details: [
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description:
              "- Breakfast & Dinner at the retreat (included).\n- Lunch on own expense at cafes of Kasauli or at the villa.",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [DAc1],
                title:
                  "Start the day with light meditation and self-journaling session.",
              },
              {
                img: [DAc2],
                title:
                  "Post Breakfast, we get together for a Book Reading session",
              },
              {
                img: [DAc3],
                title:
                  "Afternoon: 4-5 hours of leisure time for self-reading, exploring local cafes for lunch or shopping at local market for souvenirs",
              },
              {
                img: [DAc4],
                title:
                  "We end the day with a relaxed & cozy Movie Night along with Bonfire",
              },
            ],
          },
        ],
      },
      {
        id: "itn-2",
        title: "Good times",
        date: "17th Nov: Day 3 (Sun)",
        details: [
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description:
              "- Breakfast at the retreat (included).\n- Lunch on own expense at cafes of Kasauli.",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [EAc1],
                title:
                  "Start the day with light meditation and self-journaling session.",
              },
              {
                img: [EAc2],
                title:
                  "Post Breakfast, we get together to do something creative over a Bookmark Making Session.",
              },
              {
                img: [EAc3],
                title:
                  "Post check-out, we'll stop by a brewery for a departing lunch & fresh beer by the hills.",
              },
            ],
          },
          {
            icon: Transport,
            title: "Travel to Delhi",
            description:
              "We leave Kasauli for Delhi by evening via 15-seater bus.",
            imgType: "svg",
          },
        ],
      },
    ];

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
              images={k.img}
              style={{
                width: "100%",
                aspectRatio: 264 / 144,
                borderRadius: 8,
                cursor: "pointer",
                objectFit: "cover",
              }}
              width={isMobile ? 12 : 20}
            />
            {k.title && (
              <p style={{ marginTop: 8 }} className="detailItImg_p">
                {k.title}
              </p>
            )}
          </div>
        );
      };
      const detailsIt = (j, index) => {
        return (
          <div>
            <div className="detail_it_container">
              {j.imgType === "svg" ? (
                <j.icon className="share_icon" />
              ) : (
                <img src={j.icon} alt="icon" />
              )}
              <p className="detail_it_p" style={{ marginTop: 8 }}>
                {j.title}
              </p>
              {j.description && (
                <p style={{ marginTop: 8 }} className="detail_it_p_1">
                  <TextWithMultiLine text={j.description}></TextWithMultiLine>
                </p>
              )}
              {j.imgArr && j.imgArr.length > 0 && (
                <div
                  style={{
                    marginTop: 24,
                    display: "flex",
                    gap: isMobile ? 12 : 24,
                    flexWrap: "wrap",
                  }}
                >
                  {j.imgArr.map((k) => detailItImg(k))}
                </div>
              )}
            </div>
            {index != i.details?.length - 1 && (
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
          {i.details.map((j, index) => detailsIt(j, index))}
        </div>
      );
    };

    const itnCard = (i) => {
      return (
        <div>
          <div
            className="it_container"
            key={i.id}
            onClick={() => {
              handleSelectedIt(i.id);
            }}
          >
            <div
              className={
                !selectedIt.includes(i.id)
                  ? "it_date_container"
                  : "it_date_container_selected"
              }
            >
              <p className="it_text" style={{ textAlign: "center" }}>
                {Number(i.id[4]) + 15}
                <br />
                Nov
              </p>
            </div>
            <div
              className={
                !selectedIt.includes(i.id)
                  ? "it_title_container"
                  : "it_title_container_selected"
              }
            >
              <p className="it_title_text">{i.title}</p>
              {!selectedIt.includes(i.id) ? (
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
          {selectedIt.includes(i.id) && itExpandedCard(i)}
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
            <p style={{ color: "#000" }}>15th - 17th Nov</p>
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
          {itnArr.map((i) => itnCard(i))}
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
              active == i.id
                ? "option-btn option-btn-active"
                : "option-btn option-btn-inactive"
            }
            onClick={() => {
              setter(i.id);
            }}
          >
            <p
              className={
                active == i.id
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
    const amArr = [
      {
        id: "am-1",
        title: "Accomodation",
        text: "3 Days & 2 Nights on double sharing basis. \nPrivate rooms available at extra cost",
        icon: <Building className="share_icon" />,
        type: "amb-0",
      },
      {
        id: "am-2",
        title: "Meals",
        text: "2 Breakfast & 2 Dinner Included",
        icon: <Meals1 className="share_icon" />,
        type: "amb-0",
      },
      // {
      //   id: "am-3",
      //   title: "Transportation",
      //   text: "Cost for 15-seater bus from and to Delhi-Kasauli will be charged extra.",
      //   icon: <Transport className="share_icon" />,
      //   type: "amb-0",
      // },
      // {
      //   id: "am-5",
      //   title: "Lunch",
      //   text: "Lunch is excluded. Lunch is available at the villa on paid basis. ",
      //   // icon: <Others className="share_icon" />,
      //   type: "amb-1",
      // },
      // {
      //   id: "am-6",
      //   title: "Fuel",
      //   text: "Fuel charges if coming by private vehicle",
      //   // icon: <Others className="share_icon" />,
      //   type: "amb-1",
      // },
      // {
      //   id: "am-7",
      //   title: "Alcohol",
      //   text: "Alcohol expenses are excluded.",
      //   // icon: <Others className="share_icon" />,
      //   type: "amb-1",
      // },
      {
        id: "am-8",
        title: "Personal expenses",
        text: "Personal expenses for any other activities which are not mentioned.",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },
      {
        id: "am-9",
        title: "Private Room",
        text: "Private Room Upgrade",
        icon: <Building className="share_icon" />,
        type: "amb-2",
      },
      {
        id: "am-10",
        title: "Transportation",
        text: "Transportation To & From Delhi-Kasauli",
        icon: <Transport className="share_icon" />,
        type: "amb-2",
      },
    ];

    const amCard = (i) => {
      return (
        <div className="am_card_container">
          <div className="am_card_top_container">
            {i.icon}
            <p className="am_card_top_text">{i.title}</p>
          </div>
          <p className="am_card_bottom_text">
            <TextWithMultiLine text={i.text} />
          </p>
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
          {amArr.filter((j) => j.type === activeAm).map((i) => amCard(i))}
        </div>
      </div>
    );
  };

  const accomodation = () => {
    const accImg = [
      Acc1,
      Acc2,
      Acc3,
      Acc4,
      Acc5,
      Acc6,
      Acc7,
      Acc8,
      Acc9,
      Acc10,
      Acc11,
      Acc12,
    ];
    const roomArr = [
      {
        id: "ro-0",
        img: accImg,
        title: "Villa Nestled In Hills Of Kasauli",
        text: "Twin sharing and Private rooms available",
      },
    ];

    const roomCard = (i) => {
      return (
        <div
          className="room_card_container"
          style={{ flex: isMobile ? "1 1 100%" : 1 }}
          key={i.id}
        >
          <ImageCarousel
            images={i.img}
            style={{
              width: "100%",
              aspectRatio: 264 / 144,
              borderRadius: 8,
              cursor: "pointer",
            }}
            width={isMobile ? 12 : 20}
          />
          <div className="room_card_bottom_container">
            <p className="room_card_bottom_container_title">{i.title}</p>
            <p className="room_card_bottom_container_text">{i.text}</p>
          </div>
        </div>
      );
    };
    return (
      <div style={{ marginTop: 48 }}>
        <p className="section_header">Accomodation</p>
        <div style={{ marginTop: 16 }} className="room_container">
          {roomArr.map((i) => roomCard(i))}
        </div>
      </div>
    );
  };

  const reserveSpot = () => {
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
            <p className="reserve_top_container_text">Kasauli</p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve2 className="share_icon" />
            <p className="reserve_top_container_text">2 Nights, 3 Days</p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve3 className="share_icon" />
            <p className="reserve_top_container_text">15 - 17 November, 2024</p>
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
          <p className="total_price_number_text">₹28,500</p>
        </div>
        <div className="hurry_container">
          <p className="hurry_text">⌛ Only 4 spots left!</p>
        </div>
        <button
          className="reserve_btn"
          onClick={() => {
            window.open(
              "http://gosupersquad.com/noharika/pages-and-peaks/checkout",
              "_blank"
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
    const faqArr = [
      {
        id: "faq-0",
        question: "Will Noharika be on this retreat?",
        answer:
          "Yes, Noharika is the host of the retreat and she will accompany you on this retreat.",
        type: "ft-0",
      },
      {
        id: "faq-1",
        question: "What some must-carry items?",
        answer:
          "- Carry a book for the Book Exchange session.\n- Carry the books you want to read/complete.\n- Carry warm clothes.",
        type: "ft-0",
      },
      {
        id: "faq-2",
        question: "Is alcohol allowed?",
        answer:
          "Alcohol is allowed at the stay however you need to 'bring your own booze'. ",
        type: "ft-0",
      },
      {
        id: "faq-3",
        question: "Are pets allowed?",
        answer:
          "Yes, pets are allowed however there's a charge of INR 1200 per pet per day at the stay.",

        type: "ft-0",
      },
      {
        id: "faq-4",
        question: "What are the food options available?",
        answer:
          "Enjoy à la carte selection of freshly prepared vegetarian and non-vegetarian specialtiesacross a variety of cuisines along with local delicacies.",
        type: "ft-0",
      },
      {
        id: "faq-5",
        question: "What is the cancellation policy?",
        answer:
          "- Cancellation done between 0 to 20 days from travel date - No Refund\n- Cancellation done beyond 20 days from travel date - Full Refund",
        type: "ft-1",
      },

      {
        id: "faq-6",
        question: "Are flights included?",
        answer:
          "- No, flights & personal transportation cost till Delhi is not included. We are arranging a bus from Delhi to Kasauli on chargeable basis.",
        type: "ft-1",
      },
      {
        id: "faq-7",
        question: "Do I need to pay the entire amount while booking?",
        answer:
          "- You can book this retreat by paying just 50% of the price. Rest 50% needs to be paid before 20 days left the retreat.",
        type: "ft-1",
      },
      // {
      //   id: "faq-8",
      //   question: "What are the payment options available? ",
      //   answer:
      //     "-We use a trusted payment gateway to collect payments. You can use credit card, debit card, UPI, Netbanking, EMI or Wallet to pay for this retreat.",
      //   type: "ft-1",
      // },
    ];
    const handleSelectFaq = (id) => {
      if (selectedFaq == id) {
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
            handleSelectFaq(i.id);
          }}
        >
          <div className="faq_card_container">
            <div className="faq_card_top">
              <p className="faq_question">{i.question}</p>
              <ChevronDown
                style={{
                  cursor: "pointer",
                  WebkitTransform: selectedFaq == i.id ? "rotate(180deg)" : "",
                  transform: selectedFaq == i.id ? "rotate(180deg)" : "",
                }}
                className="share_icon"
              />
            </div>
            <div className={`faq-content ${selectedFaq == i.id ? "open" : ""}`}>
              {selectedFaq == i.id && (
                <p className="faq_answer" style={{ marginTop: 0 }}>
                  <TextWithMultiLine text={i.answer}></TextWithMultiLine>
                </p>
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
        {faqArr.filter((j) => j.type === activeFaqType).map((i) => faqCard(i))}
      </div>
    );
  };

  const stickyPay = () => {
    return (
      <div style={{ position: "sticky", bottom: 0, zIndex: 1000 }}>
        <div className="hurry_container">
          <p className="hurry_text">⌛ Only 4 spots left!</p>
        </div>
        <div className="sticky_pay_container">
          <div className="sticky_text_container">
            <div className="sticky_price">₹28,500</div>
            <div className="sticky_price_helper">Pay in parts</div>
          </div>
          <button
            className="reserve_button"
            onClick={() => {
              window.open(
                "http://gosupersquad.com/noharika/pages-and-peaks/checkout",
                "_blank"
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
              <p className="modal-left-head">Meet Noharika</p>
              <div
                className="insta_info"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/noharikagangaramany?igsh=bTJ6dDRibW52OTE0"
                  )
                }
              >
                <img src={Insta} alt="Insta" />
                <div className="insta_info_text">
                  <p className="insta_text">121k</p>
                  <p className="insta_subtext">Followers</p>
                </div>
              </div>
              <p className="modal-left-para">
                Hi I am Noharika, a passionate book lover and a lifestyle
                creator. I've built a tight-knit community of readers through
                Seedz Club, where literature meets vibrant conversation. Join me
                on a journey where creativity and books come together for an
                unforgettable experiences!
              </p>
            </div>
            <div className="modal-right">
              <img
                src={Host1}
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
            <p className="modal-left-head">Meet Noharika</p>
            <Cross1
              onClick={() => setShowModal(false)}
              style={{
                cursor: "pointer",
              }}
              className="share_icon"
              alt="Cross"
            />
          </div>
          <div
            className="insta_info"
            style={{ marginTop: 8 }}
            onClick={() =>
              window.open(
                "https://www.instagram.com/noharikagangaramany?igsh=bTJ6dDRibW52OTE0"
              )
            }
          >
            <img src={Insta} alt="Insta" />
            <div className="insta_info_text">
              <p className="insta_text">121k</p>
              <p className="insta_subtext">Followers</p>
            </div>
          </div>
          <p className="modal-left-para" style={{ marginTop: 12 }}>
            Hi I am Noharika, a passionate book lover and a lifestyle creator.
            I've built a tight-knit community of readers through Seedz Club,
            where literature meets vibrant conversation. Join me on a journey
            where creativity and books come together for an unforgettable
            experiences!
          </p>
          <img
            src={Host1}
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
        src={BookReader}
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
            <title>Noharika | Supersquad</title>
            <meta
              name="description"
              content="Book reader’s retreat with Noharika | Supersquad"
            />
            <meta property="og:site_name" content="Noharika | Supersquad" />
            <meta property="og:title" content="Noharika | Supersquad" />
            <meta
              property="og:description"
              content="Book reader’s retreat with Noharika | Supersquad"
            />
            <meta
              property="og:url"
              content="https://gosupersquad.com/noharika/pages-and-peaks"
            />
            <meta
              property="og:image"
              content="https://gosupersquad.com:5005/uploads/page-peak-1728658099927-657570239.jpg"
            />
            <meta property="og:image:width" content="200" />
            <meta property="og:image:height" content="200" />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:title" content="Noharika | Supersquad" />
            <meta
              name="twitter:domain"
              content="https://gosupersquad.com/noharika/pages-and-peaks"
            />
            <meta
              name="twitter:description"
              content="Book reader’s retreat with Noharika | Supersquad"
            />
            <meta
              name="twitter:image:src"
              content="https://gosupersquad.com:5005/uploads/page-peak-1728658099927-657570239.jpg"
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
                href="https://wa.me/918930700021?text=hi"
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
