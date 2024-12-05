import React, { useEffect, useState } from "react";
import LogoDark from "../../resources/images/trip_page/LogoDark.svg";
import { ReactComponent as ShareIcon } from "../../resources/images/trip_page/share-icon.svg";
import TextWithMultiLine from "../TextWithMultiLine";
import "./TripPage.css";
import Host1 from "../../resources/images/trip_page/temp2/creator.jpg";
import Acc1 from "../../resources/images/trip_page/temp2/acc1.jpg";
import Acc2 from "../../resources/images/trip_page/temp2/acc2.jpg";
import Acc3 from "../../resources/images/trip_page/temp2/acc3.jpg";
import Acc4 from "../../resources/images/trip_page/temp2/acc4.jpg";
import Acc5 from "../../resources/images/trip_page/temp2/acc5.jpg";
import Acc6 from "../../resources/images/trip_page/temp2/acc6.jpg";
import Acc7 from "../../resources/images/trip_page/temp2/acc7.jpg";
import Acc8 from "../../resources/images/trip_page/temp2/acc8.jpg";
import Acc9 from "../../resources/images/trip_page/temp2/acc9.jpg";
import Acc10 from "../../resources/images/trip_page/temp2/acc10.jpg";

import Ac1 from "../../resources/images/trip_page/temp2/ac1.webp";
import Ac2 from "../../resources/images/trip_page/temp2/ac2.jpg";
import DAc1 from "../../resources/images/trip_page/temp2/dac1.jpeg";
import DAc2 from "../../resources/images/trip_page/temp2/dac2.webp";
import DAc3 from "../../resources/images/trip_page/temp2/dac3.jpg";
import EAc1 from "../../resources/images/trip_page/temp2/eac1.jpeg";
import EAc2 from "../../resources/images/trip_page/temp2/eac2.jpg";
import BookReader from "../../resources/images/trip_page/temp/purrfect-logo.png";
import Modal from "@mui/material/Modal";

import Spot1 from "../../resources/images/trip_page/temp2/spot1.webp";
import Spot2 from "../../resources/images/trip_page/temp2/spot2.jpg";
import Spot3 from "../../resources/images/trip_page/temp2/spot3.jpg";
import Spot4 from "../../resources/images/trip_page/temp2/spot4.jpg";
import Spot5 from "../../resources/images/trip_page/temp2/spot-5.jpg";
// import Insta from "../../resources/images/trip_page/insta.svg";
import H1 from "../../resources/images/trip_page/temp2/h1.jpg";
import H2 from "../../resources/images/trip_page/temp2/h2.jpg";
import H3 from "../../resources/images/trip_page/temp2/h3.jpg";
import H4 from "../../resources/images/trip_page/temp2/h4.avif";

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
import { ReactComponent as Activity1 } from "../../resources/images/trip_page/activity.svg";

import { ReactComponent as Reserve1 } from "../../resources/images/trip_page/r1.svg";
import { ReactComponent as Reserve2 } from "../../resources/images/trip_page/r2.svg";
import { ReactComponent as Reserve3 } from "../../resources/images/trip_page/r3.svg";
import { ReactComponent as UpArrowIt } from "../../resources/images/trip_page/uparraowit.svg";
import { ReactComponent as Whatsapp } from "../../resources/images/trip_page/whatsapp.svg";
import { Drawer } from "@mui/material";

