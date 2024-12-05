import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Home.css";
import { faq, whys, reviews } from "./Helper";

import Adventure from "../resources/images/home/rocket-launch.svg";
import Fitness from "../resources/images/home/heart.svg";
import Yoga from "../resources/images/home/view-columns.svg";
import Sports from "../resources/images/home/globe-americas.svg";
import Wildlife from "../resources/images/home/puzzle-piece.svg";
import Food from "../resources/images/home/cake.svg";
import Chevron from "../resources/images/home/chevron-right.svg";
import Calender from "../resources/images/triphome/calendar 2.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import Down from "../resources/images/triphome/chevron-down.svg";
import Down1 from "../resources/images/home/down-1.svg";
import Home1 from "../resources/images/home/home_1.svg";
import Home2 from "../resources/images/home/home_2.svg";
import Home3 from "../resources/images/home/home_3.svg";
import Home4 from "../resources/images/home/home_4.svg";
import Map from "../resources/images/home/map1.svg";
import Cal from "../resources/images/home/calendar.svg";
import Clock from "../resources/images/home/clock.svg";

import Footer from "./Footer/Footer";
import axios from "axios";
import { url } from "../helper";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("Adventure");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [selectedFaq, setSelectedFaq] = useState();
  const [allTrips, setAllTrips] = useState([]);
  useEffect(() => {
    axios
      .get(url + "v1/trip/get_published_trips")
      .then((res) => {
        setAllTrips(res.data.trips);
      })
      .catch((err) => console.log(err));
  }, []);
  const topDiv = () => {
    return (
      <div
        style={{
          padding: isMobile ? "24px 0px" : "120px 0px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          position: "relative",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        {isMobile && (
          <>
            <div style={{ position: "absolute" }} className="back_div_1" />
            <div style={{ position: "absolute" }} className="back_div_2" />
            <div style={{ position: "absolute" }} className="back_div_3" />
            <div style={{ position: "absolute" }} className="back_div_4" />
          </>
        )}
        {!isMobile && (
          <>
            <div style={{ position: "absolute" }} className="web_back_div_1" />
            <div style={{ position: "absolute" }} className="web_back_div_2" />
            <div style={{ position: "absolute" }} className="web_back_div_3" />
            <div style={{ position: "absolute" }} className="web_back_div_4" />
          </>
        )}
        <div
          style={{
            width: isMobile ? "unset" : "calc(100vw - 960px)",
            zIndex: 10,
          }}
        >
          <p style={{ marginBottom: 8 }} className="home_top_div_text">
          Iconic Trips by Iconic People
          </p>
          <p className="home_top_div_text_secondary">
          Find your tribe through unique experiences hosted by inspiring creators.
          </p>
          <button className="explore_button" style={{ marginTop: 24 }}>
            Explore trips
          </button>
        </div>
        <div style={{ flex: 1, zIndex: 10 }}>
          <div
            style={{
              display: "flex",
              position: "relative",
              height: isMobile ? 218 : 250,
            }}
          >
            <img
              src={Home1}
              style={{
                position: "absolute",
                width: isMobile ? 230 : "auto",
                left: isMobile ? -40 : "unset",
              }}
            />
            <img
              src={Home2}
              style={{
                position: "absolute",
                left: isMobile ? 135 : 294,
                top: 46,
                zIndex: 2,
                width: isMobile ? 230 : "auto",
              }}
            />
          </div>
          <div
            style={{
              display: "flex",
              position: "relative",
              height: isMobile ? 218 : 250,
            }}
          >
            <img
              src={Home3}
              style={{
                position: "absolute",
                left: isMobile ? -24 : 111,
                top: -16,
                width: isMobile ? 215 : "auto",
              }}
            />
            <img
              src={Home4}
              style={{
                position: "absolute",
                left: isMobile ? 150 : 505,
                top: -30,
                zIndex: isMobile ? 1 : 3,
                width: isMobile ? 230 : "auto",
              }}
            />
          </div>
        </div>
      </div>
    );
  };

  const tripCard = (i) => {
    const startDate = new Date(i.start_date);
    const endDate = new Date(i.end_date);
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
        key={i._id}
        style={{
          cursor: "pointer",
          minWidth: isMobile ? "100%" : 384,
          maxWidth: "384px",
          minHeight: 550,
          borderRadius: 24,
          backgroundImage: `url(${i.card_img?.replace('http://localhost:5005', 'https://gosupersquad.com:5005')})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
        }}
        onClick={() => {
          window.open("itinerary/" + i.slug);
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            padding: 16,
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: "fit-content",
              height: "fit-content",
              display: "flex",
              gap: 4,
              alignItems: "center",
              padding: "4px 12px 4px 8px",
              borderRadius: 20,
              backgroundColor: "var(--Light-Light-50, #FFF)",
            }}
          >
            <img src={Map} />
            <p className="trip_card_p_1">{i.tags[0]}</p>
          </div>
          <div
            style={{
              width: "fit-content",
              height: "fit-content",
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
              borderRadius: 100,
              backgroundColor: "rgba(30, 133, 114, 0.60)",
            }}
          >
            <p className="trip_card_p_2" style={{ textWrap: "nowrap" }}>
              {" "}
              {i?.home_tag}
            </p>
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <p className="trip_card_p_3">{i.title}</p>
          <div
            style={{
              marginTop: 8,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: "fit-content",
                height: "fit-content",
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "8px 16px",
                borderRadius: 100,
                backgroundColor: "rgba(240, 240, 240, 0.30)",
              }}
            >
              <img
                src={i.host_profile_pic.replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 100,
                  objectFit: "cover",
                }}
              />
              <p className="trip_card_p_4">{i.host_name}</p>
            </div>
            <p className="trip_card_p_4">{i.location}</p>
          </div>
          <div
            style={{
              margin: "16px 0px",
              background: "#C2C2C2",
              height: "1px",
            }}
          />
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <img src={Cal} />
            <p className="trip_card_p_5">
              {startDate.getDate() +
                " - " +
                endDate.getDate() +
                " " +
                months[endDate.getMonth()] +
                ", " +
                endDate.getFullYear()}
            </p>
            <div
              style={{
                height: 8,
                width: 8,
                borderRadius: 12,
                margin: "0px 4px",
                background: "#FFF",
                boxShadow: "0px 1px 0px 0px #000",
              }}
            />
            <img src={Clock} />
            <p className="trip_card_p_5">
              {Math.ceil((endDate - startDate) / (1000 * 24 * 3600))} days
            </p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 8,
              gap: 8,
            }}
          >
            <p className="trip_card_p_7">
              {i.currency == "USD" ? "$ " : "₹ "}
              {i.price}
            </p>
            <p className="trip_card_p_6">(incl. taxes)</p>
          </div>
        </div>
      </div>
    );
  };

  const catrgories = () => {
    const catrgoriesCards = [
      {
        id: "cat-0",
        text: "Adventure",
        icon: Adventure,
      },
      {
        id: "cat-1",
        text: "Fitness",
        icon: Fitness,
      },
      {
        id: "cat-2",
        text: "Yoga",
        icon: Yoga,
      },
      {
        id: "cat-3",
        text: "Sports",
        icon: Sports,
      },
      {
        id: "cat-4",
        text: "Wildlife",
        icon: Wildlife,
      },
      {
        id: "cat-5",
        text: "Food",
        icon: Food,
      },
    ];

    const catrgoriesCardUI = (i) => {
      return (
        <div
          style={{
            borderRadius: selectedCategory == i.text ? 24 : 0,
            background: selectedCategory == i.text ? "#FFF" : "",
            marginTop: 16,
            boxShadow:
              selectedCategory == i.text
                ? "0px 2px 8px 0px rgba(0, 0, 0, 0.08)"
                : "",
            cursor: "pointer",
            padding: "24px",
          }}
          key={i.id}
        >
          <div
            key={i.id}
            onClick={() => {
              if (selectedCategory == i.text) {
                setSelectedCategory();
                return;
              }
              setSelectedCategory(i.text);
            }}
            style={{
              display: "flex",

              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
            }}
          >
            <img src={i.icon.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
            <p style={{ flex: 1 }} className="category_text">
              {i.text}
            </p>
            <img
              src={isMobile ? Down1 : Chevron}
              style={{
                WebkitTransform:
                  isMobile && selectedCategory == i.text
                    ? "rotateX(180deg)"
                    : "none",
                transform:
                  isMobile && selectedCategory == i.text
                    ? "rotateX(180deg)"
                    : "none",
              }}
            />
          </div>
          {isMobile && selectedCategory == i.text && (
            <div style={{ marginTop: 32 }}>
              {allTrips
                .filter((k) => k.tags.includes(selectedCategory))
                .map((i) => (
                  <div style={{ marginTop: 16 }}>{tripCard(i)}</div>
                ))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        style={{
          padding: isMobile ? "24px 0px" : "64px 0px",
          zIndex: 10,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div style={{ flex: isMobile ? "" : 1 }}>
            <p className="header_text">Explore all our categories</p>
            <div style={{ marginTop: 16 }}>
              {catrgoriesCards.map((i) => catrgoriesCardUI(i))}
            </div>
          </div>
          {!isMobile && (
            <div
              style={{
                flex: isMobile ? "" : 1,
                display: "flex",
                gap: 24,
                overflow: "auto",
              }}
            >
              {allTrips
                .filter((k) => k.tags.includes(selectedCategory))
                .map((i) => tripCard(i))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const upcomingTrips = () => {
    return (
      <div style={{ padding: isMobile ? "24px 0px" : "64px 0px" }}>
        <p className="header_text">Upcoming trips</p>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            gap: 24,
            overflow: "auto",
            marginTop: isMobile ? 24 : 32,
          }}
        >
          {allTrips.map((i) => tripCard(i))}
        </div>
      </div>
    );
  };

  const whySuperSquad = () => {
    const whyCard = (i) => {
      return (
        <div key={i.id}>
          <img src={Calender} style={{ width: 48, height: 48 }} />
          <p className="why_header" style={{ marginTop: 8 }}>
            {i.header}
          </p>
          <p className="why_description" style={{ marginTop: 4 }}>
            {i.description}
          </p>
        </div>
      );
    };
    return (
      <div style={{ padding: isMobile ? "24px 0px" : "64px 0px" }}>
        <p className="header_text">Why Supersquad</p>
        <div
          style={{
            marginTop: isMobile ? 24 : 32,
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          {whys.map((i) => whyCard(i))}
        </div>
      </div>
    );
  };

  const customerReviews = () => {
    const reviewCard = (i) => {
      return (
        <div className="review_card_wrapper" key={i.id}>
          {!isMobile && (
            <img
              src={i.image.replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
              style={{ borderRadius: "24px 24px 0px 0px", width: "100%" }}
            />
          )}
          <div style={{ padding: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <img src={i.profile_pic.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
              <p className="why_header">{i.name}</p>
            </div>
            <p className="why_decription" style={{ marginTop: 8 }}>
              {i.review}
            </p>
          </div>
        </div>
      );
    };

    return (
      <div style={{ padding: isMobile ? "24px 0px" : "64px 0px" }}>
        <p className="header_text">Customer reviews</p>
        <div
          style={{
            marginTop: isMobile ? 24 : 32,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {reviews.map((i) => reviewCard(i))}
        </div>
      </div>
    );
  };

  const workedWith = () => {
    const logos = [
      {
        id: "logo-0",
        image: (
          <div className="logo_div">
            <p className="logo_text">LOGO</p>
          </div>
        ),
      },
      {
        id: "logo-1",
        image: (
          <div className="logo_div">
            <p className="logo_text">LOGO</p>
          </div>
        ),
      },
      {
        id: "logo-2",
        image: (
          <div className="logo_div">
            <p className="logo_text">LOGO</p>
          </div>
        ),
      },
      {
        id: "logo-3",
        image: (
          <div className="logo_div">
            <p className="logo_text">LOGO</p>
          </div>
        ),
      },
      {
        id: "logo-4",
        image: (
          <div className="logo_div">
            <p className="logo_text">LOGO</p>
          </div>
        ),
      },
    ];
    const logosCard = (i) => {
      return (
        <div key={i.id} style={{ width: isMobile ? "100%" : "auto" }}>
          {i.image}
        </div>
      );
    };
    return (
      <div style={{ padding: isMobile ? "24px 0px" : "64px 0px" }}>
        <p className="header_text">Who we have worked with</p>
        <div
          style={{
            marginTop: isMobile ? 24 : 32,
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          {logos.map((i) => logosCard(i))}
        </div>
      </div>
    );
  };

  const faqs = () => {
    const faqCard = (i, index) => {
      return (
        <div
          key={i.id}
          style={{
            background: "var(--White-Color, #FFF)",
            boxShadow: "0px 2px 24px 1px rgba(102, 102, 102, 0.10)",
            marginTop: 16,
            padding: 24,
            borderRadius: 24,
            cursor: "pointer",
          }}
          onClick={() => {
            if (selectedFaq == i.id) {
              setSelectedFaq();
              return;
            }
            setSelectedFaq(i.id);
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
              src={Down}
              style={{
                cursor: "pointer",
                WebkitTransform:
                  selectedFaq == i.id ? "rotateX(180deg)" : "none",
                transform: selectedFaq == i.id ? "rotateX(180deg)" : "none",
              }}
            />
          </div>
          {selectedFaq == i.id && (
            <p className="answer_text" style={{ marginTop: 24 }}>
              {i.answer}
            </p>
          )}
        </div>
      );
    };

    return (
      <div style={{ padding: isMobile ? "32px 0px" : "64px 0px" }}>
        <p className="header_text">You might be having some questions...</p>
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: 32,
            gap: 8,
          }}
        >
          <button
            className={
              faqType == 0 ? "amenities_button_selected" : "amenities_button"
            }
            onClick={() => setFaqType(0)}
          >
            Experience
          </button>
          <button
            className={
              faqType == 1 ? "amenities_button_selected" : "amenities_button"
            }
            onClick={() => setFaqType(1)}
          >
            Location
          </button>
          <button
            className={
              faqType == 2 ? "amenities_button_selected" : "amenities_button"
            }
            onClick={() => setFaqType(2)}
          >
            General
          </button>
        </div> */}
        <div style={{ marginTop: 16 }}>
          {faq.map((i, index) => faqCard(i, index))}
        </div>
      </div>
    );
  };

  return (
    <div
      style={{ overflowX: isMobile ? "hidden" : "auto", position: "relative" }}
    >
      <div style={{ padding: isMobile ? "0px 16px" : "0px 8.33%" }}>
        <Navbar />
        {topDiv()}
        {/* {catrgories()} */}
        {upcomingTrips()}
        {whySuperSquad()}
        {customerReviews()}
        {/* {workedWith()} */}
        {faqs()}
      </div>
      <Footer />
    </div>
  );
}
