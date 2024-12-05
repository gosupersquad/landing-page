import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import "./HomeCreator.css";
import TravelWith from "../../resources/images/home_creator/image.webp";
import Type1 from "../../resources/images/home_creator/type_1.webp";
import Type2 from "../../resources/images/home_creator/type_2.webp";
import Type3 from "../../resources/images/home_creator/type_3.webp";
import Ell from "../../resources/images/home_creator/ell.svg";
import F1 from "../../resources/images/home_creator/fe1.webp";
import F2 from "../../resources/images/home_creator/fe2.webp";
// import F3 from "../../resources/images/home_creator/fe2.png";
import F3 from "../../resources/images/home_creator/fe3.png";
import F4 from "../../resources/images/home_creator/fe4.webp";
import F5 from "../../resources/images/home_creator/fe5.webp";
import TopImg1 from "../../resources/images/home_creator/top_web1.webp";
import MobTop from "../../resources/images/home_creator/back_mob.png";
import Call from "../../resources/images/home_creator/call.png";
import Survey from "../../resources/images/home_creator/survey.png";
import Itinerary from "../../resources/images/home_creator/itinerary.png";
import Travel from "../../resources/images/home_creator/Travel.png";
import Promote from "../../resources/images/home_creator/promote.png";
import Money from "../../resources/images/home_creator/money.png";
import World from "../../resources/images/home_creator/see-the-world.png";
import MakeMoney from "../../resources/images/home_creator/make-money.png";
import MeetPeople from "../../resources/images/home_creator/meet-people.png";
import Adventure from "../../resources/images/home_creator/adventure.jpg";