import ImageCarousel from "./ImageCarousel";
import useMediaQuery from "@mui/material/useMediaQuery";
import Snackbar from "@mui/material/Snackbar";
import { updateMetaTags } from "../Helper";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function TripPage() {
  const navigate = useNavigate();
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
          <p className="t_head_1">
            Manali Weekend Escape with Manmeet, Parneet & Karan
          </p>
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
        {/* {logo()} */}
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
              Travel with Manmeet, Parneet, and Karan
            </p>
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
            {insideDiv(Location, "Location", "Manali")}
          </div>
          <div className="trip_info_container">
            {insideDiv(Date, "Dates", "8th - 10th November, 2024")}
          </div>
          <div className="trip_info_container">
            {insideDiv(GroupSize, "Group size", "16")}
          </div>
          <div className="trip_info_container">
            {insideDiv(Meals1, "Meals", "2 Breakfast, 2 Lunch & 2 Dinner")}
          </div>
        </div>
        <p
          style={{ marginTop: isMobile ? 20 : 32 }}
          className="host_description"
        ></p>
      </div>
    );
  };

  const spotLightEvents = () => {
    const s_arr = [
      {
        id: "s-01",
        text: "ATV Riding in Solang Valley",
        img: [Spot1],
      },
      {
        id: "s-02",
        text: "Picnic in Mountains",
        img: [Spot2],
      },
      {
        id: "s-03",
        text: "Bonfire",
        img: [Spot3],
      },
      {
        id: "s-04",
        text: "Sissu Day Tour",
        img: [Spot5],
      },
    ];
    const card = (i) => {
      return (
        <div className="spot_card_container_div" key={i.id}>
          <ImageCarousel
            images={[...i.img]}
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
        title: "Arrival and Social Kick-off",
        date: "8th Nov: Day 1 (Fri)",
        details: [
          {
            icon: Transport,
            title: "Transportation",
            description:
              "We will leave from a common meeting point in Delhi. We will leave for Manali there via AC traveller. \n Round trip transportation is included in the trip price.",
            imgType: "svg",
          },
          {
            icon: Activity1,
            title: "Stay",
            description:
              "Check-in to A Boutique Villa nestled in mountains of Manali.",
            imgArr: [
              { img: [Acc1] },
              { img: [Acc2] },
              { img: [Acc3] },
              { img: [Acc4] },
            ],
            imgType: "svg",
          },
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description: "Welcome lunch \n'Flavors of Manali' Dinner.",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [Ac1],
                title:
                  "Head out for a Cafe-hopping tour in Old Manali, and explore unique local brews and delicacies",
              },
              {
                img: [Ac2],
                title:
                  "Cozy late-night bonfire at the villa—share stories, play games, enjoy music, and roast marshmallows",
              },
            ],
          },
        ],
      },
      {
        id: "itn-1",
        title: "Adventure Day",
        date: "9th Nov: Day 2 (Sat)",
        details: [
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description:
              "Breakfast at the villa \n Picnic lunch with views of the Solang Valley \n Dinner at the villa",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [DAc1],
                title: "Drive to Solang Valley",
              },
              {
                img: [DAc2],
                title: "ATV riding experience through scenic mountain trails",
              },
              {
                img: [DAc3],
                title:
                  "Head to Sissu Valley via Atal Tunnel; enjoy scenic views of the Himalayas on the way ",
              },
              // {
              //   img: [DAc3],
              //   title: `"Manali Vice" themed party night \n Bar-hopping tour hitting the best pubs in Manali`,
              // },
            ],
          },
          // {
          //   icon: Activity1,
          //   title: "Activities",
          //   imgType: "svg",
          //   description: "Free hours to explore cafes or relax at the villa.",
          // },
        ],
      },
      {
        id: "itn-2",
        title: "Hadimba Temple and Mall Road",
        date: "10th Nov: Day 3 (Sun)",
        details: [
          {
            icon: Meals1,
            title: "Meals",
            imgType: "svg",
            description:
              "Breakfast at the villa \n Check-out and leave for Delhi",
          },
          {
            icon: Activity1,
            title: "Activities",
            imgType: "svg",
            imgArr: [
              {
                img: [EAc1],
                title: "Visit Hadimba Temple",
              },
              {
                img: [EAc2],
                title: "Visit Mall Road for last-minute shopping",
              },
            ],
          },
          //   {
          //     icon: Transport,
          //     title: "Travel to Delhi",
          //     description:
          //       "We leave Kasauli for Delhi by evening via 15-seater bus.",
          //     imgType: "svg",
          //   },
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
                <TextWithMultiLine text={k.title}></TextWithMultiLine>
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
                {Number(i.id[4]) + 8}
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
          {/* <div className={`faq-content ${selectedIt == i.id ? "open" : ""}`}> */}
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
            <p style={{ color: "#000" }}>8th - 10th Nov</p>
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
      // {
      //   id: "amb-2",
      //   text: "Add-ons",
      // },
    ];
    const amArr = [
      {
        id: "am-1",
        title: "Accomodation",
        text: "3 Days & 2 Nights on double sharing basis.",
        icon: <Building className="share_icon" />,
        type: "amb-0",
      },
      {
        id: "am-2",
        title: "Meals",
        text: "2 Breakfast, 2 Lunch & 2 Dinner Included",
        icon: <Meals1 className="share_icon" />,
        type: "amb-0",
      },
      {
        id: "am-3",
        title: "Transportation",
        text: "Transportation from Delhi-Manali and Manali-Delhi",
        icon: <Transport className="share_icon" />,
        type: "amb-0",
      },
      // {
      //   id: "am-5",
      //   title: "Lunch",
      //   text: "Lunch is excluded. Lunch is available at the resort on paid basis.",
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
        // title: "Lunch outdoor",
        text: "Lunch outdoor",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },
      {
        id: "am-01",
        // title: "Lunch outdoor",
        text: "F&B: Café Hopping and Bar",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },
      {
        id: "am-02",
        // title: "Lunch outdoor",
        text: "Fuel charges if coming by private vehicle",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },
      {
        id: "am-03",
        // title: "Lunch outdoor",
        text: "Alcohol expenses are excluded.",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },
      {
        id: "am-04",
        // title: "Lunch outdoor",
        text: "Personal expenses including entrance charges, cab expenses during leisure time etc",
        // icon: <Others className="share_icon" />,
        type: "amb-1",
      },

      //   {
      //     id: "am-9",
      //     title: "Private Room",
      //     text: "Private Room Upgrade",
      //     icon: <Building className="share_icon" />,
      //     type: "amb-2",
      //   },
      //   {
      //     id: "am-10",
      //     title: "Transportation",
      //     text: "Transportation To & From Delhi-Sariska Tiger Reserve",
      //     icon: <Transport className="share_icon" />,
      //     type: "amb-2",
      //   },
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
    ];
    const roomArr = [
      {
        id: "ro-0",
        img: accImg,
        title: "A Boutique Villa nestled in mountains of Manali",
        text: "Double Sharing",
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
              objectFit: "cover",
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
            <p className="reserve_top_container_text">Manali</p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve2 className="share_icon" />
            <p className="reserve_top_container_text">2 Nights, 3 Days</p>
          </div>
          <div className="reserver_top_subcontainer">
            <Reserve3 className="share_icon" />
            <p className="reserve_top_container_text">8 - 10 November, 2024</p>
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
          <p className="total_price_number_text">₹18,700</p>
        </div>
        <div className="hurry_container">
          {/* <p className="hurry_text">⌛ Only 15 spots left!</p> */}
          <p className="hurry_text">⌛ Only 15 spots available!</p>
        </div>
        <button
          className="reserve_btn"
          onClick={() => {
            window.open(
              "https://gosupersquad.com/manali-with-manmeet-parneet-karan/checkout",
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
        question: "Will Manmeet, Parneet, and Karan be on this trip?",
        answer:
          "Yes, Manmeet, Parneet, and Karan will personally host and accompany you throughout the trip.",
        type: "ft-0",
      },
      {
        id: "faq-100",
        question: "What are some must-carry items?",
        answer:
          "Pack warm clothes for the chilly mountain evenings.\nComfortable shoes for exploring the local spots.",
        type: "ft-0",
      },
      // {
      //   id: "faq-1",
      //   question: "Is alcohol allowed?",
      //   answer: "Yes, alcohol is allowed, but you need to bring your own.",
      //   type: "ft-0",
      // },
      {
        id: "faq-2",
        question: "What are the food options available?",
        answer:
          "Enjoy a selection of freshly prepared vegetarian and non-vegetarian meals, featuring local cuisine and popular dishes.",
        type: "ft-0",
      },
      {
        id: "faq-3",
        question: "Is Wi-Fi available?",
        answer:
          "Yes, complimentary Wi-Fi is available, though signal strength may vary in the mountains.",

        type: "ft-0",
      },

      // {
      //   id: "faq-5",
      //   question: "Are flights included?",
      //   answer:
      //     "No, flights and personal transportation to Manali are not included. You’ll need to arrange your own travel to the meeting point.",
      //   type: "ft-1",
      // },
      {
        id: "faq-7",
        question: "Do I need to pay the entire amount when booking?",
        answer:
          "You can secure your spot by paying 50% of the total price at the time of booking. The remaining 50% is due 20 days before the retreat.",
        type: "ft-1",
      },
      // {
      //   id: "faq-9",
      //   question: "What are the payment options available?",
      //   answer:
      //     "We accept payments via credit cards, debit cards, UPI, net banking, EMI, and wallet payments through a trusted payment gateway.",
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
          <p className="hurry_text">⌛ Only 15 spots available!</p>
        </div>
        <div className="sticky_pay_container">
          <div className="sticky_text_container">
            <div className="sticky_price">₹18,700</div>
            <div className="sticky_price_helper">Pay in parts</div>
          </div>
          <button
            className="reserve_button"
            onClick={() => {
              window.open(
                "https://gosupersquad.com/manali-with-manmeet-parneet-karan/checkout",
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
              <p className="modal-left-head">
                Meet Manmeet, Parneet, and Karan
              </p>
              {/* <div
                className="insta_info"
                onClick={() =>
                  window.open(
                    "https://www.instagram.com/adt.saran?igsh=NmU1bXhmNWVyNGF0"
                  )
                }
              >
                <img src={Insta} alt="Insta" />
                <div className="insta_info_text">
                  <p className="insta_text">140k</p>
                  <p className="insta_subtext">Followers</p>
                </div>
              </div> */}
              <p className="modal-left-para">
                Hi, we are Manmeet, Parneet, and Karan—and we’re excited to
                bring you a fun adventure! We had a blast performing together on
                India’s Got Latent, with Karan and Manmeet as a duo and Parneet
                showcasing his rapping skills. Now, we’re eager to share these
                experiences with our audience and hang out with you, bringing
                the same passion and energy. Join us as we create unforgettable
                moments filled with laughter, exploration, and amazing
                experiences!
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
            <p className="modal-left-head">Meet Manmeet, Parneet, and Karan</p>
            <Cross1
              onClick={() => setShowModal(false)}
              style={{
                cursor: "pointer",
              }}
              className="share_icon"
              alt="Cross"
            />
          </div>
          {/* <div
            className="insta_info"
            style={{ marginTop: 8 }}
            onClick={() =>
              window.open(
                "https://www.instagram.com/adt.saran?igsh=NmU1bXhmNWVyNGF0"
              )
            }
          >
            <img src={Insta} alt="Insta" />
            <div className="insta_info_text">
              <p className="insta_text">140k</p>
              <p className="insta_subtext">Followers</p>
            </div>
          </div> */}
          <p className="modal-left-para" style={{ marginTop: 12 }}>
            Hi, we are Manmeet, Parneet, and Karan—and we’re excited to bring
            you a fun adventure! We had a blast performing together on India’s
            Got Latent, with Karan and Manmeet as a duo and Parneet showcasing
            his rapping skills. Now, we’re eager to share these experiences with
            our audience and hang out with you, bringing the same passion and
            energy. Join us as we create unforgettable moments filled with
            laughter, exploration, and amazing experiences!
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
          <Helmet>
            <title>Manali Weekend Escape | Supersquad</title>
          </Helmet>
          {navbar()}
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
