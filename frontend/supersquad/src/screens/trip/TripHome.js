import React from "react";
import Navbar from "./Navbar";

import CreatorDP from "../../resources/images/trip/creator-dp.svg";
import Back1 from "../../resources/images/trip/background-img-1.svg";
import HighLight1 from "../../resources/images/trip/highlight1.svg";
import HighLight2 from "../../resources/images/trip/highlight2.svg";
import HighLight3 from "../../resources/images/trip/highlight3.svg";
import Plus from "../../resources/images/trip/plus.svg";
import ItnBullet from "../../resources/images/trip/itnBullet.svg";
import RoomIcon from "../../resources/images/trip/roomicon.svg";
import ActivityIcon from "../../resources/images/trip/activityicon.svg";
import BreakfastIcon from "../../resources/images/trip/breakfasticon.svg";
import SupportIcon from "../../resources/images/trip/supporticon.svg";
import Acc1 from "../../resources/images/trip/acc1.svg";
import Acc2 from "../../resources/images/trip/acc2.svg";
import Acc3 from "../../resources/images/trip/acc3.svg";
import Acc4 from "../../resources/images/trip/acc4.svg";
import Acc5 from "../../resources/images/trip/acc5.svg";
import Acc6 from "../../resources/images/trip/acc6.svg";
import Acc7 from "../../resources/images/trip/acc7.svg";
import Acc8 from "../../resources/images/trip/acc8.svg";
import Tick from "../../resources/images/trip/tickicon.svg";
import SingleRoom from "../../resources/images/trip/singleroom.svg";
import DoubleRoom from "../../resources/images/trip/doubleroom.svg";
import PlusBlack from "../../resources/images/trip/plusblack.svg";