import Cross from "../../resources/images/home_creator/cross.svg";
import Star from "../../resources/images/home_creator/star.svg";
import Footer from "./Footer";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function HomeCreator() {
  const [selectedFaq, setSelectedFaq] = useState("faq--1");
  const isMobile = useMediaQuery("(max-width:600px)");
  const scrollContainerRef = useRef(null);

  const ref = useRef();
  const checkIfInView = () => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const isFullyInView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth);
      return isFullyInView;
    }
    return false;
  };

  // useEffect(() => {
  //   const refs = ref.current;
  //   const scrollContainer = scrollContainerRef.current;
  //   const hori = document.getElementById("horizontal-wrapper");
  //   const handleWheel = (event) => {
  //     if (scrollContainer) {
  //       if (!checkIfInView()) {
  //         return;
  //       }
  //       if (
  //         (scrollContainer.scrollLeft >= 865 && event.deltaY >= 0) ||
  //         (scrollContainer.scrollLeft <= 0 && event.deltaY < 0)
  //       ) {
  //         // hori.classList.remove("sticky");
  //         return;
  //       }
  //       scrollContainer.scrollLeft += event.deltaY;
  //       event.preventDefault(); // Prevent the default vertical scroll behavior
  //     }
  //   };

  //   refs.addEventListener("wheel", handleWheel, { passive: false });

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     refs.removeEventListener("wheel", handleWheel);
  //   };
  // }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const targetDiv = ref.current;
  //     if (targetDiv) {
  //       const targetPosition = targetDiv.getBoundingClientRect().top;
  //       const scrollTop =
  //         window.pageYOffset || document.documentElement.scrollTop;

  //       // Check if the user has scrolled past the div
  //       if (targetPosition < 0) {
  //         // Stop the scroll and scroll back to the div
  //         window.scrollTo({
  //           top: scrollTop + targetPosition,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const topSection = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          overflow: "hidden",
          flexWrap: isMobile ? "wrap" : "nowrap",
        }}
      >
        <div>
          <p className="top_section_p">
            Host Iconic Experiences For Your Community
          </p>
          <p
            className="top_section_secondary"
            style={{ margin: isMobile ? "14px 0px 0px" : "27px 0px" }}
          >
            Creators use Supersquad to launch curated experiences and unlock a
            new income stream.
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* {isMobile && <img src={MobTop} style={{}} />} */}
          </div>
          <div
            style={{
              display: isMobile ? "flex" : "",
              justifyContent: "center",
              marginTop: isMobile ? 36 : 0,
            }}
          >
            <button
              data-cal-namespace=""
              data-cal-link="supersquad/30min"
              data-cal-config='{"layout":"month_view"}'
              className="call_button"
            >
              {"Book a call ->"}
            </button>
          </div>
          <div
            style={{
              marginTop: isMobile ? 39.5 : 37,
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 12 : 18,
              flexWrap: isMobile ? "wrap" : "nowrap",
              marginLeft: isMobile ? "100px" : "",
              paddingBottom: isMobile ? "0px" : 29,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: isMobile ? "100%" : "",
              }}
            >
              <img src={MakeMoney} />
              <p className="travel_p">Make Money</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: isMobile ? "100%" : "",
              }}
            >
              <img src={MeetPeople} style={{ width: 32, height: 32 }} />
              <p className="travel_p">Meet People</p>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                width: isMobile ? "100%" : "",
                marginBottom: isMobile ? 20 : 0,
              }}
            >
              <img src={World} style={{ width: 32, height: 32 }} />
              <p className="travel_p">See the World</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const travelWith = () => {
    return (
      <div
        style={{
          marginTop: isMobile ? 114 : 220,
          backgroundImage: `url(${TravelWith})`,
          minHeight: "32.36vw",
          boxSizing: "border-box",
          borderRadius: 16,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ padding: isMobile ? "39px 14px 13px" : 70 }}>
          <p
            className="travel_with_p"
            style={{ width: "fit-content", fontSize: isMobile ? 28 : "" }}
          >
            Why do Community{" "}
            <span
              className="italic_head"
              style={{ fontSize: isMobile ? 28 : "" }}
            >
              Experiences
            </span>
            ?{/* <span className="italic_head">Earn Effortlessly</span> */}
          </p>
          <p
            className={isMobile ? "travel_with_p1" : "top_section_secondary"}
            style={{
              width: isMobile ? "100%" : 515,
              marginTop: isMobile ? 21 : 24,
              marginBottom: isMobile ? 17 : 32,
            }}
          >
            Your fans want more than content—they want experiences.
            <br />
            <br />
            Supersquad empowers you to build your own community experience brand
            that’s crafted around your personality and niche.
          </p>
          {/* <button
            data-cal-namespace=""
            data-cal-link="supersquad/30min"
            data-cal-config='{"layout":"month_view"}'
            className="how_it_btn"
            style={{ marginTop: 10 }}
          >
            {"Book a call ->"}
          </button> */}
        </div>
      </div>
    );
  };
  const howItWorks = () => {
    return (
      <div style={{ marginTop: isMobile ? 52 : 148, position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 40,
              height: "fit-content",
              width: isMobile ? "100%" : "",
            }}
          >
            <p
              className="how_it_works"
              style={{
                height: "fit-content",
                width: isMobile ? "100%" : "",
                textAlign: isMobile ? "center" : "",
              }}
            >
              <span style={{ color: "#FFFFFF" }}>How it</span>{" "}
              <span className="how_it_works_1">Works</span>
            </p>
            {!isMobile && (
              <button
                data-cal-namespace=""
                data-cal-link="supersquad/30min"
                data-cal-config='{"layout":"month_view"}'
                className="how_it_btn"
                style={{ marginTop: 23 }}
              >
                {"Book a call ->"}
              </button>
            )}
          </div>
          <div style={{ width: isMobile ? "100%" : "" }}>
            <div style={{ position: "sticky", top: !isMobile ? 40 : 125 }}>
              <div style={{ position: "relative", top: -83, zIndex: -1 }}>
                {grad1()}
              </div>
              <div
                className="stack_div"
                style={{ marginTop: isMobile ? 25 : 0, top: isMobile ? 0 : "" }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={Call}
                    style={{ height: 30, width: 30, marginRight: 20 }}
                  />
                  <p className="stack_p1">Onboarding Call </p>
                </div>
                {!isMobile && (
                  <p
                    className="stack_p2"
                    style={{ marginTop: isMobile ? 18 : 15 }}
                  >
                    We start with a quick chat to understand your vibe,
                    community, and the kind of experience you want to create.
                  </p>
                )}
              </div>
            </div>
            <div
              className="stack_div"
              style={{
                marginTop: isMobile ? 25 : 46,
                top: isMobile ? 134 : 50,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Survey}
                  style={{ height: 30, width: 30, marginRight: 20 }}
                />
                <p className="stack_p1">Survey Your Audience</p>
              </div>

              {!isMobile && (
                <p
                  className="stack_p2"
                  style={{ marginTop: isMobile ? 18 : 15 }}
                >
                  Get insights from your community to shape a trip that
                  everyone’s excited about.
                </p>
              )}
            </div>
            <div
              className="stack_div"
              style={{
                marginTop: isMobile ? 25 : 46,
                top: isMobile ? 144 : 60,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Itinerary}
                  style={{ height: 30, width: 30, marginRight: 20 }}
                />
                <p className="stack_p1">Plan Your Trip</p>
              </div>
              {!isMobile && (
                <p
                  className="stack_p2"
                  style={{ marginTop: isMobile ? 18 : 15 }}
                >
                  We’ll create a tailored itinerary that matches your style and
                  handle all the details, start to finish.
                </p>
              )}
            </div>
            <div
              className="stack_div"
              style={{
                marginTop: isMobile ? 25 : 46,
                top: isMobile ? 154 : 70,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Promote}
                  style={{ height: 30, width: 30, marginRight: 20 }}
                />
                <p className="stack_p1">Promote Your Trip</p>
              </div>
              {!isMobile && (
                <p
                  className="stack_p2"
                  style={{ marginTop: isMobile ? 18 : 15 }}
                >
                  Launch the trip to your followers—we’ll supply everything you
                  need to make it a success.
                </p>
              )}
            </div>
            <div
              className="stack_div"
              style={{
                marginTop: isMobile ? 25 : 46,
                top: isMobile ? 164 : 80,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Travel}
                  style={{ height: 30, width: 30, marginRight: 20 }}
                />
                <p className="stack_p1">Trip Takeoff</p>
              </div>
              {!isMobile && (
                <p
                  className="stack_p2"
                  style={{ marginTop: isMobile ? 18 : 15 }}
                >
                  Host an unforgettable trip for your superfans— we’ll handle
                  the rest.
                </p>
              )}
            </div>
            <div
              className="stack_div"
              style={{
                marginTop: isMobile ? 25 : 46,
                top: isMobile ? 164 : 80,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={Money}
                  style={{ height: 30, width: 30, marginRight: 20 }}
                />
                <p className="stack_p1">Cash In</p>
              </div>

              {!isMobile && (
                <p
                  className="stack_p2"
                  style={{ marginTop: isMobile ? 18 : 15 }}
                >
                  End your trip with a well deserved payout.
                </p>
              )}
            </div>
          </div>
        </div>
        {isMobile && (
          <div
            style={{
              display: isMobile ? "flex" : "",
              justifyContent: "center",
              marginTop: isMobile ? 26 : 0,
              zIndex: 10,
            }}
          >
            <button
              data-cal-namespace=""
              data-cal-link="supersquad/30min"
              data-cal-config='{"layout":"month_view"}'
              className="call_button"
              style={{ zIndex: 10 }}
            >
              {"Book a Call ->"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const types = () => {
    const typeArr = [
      {
        id: "type-0",
        img: Type1,
        text: "Luxury Experiences",
      },
      {
        id: "type-1",
        img: Type2,
        text: "Wellness Retreats",
      },
      {
        id: "type-2",
        img: Type3,
        text: "Cultural Explorations",
      },
      {
        id: "type-3",
        img: Adventure,
        text: "Adventure",
      },
    ];

    const typeCard = (i) => {
      return (
        <div
          style={{
            padding: 7,
            boxSizing: "border-box",
            border: "1px solid #3B6457",
            borderRadius: 8,
            display: "inline-block",
            marginRight: 25,
          }}
          key={i.id}
        >
          <img
            src={i.img}
            style={{
              width: isMobile ? "calc(100vw - 115px)" : 354,
              objectFit: "cover",
              height: isMobile ? 166 : 247,
            }}
          />
          <div
            style={{
              height: isMobile ? "auto" : 111,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "sticky",
            }}
          >
            <img src={Ell} style={{ position: "absolute", left: -8, top: 0 }} />
            <img
              src={Ell}
              style={{
                position: "absolute",
                right: -8,
                top: 0,
                transform: "rotate(180deg)",
              }}
            />
            <p className="type_p">{i.text}</p>
          </div>
        </div>
      );
    };
    const grad2 = () => {
      return <div className="grad2" />;
    };
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: isMobile ? 74 : 162,
          marginBottom: isMobile ? 74 : 205,
          flexDirection: "column",
          position: "sticky",
        }}
        id="horizontal-wrapper"
        ref={ref}
        className="sticky"
      >
        {grad2()}
        <p
          className="how_it_works"
          style={{
            width: isMobile ? "100%" : "",
            textAlign: isMobile ? "center" : "",
            lineHeight: "28px",
          }}
        >
          You imagine while we <span className="how_it_works_1">curate</span>
        </p>
        <p
          className={isMobile ? "secondary_mob_1" : "top_section_secondary"}
          style={{ marginTop: isMobile ? 8 : 16, textAlign: "center" }}
        >
          From city tours to island retreats, Supersquad lets you create any
          experience for your community in over 100 countries.
        </p>
        <div
          style={{
            marginTop: isMobile ? 41 : 74,
            // gap: isMobile ? 26 : 23,
            // display: "flex",
            // width: "100%",
            // overflow: "auto",
            // flexWrap: isMobile ? "wrap" : "",
            // justifyContent: isMobile ? "center" : "",
          }}
          className="scroll-container"
          ref={scrollContainerRef}
        >
          <div className="scroll-content">
            {typeArr.map((i) => typeCard(i))}
            {typeArr.map((i) => typeCard(i))}
          </div>
        </div>
      </div>
    );
  };

  const features = () => {
    const card1 = {
      primary: "",
      secondary: "",
    };
    const card2 = {
      primary: "",
      secondary: "",
    };
    const card3 = {
      primary: "",
      secondary: "",
    };
    const card4 = {
      primary: "",
      secondary: "",
    };
    const card5 = {
      primary: "",
      secondary: "",
    };
    const card6 = {
      primary: "",
      secondary: "",
    };
    return (
      <div
        style={{
          marginBottom: isMobile ? 74 : 276,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            position: isMobile ? "sticky" : "relative",
            top: isMobile ? "40px" : 0,
          }}
        >
          {grad3()}
          <p
            className={"how_it_works"}
            style={{
              color: "#FFF",
              maxWidth: 830,
              lineHeight: isMobile ? "28px" : "56px",
              letterSpacing: "-0.96px",
              textAlign: isMobile ? "center" : "center",
            }}
          >
            Super{" "}
            <span
              className="how_it_works_1"
              style={{ lineHeight: isMobile ? "28px" : "56px" }}
            >
              benefits
            </span>{" "}
            you get with supersquad!
          </p>
          <p
            className={isMobile ? "secondary_mob_1" : "top_section_secondary"}
            style={{
              marginTop: isMobile ? 14 : 23,
              maxWidth: 575,
              textAlign: "center",
            }}
          >
            Get all the tools, perks and support that makes hosting your
            experience a seamless experience.
          </p>
        </div>
        {!isMobile && (
          <>
            <div
              style={{
                display: "flex",
                gap: isMobile ? 32 : 8,
                marginTop: isMobile ? 34 : 67,
                flexWrap: isMobile ? "wrap" : "",
              }}
            >
              <div className="box box_1" style={{ position: "sticky" }}>
                <p className="features_p1">Booking Website</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 393 }}
                >
                  We help you create a personalized trip website designed for
                  conversions with multiple payment methods.
                </p>
                <img
                  src={F1}
                  style={{
                    aspectRatio: 548 / 255,
                    marginBottom: isMobile ? -3.5 : 9,
                    marginTop: isMobile ? 26 : 30,
                    maxWidth: "90%",
                    objectFit: isMobile ? "cover" : "",
                    objectPosition: "top",
                    height: isMobile ? 85 : "auto",
                    borderTopLeftRadius: isMobile ? 5 : "",
                    borderTopRightRadius: isMobile ? 5 : "",
                    width: isMobile ? "80%" : "auto",
                    marginLeft: isMobile ? 20 : "",
                    maxHeight: 254,
                  }}
                />
                <img
                  src={F2}
                  style={{
                    position: "absolute",
                    right: isMobile ? 20 : 27,
                    top: isMobile ? 121 : 68,
                    maxWidth: isMobile ? "100%" : "10.76vw",
                    width: isMobile ? "47px" : "auto",
                    height: isMobile ? "63px" : "auto",
                    borderRadius: isMobile ? 10 : 0,
                  }}
                />
              </div>
              <div
                className="box box_2"
                style={{
                  paddingRight: isMobile ? 16 : 0,
                  height: isMobile ? 244 : "auto",
                }}
              >
                <p className="features_p1">Instant Payouts</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 389 }}
                >
                  Money in your account faster than you can unpack your bags. No
                  long waits - get paid as soon as your trip ends.
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isMobile ? "center" : "",
                    // marginTop: 39,
                    // marginBottom: 32,
                  }}
                >
                  <img
                    src={F3}
                    style={{
                      maxWidth: "90%",
                      width: isMobile ? "100%" : "auto",
                      height: isMobile ? "111px" : "auto",
                      objectFit: isMobile ? "cover" : "",
                      objectPosition: "top",
                      marginTop: isMobile ? 49 : 64,
                    }}
                  />
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: isMobile ? 32 : 8,
                marginTop: isMobile ? 32 : 8,
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <div
                className="box box_3"
                style={{
                  paddingRight: isMobile ? 16 : 0,
                  height: isMobile ? 244 : "auto",
                }}
              >
                <p className="features_p1">Trusted Trip Leader</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 376.72 }}
                >
                  A local expert will join your trip, offering on-ground support
                  so you can focus on creating unforgettable experiences.
                </p>
                <img
                  src={F4}
                  style={{
                    marginTop: isMobile ? 15 : 45,
                    marginRight: isMobile ? 0 : 30,
                    maxWidth: "100%",
                    height: isMobile ? 116 : "auto",
                    width: isMobile ? "100%" : "95%",
                    objectFit: isMobile ? "cover" : "",
                    objectPosition: "top",
                  }}
                />
              </div>
              <div
                className="box box_4"
                style={{ height: isMobile ? 244 : "auto" }}
              >
                <p className="features_p1">All In One Dashboard</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 360 }}
                >
                  Manage bookings, earnings, guest lists, itineraries, and more
                  from one central hub.
                </p>
                <img
                  src={F5}
                  style={{
                    marginTop: isMobile ? 25 : 66,
                    marginLeft: isMobile ? -15 : -42,
                    maxWidth: "100%",
                    width: isMobile ? "100%" : "auto",
                    height: isMobile ? "84px" : "auto",
                    objectFit: isMobile ? "cover" : "",
                    objectPosition: isMobile ? "top" : "",
                    marginBottom: -3.5,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: isMobile ? 32 : 8,
                marginTop: isMobile ? 32 : 8,
                flexWrap: isMobile ? "wrap" : "nowrap",
              }}
            >
              <div className="box box_5">
                <p className="features_p1">Promotion Assistance</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 400 }}
                >
                  We’ll be by your side at every stage to ensure your trip is
                  successful - from creating viral reels to closing leads.
                </p>
              </div>
              <div
                className="box box_6"
                style={{ height: isMobile ? 223 : "auto" }}
              >
                <p className="features_p1">Account Manager</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 389 }}
                >
                  You’ll have a dedicated point of contact for all your trip
                  needs and queries.
                </p>
              </div>
            </div>
          </>
        )}
        {isMobile && (
          <>
            <div style={{ position: "sticky", top: 201 }}>
              <div style={{ position: "relative", top: 0 }}>{grad4()}</div>
              <div
                className="box box_1"
                style={{ position: "sticky", marginTop: 32, top: 0 }}
              >
                <p className="features_p1">Booking Website</p>
                <p
                  className="features_p2"
                  style={{ marginTop: isMobile ? 9 : 12, maxWidth: 393 }}
                >
                  We help you create a personalized trip website designed for
                  conversions with multiple payment methods.
                </p>
                <img
                  src={F1}
                  style={{
                    aspectRatio: 548 / 255,
                    marginBottom: isMobile ? -3.5 : 9,
                    marginTop: isMobile ? 26 : 30,
                    maxWidth: "90%",
                    objectFit: isMobile ? "cover" : "",
                    objectPosition: "top",
                    height: isMobile ? 85 : "auto",
                    borderTopLeftRadius: isMobile ? 5 : "",
                    borderTopRightRadius: isMobile ? 5 : "",
                    width: isMobile ? "80%" : "auto",
                    marginLeft: isMobile ? 20 : "",
                  }}
                />
                <img
                  src={F2}
                  style={{
                    position: "absolute",
                    right: isMobile ? 20 : 27,
                    top: isMobile ? 98 : 68,
                    maxWidth: isMobile ? "100%" : "10.76vw",
                    width: isMobile ? "47px" : "auto",
                    height: isMobile ? "63px" : "auto",
                    borderRadius: isMobile ? 10 : 0,
                  }}
                />
              </div>
            </div>
            <div
              className="box box_2"
              style={{
                paddingRight: isMobile ? 16 : 0,
                marginTop: 32,
                top: 210,
                height: isMobile ? 244 : "auto",
              }}
            >
              <p className="features_p1">Instant Payouts</p>
              <p
                className="features_p2"
                style={{ marginTop: isMobile ? 9 : 12, maxWidth: 389 }}
              >
                Money in your account faster than you can unpack your bags. No
                long waits - get paid as soon as your trip ends.
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  // marginTop: 39,
                  // marginBottom: 32,
                }}
              >
                <img
                  src={F3}
                  style={{
                    maxWidth: "100%",
                    width: isMobile ? "100%" : "auto",
                    height: isMobile ? "111px" : "auto",
                    objectFit: isMobile ? "cover" : "",
                    objectPosition: "top",
                    marginTop: 19,
                  }}
                />
              </div>
            </div>
            <div
              className="box box_3"
              style={{
                paddingRight: isMobile ? 16 : 0,
                marginTop: 32,
                height: 244,
                top: 220,
              }}
            >
              <p className="features_p1">Trusted Trip Leader</p>
              <p
                className="features_p2"
                style={{ marginTop: isMobile ? 9 : 12, maxWidth: 376.72 }}
              >
                A local expert will join your trip, offering on-ground support
                so you can focus on creating unforgettable experiences.
              </p>
              <img
                src={F4}
                style={{
                  marginTop: isMobile ? 15 : 35,
                  marginRight: isMobile ? 0 : 30,
                  maxWidth: "100%",
                  height: isMobile ? 116 : "auto",
                  width: isMobile ? "100%" : "auto",
                  objectFit: isMobile ? "cover" : "",
                  objectPosition: "top",
                }}
              />
            </div>
            <div
              className="box box_4"
              style={{ marginTop: 32, height: 244, top: 230 }}
            >
              <p className="features_p1">All In One Dashboard</p>
              <p
                className="features_p2"
                style={{ marginTop: isMobile ? 9 : 12, maxWidth: 360 }}
              >
                Manage bookings, earnings, guest lists, itineraries, and more
                from one central hub.
              </p>
              <img
                src={F5}
                style={{
                  marginTop: isMobile ? 47 : 12.89,
                  marginLeft: isMobile ? -15 : -42,
                  maxWidth: "100%",
                  width: isMobile ? "100%" : "auto",
                  height: isMobile ? "auto" : "auto",
                  objectFit: isMobile ? "cover" : "",
                  objectPosition: isMobile ? "top" : "",
                  marginBottom: -3.5,
                }}
              />
            </div>
            <div
              className="box box_5"
              style={{
                marginTop: 32,
                height: isMobile ? 244 : "auto",
                top: 240,
              }}
            >
              <p className="features_p1">Promotion Assistance</p>
              <p
                className="features_p2"
                style={{ marginTop: isMobile ? 9 : 12, maxWidth: 400 }}
              >
                We’ll be by your side at every stage to ensure your trip is
                successful - from creating viral reels to closing leads.
              </p>
            </div>
            <div></div>
            <div
              className="box box_6"
              style={{ marginTop: 32, top: 140, height: 244, top: 250 }}
            >
              <p className="features_p1">Account Manager</p>
              <p
                className="features_p2"
                style={{ marginTop: isMobile ? 9 : 12, maxWidth: 389 }}
              >
                You’ll have a dedicated point of contact for all your trip needs
                and queries.
              </p>
            </div>
          </>
        )}
        {/* {isMobile && (
          <div
            style={{
              display: isMobile ? "flex" : "",
              justifyContent: "center",
              marginTop: isMobile ? 26 : 0,
            }}
          >
            <button
              data-cal-namespace=""
              data-cal-link="supersquad/30min"
              data-cal-config='{"layout":"month_view"}'
              className="call_button"
            >
              {"Book a Call ->"}
            </button>
          </div>
        )} */}
      </div>
    );
  };

  const faqs = () => {
    const faqArr = [
      {
        id: "faq--1",
        question: "What is Supersquad?",
        answer:
          "Supersquad is a platform that helps creators like you host exclusive, unforgettable group trips for your community.",
      },
      {
        id: "faq-0",
        question: "How do I get started?",
        answer:
          "Just click on “Book a call” to schedule a call with us. We’ll walk you through everything you need to know and help you plan your first trip.",
      },
      {
        id: "faq-1",
        question: "Do I need to go on these trips?",
        answer:
          "Yes, the creators are the hero of the experience! The entire experience is centered around you hosting and engaging with your community.",
      },
      {
        id: "faq-2",
        question: "Do I need to be a travel expert to host a trip?",
        answer:
          "Not at all! You’re not a travel guide—you’re a creator. We take care of all the planning and logistics. Your role is to curate the experience and connect with your fans.",
      },
      {
        id: "faq-3",
        question: "How much can I earn?",
        answer:
          "Your earnings depend on factors like number of people on your trips, follower count and destination. Get on a Booking call with an account manager to understand how much you can make on your first trip.",
      },
      {
        id: "faq-4",
        question: "Is there a minimum follower requirement?",
        answer:
          "There’s no strict minimum, but the more engaged your audience, the better your trip is likely to perform.",
      },
      // {
      //   id: "faq-4.5",
      //   question: "What happens if the trip doesn’t fill up?",
      //   answer:
      //     "We’ll work with you to adjust and promote the trip further. Our goal is to ensure your trip is a success.",
      // },
      {
        id: "faq-5",
        question: "Will my travel be free?",
        answer:
          "Yes! Your accommodation, activities, food, local transportation and flights will all be added and covered within the trip price.",
      },
    ];

    const faqCard = (i) => {
      return (
        <div
          style={{
            padding: isMobile ? 16 : 24,
            borderRadius: 4,
            border: "1px solid rgba(255, 255, 255, 0.05)",
            background: "#0F1012",
            cursor: "pointer",
          }}
          onClick={() => {
            if (selectedFaq == i.id) {
              setSelectedFaq();
            } else {
              setSelectedFaq(i.id);
            }
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={Star} style={{ marginRight: 18 }} />
              <p className="question_p">{i.question}</p>
            </div>
            <img
              src={Cross}
              style={{ transform: selectedFaq == i.id ? "rotate(45deg)" : "" }}
            />
          </div>
          <div className={`faq-content ${selectedFaq == i.id ? "open" : ""}`}>
            {i.id == selectedFaq && (
              <p
                className="answer_p"
                style={{
                  marginTop: isMobile ? 0 : 22.2,
                  marginLeft: isMobile ? 20 : 0,
                }}
              >
                {i.answer}
              </p>
            )}
          </div>
        </div>
      );
    };
    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <div style={{ position: "relative" }}>{grad6()}</div>
          <p
            className={"how_it_works"}
            style={{
              color: "#FFF",
              maxWidth: 724,
              lineHeight: isMobile ? "28px" : "56px",
              letterSpacing: "-0.96px",
              textAlign: isMobile ? "center" : "center",
            }}
          >
            Any{" "}
            <span
              className="how_it_works_1"
              style={{ lineHeight: isMobile ? "28px" : "56px" }}
            >
              questions
            </span>{" "}
            about Supersquad?
          </p>
          {/* <p
            className={isMobile ? "secondary_mob_1" : "top_section_secondary"}
            style={{ marginTop: isMobile ? 14 : 23, maxWidth: 575 }}
          >
            We see room for innovation beyond the industry giants. If you need
            more insightful reports, enhanced telemetry, or better
          </p> */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              width: isMobile ? "100%" : 700,
              marginTop: isMobile ? 34 : 75,
            }}
          >
            {faqArr.map((i) => faqCard(i))}
          </div>
        </div>
        {isMobile && (
          <div
            style={{
              display: isMobile ? "flex" : "",
              justifyContent: "center",
              marginTop: isMobile ? 49 : 0,
            }}
          >
            <button
              data-cal-namespace=""
              data-cal-link="supersquad/30min"
              data-cal-config='{"layout":"month_view"}'
              className="call_button"
            >
              {"Book a Call ->"}
            </button>
          </div>
        )}
      </div>
    );
  };

  const circleGrad = () => {
    return <div className="circle"></div>;
  };

  const squareGrad = () => {
    return <div className="square" />;
  };

  const grad1 = () => {
    return isMobile ? <div className="grad1" /> : <div className="grad5" />;
  };

  const grad3 = () => {
    return <div className="grad3" />;
  };
  const grad4 = () => {
    return <div className="grad4" />;
  };
  const grad6 = () => {
    return <div className="grad6"></div>;
  };

  const bookACall = () => {
    return (
      <div
        style={{
          display: isMobile ? "flex" : "",
          justifyContent: "center",
          marginTop: isMobile ? 26 : 0,
          marginBottom: 74,
        }}
      >
        <button
          data-cal-namespace=""
          data-cal-link="supersquad/30min"
          data-cal-config='{"layout":"month_view"}'
          className="call_button"
          style={{ zIndex: 10 }}
        >
          {"Book a Call ->"}
        </button>
      </div>
    );
  };
  return (
    <div style={{ background: "black" }} id="main">
      {!isMobile && circleGrad()}
      {!isMobile && squareGrad()}
      {isMobile && (
        <img
          src={MobTop}
          style={{
            position: "absolute",
            zIndex: 0,
            top: 0,
            objectFit: "cover",
            width: "100vw",
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          maxWidth: 1440,
          margin: "auto",
          zIndex: 2,
          position: "relative",
        }}
      >
        <div
          style={{
            backgroundImage: `url(${!isMobile ? TopImg1 : MobTop})`,
            backgroundSize: "cover",
            minHeight: "100vh",
          }}
        >
          <div style={{ padding: isMobile ? "25px 20px 90px" : "32px 7.77%" }}>
            <Navbar isMobile={isMobile} />
          </div>
          <div
            style={{
              marginTop: isMobile ? 0 : 143,
              padding: isMobile ? "0px 16px" : "0px 0px 0px 7.77%",
            }}
          >
            {topSection()}
          </div>
        </div>
        <div style={{ padding: "0px 7.77%" }}>
          {travelWith()}
          {howItWorks()}
          {types()}

          {features()}
          {isMobile && bookACall()}
          {faqs()}
          <div style={{ marginTop: isMobile ? 74 : 291 }}>
            <Footer isMobile={isMobile} />
          </div>
        </div>
      </div>
    </div>
  );
}