export default function TripHome() {
  const title = () => {
    return (
      <div
        style={{
          padding: "0px 16px",
          backgroundImage: `url(${Back1})`,
          backgroundSize: "cover",
          height: "100%",
          borderBottomRightRadius: "50px",
          marginTop: 20,
        }}
      >
        <div style={{ margin: "auto", paddingTop: 80 }}>
          <p
            style={{
              margin: 0,
              fontSize: 40,
              color: "white",
              fontFamily: "Julius Sans One",
            }}
          >
            Chasing
          </p>
          <p
            style={{
              margin: 0,
              fontSize: 40,
              color: "white",
              fontWeight: 800,
              fontFamily: "Inter",
            }}
          >
            Northern Lights
          </p>
          <p
            style={{
              margin: 0,
              marginTop: 350,
              color: "white",
              fontFamily: "Inter",
              fontSize: 13,
            }}
          >
            Hosted by
          </p>
          <div style={{ display: "flex", marginTop: 12, alignItems: "center" }}>
            <img
              src={CreatorDP}
              style={{
                height: 43,
                width: 43,
                borderRadius: 100,
                marginRight: 8,
              }}
            />
            <p
              style={{
                margin: 0,
                color: "white",
                fontFamily: "Inter",
                fontSize: 20,
                marginTop: 0,
              }}
            >
              Tanya Khanijow
            </p>
          </div>
          <p
            style={{
              margin: 0,
              color: "white",
              fontFamily: "Inter",
              fontSize: 20,
              marginTop: 20,
              paddingBottom: 100,
            }}
          >
            14 - 18 July, 2024
          </p>
        </div>
      </div>
    );
  };

  const experience = () => {
    return (
      <div
        style={{
          marginTop: 100,
          marginRight: "auto",
          marginLeft: "auto",
          padding: "0px 16px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 35,
            textAlign: "center",
          }}
        >
          The Experience
        </p>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 16.5,
            marginTop: 36,
          }}
        >
          Immerse yourself in the enchanting culture of Finland with Tanya
          Khanijow, as you chase the mesmerizing Northern Lights across the
          Arctic skies, creating unforgettable memories amidst the pristine
          wilderness.
        </p>
      </div>
    );
  };

  const host = () => {
    return (
      <div
        style={{
          padding: "0px 16px",
          margin: "160px auto 0px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36,
            textAlign: "center",
          }}
        >
          Meet your host
        </p>
        <img
          src={CreatorDP}
          style={{
            height: 323,
            width: 343,
            margin: "auto",
            marginTop: 36,
          }}
        />
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 32.6,
            textAlign: "center",
            marginTop: 48,
            fontWeight: 700,
          }}
        >
          Tanya Khanijow
        </p>
        <p
          style={{
            margin: 0,
            color: "#344A32",
            fontFamily: "Inter",
            fontSize: 18.3,
            textAlign: "center",
            marginTop: 18,
            fontWeight: 600,
          }}
        >
          Travel Influencer
        </p>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 16.5,
            textAlign: "center",
            marginTop: 18,
            fontWeight: 400,
          }}
        >
          Hi Guys, I'm Tanya Khanijow. I'm a Travel Vlogger, solo travel
          enthusiast and travel Film Maker. Follow along for some epic
          adventures and travel stories that will make you travel vicariously
          and leave you wanting more from life!
        </p>
      </div>
    );
  };

  const tripHightLights = () => {
    const dummyTrip = [
      {
        id: "trip-0",
        title: "Husky Sled Rides",
        image: HighLight1,
      },
      {
        id: "trip-1",
        title: "Aurora Borealis",
        image: HighLight2,
      },
      {
        id: "trip-2",
        title: "Helsinki City Tour",
        image: HighLight3,
      },
    ];

    const trips = (dummyTrip) => {
      return (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {dummyTrip.map((i) => (
            <div style={{ marginTop: 36 }} key={i.id}>
              <p
                style={{
                  margin: 0,
                  color: "#020202",
                  fontFamily: "Inter",
                  fontSize: 18,
                  marginTop: 0,
                  fontWeight: 600,
                }}
              >
                {i.title}
              </p>
              <img src={i.image?.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} style={{ marginTop: 18 }} />
            </div>
          ))}
        </div>
      );
    };
    return (
      <div style={{ padding: "0px 16px", margin: "48px auto 0px auto" }}>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36.4,
            textAlign: "center",
            marginTop: 0,
            fontWeight: 400,
          }}
        >
          Trip Highlights
        </p>
        {trips(dummyTrip)}
      </div>
    );
  };

  const [itnSelected, setItnSelected] = React.useState(0);

  const detailedItinerary = () => {
    const dummyItn = [
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
      [
        "Arrive in Helsinki airport. Get transferred to your hotel.",
        "Check-in to Hotel in København SV @ 2 PM",
        "Go for a fulfilling lunch at Ravintola Nokka 10:00 AM - 11:30 AM: Yoga Asana Practice for Mindfulness and Presence",
        "Explore Helsinki City Centre with Tanya",
      ],
    ];

    const itnList = (index) => {
      return (
        <div>
          {dummyItn[index].map((i) => (
            <div
              style={{
                display: "flex",
                marginTop: 32,
                marginLeft: 52,
                marginRight: 32,
                alignItems: "flex-start",
              }}
            >
              <img src={ItnBullet} style={{ marginTop: 4 }} />
              <p
                style={{
                  margin: 0,
                  color: "white",
                  fontFamily: "Inter",
                  fontSize: 16.5,
                  marginTop: 0,
                  fontWeight: 400,
                  marginLeft: 8,
                  lineHeight: "21,6px",
                }}
              >
                {i}
              </p>
            </div>
          ))}
        </div>
      );
    };

    return (
      <div
        style={{
          margin: "125px 16px 0px 16px",
          backgroundColor: "black",
          borderRadius: 8,
        }}
      >
        <p
          style={{
            margin: 0,
            color: "white",
            fontFamily: "Inter",
            fontSize: 36.4,
            marginTop: 0,
            fontWeight: 400,
            paddingTop: 16,
            marginLeft: 18,
          }}
        >
          Detailed Itinerary
        </p>
        <div style={{ paddingTop: 12, paddingBottom: 40 }}>
          {dummyItn.map((i, index) => (
            <div key={"itn-" + index}>
              <div
                style={{
                  margin: 0,
                  color: "white",
                  fontFamily: "Inter",
                  fontSize: 22,
                  marginTop: 0,
                  fontWeight: 400,
                  marginTop: 8,
                  marginLeft: 32,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {"Day " + (index + 1)}
                {itnSelected !== index && (
                  <img
                    src={Plus}
                    style={{ marginLeft: 40 }}
                    onClick={() => {
                      setItnSelected(index);
                    }}
                  />
                )}
              </div>
              {itnSelected === index && itnList(index)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const price = () => {
    const dummyInfo = [
      {
        id: "info-0",
        text: "Private or Sharing room",
        image: RoomIcon,
      },
      {
        id: "info-1",
        text: "Access to all activities",
        image: ActivityIcon,
      },
      {
        id: "info-2",
        text: "Breakfast and Dinner ",
        image: BreakfastIcon,
      },
      {
        id: "info-3",
        text: "On ground support",
        image: SupportIcon,
      },
    ];
    return (
      <div style={{ margin: "100px auto 0px", padding: "0px 40px" }}>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 23.8,
            lineHeight: "28.8px",
            marginTop: 0,
            fontWeight: 400,
          }}
        >
          $ 2,000.00 USD
        </p>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 28.1,
            lineHeight: "33.6px",
            marginTop: 4,
            fontWeight: 400,
          }}
        >
          10 day full retreat
        </p>
        <div
          style={{
            margin: "16px 0px",
            background: "black",
            height: "1px",
            width: "100%",
          }}
        />
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              July 14, 2024
            </p>
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              start date
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              July 19, 2024
            </p>
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              end date
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              15
            </p>
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              total participants
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 14,
            }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              3
            </p>
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              available spots
            </p>
          </div>
        </div>
        <div
          style={{
            margin: "16px 0px",
            background: "black",
            height: "1px",
            width: "100%",
          }}
        />
        {dummyInfo.map((i) => (
          <div
            key={i.id}
            style={{
              marginTop: i.id == "info-0" ? 0 : 12,
              display: "flex",
              alignItems: "center",
            }}
          >
            <img style={{ marginRight: 14 }} src={i.image} />
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
              }}
            >
              {i.text}
            </p>
          </div>
        ))}
        <button
          style={{
            border: "none",
            outline: "none",
            width: 164,
            height: 52,
            borderRadius: 60,
            backgroundColor: "black",
            color: "white",
            fontWeight: 300,
            fontSize: 19.5,
            lineHeight: "24px",
            marginTop: 16,
          }}
        >
          Book Now
        </button>
      </div>
    );
  };

  const accommodation = () => {
    const dummyAcom = [
      {
        id: "acc-0",
        title: "Hotel Kämp",
        location: "Helsinki",
        images: [Acc1, Acc2, Acc3, Acc4],
      },
      {
        id: "acc-1",
        title: "Kakslauttanen Arctic Resort",
        location: " East Village",
        images: [Acc5, Acc6, Acc7, Acc8],
      },
    ];

    const getImages = (im) => {
      return (
        <>
          {im.map((i) => (
            <img src={i.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
          ))}
        </>
      );
    };

    const accomList = (i, index) => {
      return (
        <div style={{ marginTop: index == 0 ? 24 : 0 }}>
          <p
            style={{
              margin: 0,
              color: "black",
              fontFamily: "Inter",
              fontSize: 19.1,
              lineHeight: "22.4px",
              fontWeight: 400,
            }}
          >
            {i.title}
          </p>
          <p
            style={{
              margin: 0,
              color: "#344A32",
              fontFamily: "Inter",
              fontSize: 19.1,
              lineHeight: "22.39px",
              fontWeight: 400,
              marginTop: 4,
              marginBottom: 12,
            }}
          >
            {i.location}
          </p>
          <div
            style={{
              display: "grid",
              gridGap: 6,
              gridTemplateColumns: "171px 171px",
            }}
          >
            {getImages(i.images)}
          </div>
          {index !== dummyAcom.length - 1 && (
            <div
              style={{
                margin: "48px 0px",
                background: "grey",
                width: "100%",
                height: 1,
              }}
            />
          )}
        </div>
      );
    };
    return (
      <div style={{ margin: "100px auto 0px", padding: "0px 16px" }}>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36.4,
            lineHeight: "43.2px",
            fontWeight: 400,
          }}
        >
          Accommodation
        </p>
        {dummyAcom.map((i, index) => accomList(i, index))}
      </div>
    );
  };

  const [inc, setInc] = React.useState(1);

  const inclusions = () => {
    const data = [
      {
        image: Tick,
        text: "5 nights accomodation",
      },
      {
        image: Tick,
        text: "Breakfast and Dinners",
      },
      {
        image: Tick,
        text: "Transfers during experience",
      },
      {
        image: Tick,
        text: "Curated Activities",
      },
      {
        image: Tick,
        text: "Local guides & Trip leader",
      },
    ];
    return (
      <div
        style={{
          margin: "100px auto 0px",
          padding: "0px 16px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36.4,
            lineHeight: "43.2px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          Inclusions
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 18,
          }}
        >
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: inc == 0 ? "black" : "#EEEDEB",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: inc != 0 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
            }}
            onClick={() => {
              setInc(0);
            }}
          >
            Exclusions
          </button>
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: inc == 1 ? "black" : "#EEEDEB",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: inc != 1 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
              marginTop: 12,
            }}
            onClick={() => {
              setInc(1);
            }}
          >
            Inclusions
          </button>
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: inc == 2 ? "black" : "#EEEDEB",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: inc != 2 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
              marginTop: 12,
            }}
            onClick={() => {
              setInc(2);
            }}
          >
            Add on's
          </button>
        </div>
        <div style={{ marginTop: 20 }}>
          {data.map((i, index) => (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img src={i.image?.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
              <p
                style={{
                  margin: 0,
                  color: "black",
                  fontFamily: "Inter",
                  fontSize: 20,
                  lineHeight: "43.2px",
                  fontWeight: 400,
                  textAlign: "left",
                  marginLeft: 20,
                }}
              >
                {i.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const rooms = () => {
    const dummyRooms = [
      {
        title: "Private Room",
        description: "Have the entire room to your self",
        image: SingleRoom,
      },
      {
        title: "Shared Room",
        description: "Share with a co-traveler",
        image: DoubleRoom,
      },
    ];

    return (
      <div style={{ margin: "80px auto 0px", padding: "0px 16px" }}>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36.4,
            lineHeight: "43.2px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          Room options
        </p>
        {dummyRooms.map((i, index) => (
          <div
            key={"room- " + index}
            style={{ paddingTop: index === dummyRooms.length - 1 ? 20 : 0 }}
          >
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 18,
                lineHeight: "27px",
                fontWeight: 600,
                marginTop: 20,
              }}
            >
              {i.title}
            </p>
            <img src={i.image?.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} style={{ marginTop: 20 }} />
            <p
              style={{
                margin: 0,
                color: "black",
                fontFamily: "Inter",
                fontSize: 16.5,
                lineHeight: "21.6px",
                fontWeight: 400,
                marginTop: 20,
              }}
            >
              {i.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const [faqType, setFaqType] = React.useState(1);
  const [faq, setFaq] = React.useState();
  const faqs = () => {
    const dummyFaq = [
      {
        id: "faq-0",
        question: "Will I get to meet Tanya on this trip?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-1",
        question: "How will the weather be like?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-2",
        question: "Which airport in India do I fly from?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-3",
        question: "Can I pay in parts? What are the options?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-4",
        question: "Can I cancel? Will I get a refund?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-5",
        question: "How do you assign rooms?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
      {
        id: "faq-6",
        question: "Can I talk to someone for additional questions?",
        answer:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus urna sed purus facilisis, eu congue tellus scelerisque",
      },
    ];
    return (
      <div style={{ margin: "60px auto 0px", padding: "0px 16px" }}>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 36.4,
            lineHeight: "43.2px",
            fontWeight: 400,
            textAlign: "left",
          }}
        >
          FAQ's
        </p>
        <div
          style={{
            marginTop: 40,
            backgroundColor: "#FFF7E3",
            borderRadius: 16,
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: faqType == 0 ? "black" : "unset",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: faqType != 0 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
              marginTop: 0,
            }}
            onClick={() => {
              setFaqType(0);
            }}
          >
            Location
          </button>
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: faqType == 1 ? "black" : "unset",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: faqType != 1 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
              marginTop: 6,
            }}
            onClick={() => {
              setFaqType(1);
            }}
          >
            Experience
          </button>
          <button
            style={{
              width: 295,
              height: 40.4,
              backgroundColor: faqType == 2 ? "black" : "unset",
              fontWeight: 500,
              fontFamily: "Inter",
              fontSize: 16.7,
              lineHeight: "32.4px",
              color: faqType != 2 ? "black" : "white",
              border: "none",
              outline: "none",
              borderRadius: "80px",
              marginTop: 6,
            }}
            onClick={() => {
              setFaqType(2);
            }}
          >
            General
          </button>
        </div>

        <div
          style={{
            marginTop: 24,
            backgroundColor: "#FFF7E3",
            borderRadius: 12,
            padding: 32,
          }}
        >
          {dummyFaq.map((i, index) => (
            <div style={{}}>
              <div style={{ background: "black", width: "100%", height: 1 }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p
                  style={{
                    margin: 0,
                    color: "black",
                    fontFamily: "Inter",
                    fontSize: 20.1,
                    lineHeight: "28px",
                    fontWeight: 400,
                    marginTop: 16,
                    marginBottom: 16,
                  }}
                >
                  {i.question}
                </p>
                <img
                  style={{}}
                  src={PlusBlack}
                  onClick={() => {
                    setFaq(index);
                  }}
                />
              </div>
              {faq === index && (
                <p
                  style={{
                    margin: 0,
                    color: "black",
                    fontFamily: "Inter",
                    fontSize: 18.3,
                    lineHeight: "26px",
                    fontWeight: 400,
                    marginBottom: 20,
                  }}
                >
                  {i.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const bookNow = () => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <button
          style={{
            border: "none",
            outline: "none",
            width: 164,
            height: 52,
            borderRadius: 60,
            backgroundColor: "black",
            color: "white",
            fontWeight: 300,
            fontSize: 19.5,
            lineHeight: "24px",
            marginTop: 16,
          }}
        >
          Book Now
        </button>
        <p
          style={{
            margin: 0,
            color: "black",
            fontFamily: "Inter",
            fontSize: 18.3,
            lineHeight: "26px",
            fontWeight: 400,
            marginTop: 8,
            marginBottom: 40,
          }}
        >
          Pay in Parts
        </p>
      </div>
    );
  };

  return (
    <div>
      <Navbar />
      {title()}
      {experience()}
      {host()}
      {tripHightLights()}
      {detailedItinerary()}
      {price()}
      {accommodation()}
      {inclusions()}
      {rooms()}
      {faqs()}
      {bookNow()}
    </div>
  );
}
