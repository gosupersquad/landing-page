import React, { useState, useEffect, useCallback } from "react";
import "./CreatorHome.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Pay from "../../../resources/images/triphome/banknotes.svg";
import Tag from "../../../resources/images/creatorhome/tag.svg";
import Slider from "@mui/material/Slider";

import Map from "../../../resources/images/home/map1.svg";
import Clock from "../../../resources/images/triphome/clock.svg";
import Localtion from "../../../resources/images/triphome/map-pin.svg";
import Strip from "../../../resources/images/creator/strip.svg";
import SellPrice from "../../../resources/images/creator/sell_price.svg";
import UserGrp from "../../../resources/images/creatorhome/user-group.svg";
import Building from "../../../resources/images/creatorhome/building-office.svg";
import Cake from "../../../resources/images/creatorhome/cake.svg";
import Am1 from "../../../resources/images/triphome/building-office.svg";
import Am2 from "../../../resources/images/triphome/shopping-bag.svg";
import Am3 from "../../../resources/images/triphome/rocket-launch.svg";
import Am4 from "../../../resources/images/triphome/paint-brush.svg";
import Am5 from "../../../resources/images/triphome/user-group.svg";
import Am6 from "../../../resources/images/triphome/square-2-stack.svg";
import axios from "axios";
import { url } from "../../../helper";
import Star from "../../../resources/images/triphome/star.svg";
import Down from "../../../resources/images/creatorhome/chevron-down-light.svg";
import Back from "../../../resources/images/creator/back.svg";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Itineraries() {
  const [allTrips, setAllTrips] = useState([]);
  const [selectAmenity, setSelectAmenity] = useState(0);
  const [selectedIt, setSelectedIt] = useState("");
  const [tripSlug, setTripSlug] = useState();
  const [tripDetails, setTripDetails] = useState();
  const isMobile = useMediaQuery("(max-width:600px)");
  const token = localStorage.getItem("token");
  const [catVal, setCatVal] = useState([]);
  const [destination, setDestination] = useState(null);
  const [sellPrices, setSellPrice] = useState(0);
  const [people, setPeople] = useState(8);
  const [projectedEarning, setProjectedEarning] = useState();
  useEffect(() => {
    const newEarning = (sellPrices - tripDetails?.cost_price) * people;
    setProjectedEarning(newEarning);
  }, [sellPrices, people]);

  useEffect(() => {
    axios
      .get(url + "v1/trip/get_unpublished_trips", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setAllTrips(res.data.trips);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (tripSlug) {
      axios
        .post(
          url + "v1/trip/get_trip",
          {
            slug: tripSlug,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setTripDetails(res.data.trip);
          setSellPrice(res.data.trip.suggested_sell_price_start);
        })
        .catch((err) => console.log(err));
    }
  }, [tripSlug]);

  const filters = () => {
    const destinations = ["Europe", "Asia", "America"];
    const categoriesArr = [
      "Fitness",
      "Adventure",
      "Sports",
      "Food",
      "Yoga",
      "Wildlife",
    ];
    const handleCatChange = (e, val) => {
      setCatVal(val);
    };
    const handleDestChnage = (e, val) => {
      setDestination(val);
    };
    return (
      <div style={{ display: "flex", gap: 26 }}>
        <Autocomplete
          disablePortal
          options={destinations}
          className={"input_class_name"}
          sx={{ width: 300, height: 21 }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Destination" />
          )}
          value={destination}
          onChange={handleDestChnage}
        />
        <Autocomplete
          multiple
          limitTags={1}
          disablePortal
          options={categoriesArr}
          className={"input_class_name"}
          sx={{ width: 300, height: 21 }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Categories" />
          )}
          value={catVal}
          onChange={handleCatChange}
        />
      </div>
    );
  };

  const itineraries = () => {
    const itnCard = (i) => {
      return (
        <div
          key={i._id}
          className="itn_card_wrapper"
          onClick={() => {
            setTripSlug(i.slug);
          }}
        >
          <img
            src={i.card_img.replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
            style={{
              width: "100%",
              borderRadius: "24px 24px 0px 0px",
              height: 300,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 24 }}>
            <p className="title_text_itn_card">{i.title}</p>
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <img src={Map} />
              <p className="itn_card_secondary_text">{i.tags[0]}</p>
              <img src={Clock} />
              <p className="itn_card_secondary_text">
                {Math.ceil(
                  (new Date(i?.end_date) - new Date(i?.start_date)) /
                    (1000 * 24 * 3600)
                )}{" "}
                Days
              </p>
              <img src={Localtion} />
              <p className="itn_card_secondary_text">{i.location}</p>
            </div>
          </div>
        </div>
      );
    };
    const getFilteredTrips = () => {
      if (!destination && catVal.length == 0) {
        return allTrips;
      }
      let filterTrips = [];
      if (destination) {
        filterTrips = allTrips?.filter((i) => i?.destination == destination);
      }
      if (catVal.length > 0) {
        for (let i = 0; i < catVal.length; i++) {
          filterTrips = allTrips?.filter((j) => j?.tags.includes(catVal[i]));
        }
      }
      return filterTrips;
    };
    return (
      <div
        style={{ marginTop: 41, display: "flex", gap: 24, flexWrap: "wrap" }}
      >
        {getFilteredTrips()?.map((i) => itnCard(i))}
      </div>
    );
  };

  const tripPreview = () => {
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
    const topSection = () => {
      return (
        <div style={{ display: "flex", padding: "48px 0px", gap: 48 }}>
          <div style={{ flex: 1 }}>
            <p className="preview_header_text">{tripDetails?.title}</p>
            <p className="preview_secondary_text" style={{ marginTop: 8 }}>
              {tripDetails?.description}
            </p>
            <p
              style={{
                marginTop: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
              className="text_preview_last"
            >
              {startDate.getDate() +
                " - " +
                endDate.getDate() +
                " " +
                months[endDate.getMonth()] +
                ", " +
                endDate.getFullYear()}
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: "rgba(0, 0, 0, 0.50)",
                  borderRadius: 100,
                }}
              />
              {Math.ceil((endDate - startDate) / (1000 * 24 * 3600))} days
              <div
                style={{
                  width: 8,
                  height: 8,
                  background: "rgba(0, 0, 0, 0.50)",
                  borderRadius: 100,
                }}
              />
              {tripDetails?.location}
            </p>
          </div>
          <div>
            <img
              style={{
                borderRadius: 16,
                width: 516,
                height: 135,
                objectFit: "cover",
              }}
              src={tripDetails?.images[0].replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
            />
            <div style={{ display: "flex", marginTop: 16, gap: 16 }}>
              <img
                style={{
                  borderRadius: 16,
                  width: 250,
                  height: 135,
                  objectFit: "cover",
                }}
                src={tripDetails?.images[1].replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
              />
              <img
                style={{
                  borderRadius: 16,
                  width: 250,
                  height: 135,
                  objectFit: "cover",
                }}
                src={tripDetails?.images[2].replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
              />
            </div>
          </div>
        </div>
      );
    };

    const experience = () => {
      const expArr = [
        {
          id: "exp-0",
          icon: UserGrp,
          text: "8-20 spots",
        },
        {
          id: "exp-1",
          icon: Building,
          text: "4/5 star accomodation",
        },
        {
          id: "exp-2",
          icon: Cake,
          text: "6 Breakfasts, 2 Lunches and 2 Dinners",
        },
        {
          id: "exp-3",
          icon: Clock,
          text: "5 day trip",
        },
      ];

      const expCard = (i) => {
        return (
          <div className="exp_card" key={i.id}>
            <img src={i.icon.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
            <p className="text_preview_last">{i.text}</p>
          </div>
        );
      };
      return (
        <div style={{ padding: "48px 0px" }}>
          <p className="preview_header_text">The Experience</p>
          <p style={{ marginTop: 32 }} className="exp_text">
            {tripDetails?.description}
          </p>
          {expArr.map((i) => expCard(i))}
        </div>
      );
    };
    const handleSellPriceChange = (e, val) => {
      setSellPrice(val);
    };
    const handlePeopleChange = (e, val) => {
      setPeople(val);
    };
    const sellPrice = () => {
      return (
        <div
          style={{ marginTop: 50, position: "sticky", top: 0, paddingTop: 24 }}
        >
          <div
            style={{
              background: "#000",
              borderRadius: 20,
              boxShadow: "-4px 4px 40px 0px rgba(0, 0, 0, 0.10)",
              width: 373,
              padding: 24,
              paddingTop: 0,
            }}
          >
            <img
              style={{ float: "right", position: "absolute", right: 0 }}
              src={Strip}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img style={{ marginTop: 30 }} src={SellPrice} />
              <p className="sell_text_1" style={{ marginTop: 8 }}>
                Suggested Sell Price
              </p>
              <p
                style={{
                  marginTop: 8,
                }}
                className="sell_text_2"
              >
                {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                {tripDetails?.suggested_sell_price_start?.toLocaleString()} -{" "}
                {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                {tripDetails?.suggested_sell_price_end?.toLocaleString()}
              </p>
              <p className="sell_text_3">
                Base Price {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                {tripDetails?.cost_price?.toLocaleString()}
              </p>
              <div
                style={{
                  borderRadius: 11,
                  background: "#FFF",
                  padding: 16,
                  marginTop: 32,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <img src={Tag} />
                  <p
                    style={{
                      marginLeft: 16,
                    }}
                    className="sell_text_4"
                  >
                    Trip Price
                  </p>
                  <Slider
                    min={tripDetails?.suggested_sell_price_start}
                    max={tripDetails?.suggested_sell_price_end}
                    valueLabelDisplay="auto"
                    step={500}
                    shiftStep={
                      (tripDetails?.suggested_sell_price_end -
                        tripDetails?.suggested_sell_price_start) /
                      500
                    }
                    defaultValue={tripDetails?.suggested_sell_price_start}
                    style={{ marginLeft: 51, width: 170 }}
                    onChange={handleSellPriceChange}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <img src={UserGrp} style={{ width: 24, height: 24 }} />
                  <p
                    style={{
                      marginLeft: 16,
                      flex: 1,
                      textAlign: "left",
                    }}
                    className="sell_text_4"
                  >
                    Travellers
                  </p>
                  <Slider
                    min={8}
                    max={25}
                    step={1}
                    style={{ width: 170 }}
                    valueLabelDisplay="auto"
                    shiftStep={1}
                    defaultValue={8}
                    onChange={handlePeopleChange}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                  }}
                >
                  <img src={Pay} />
                  <p
                    style={{
                      marginLeft: 16,
                    }}
                    className="sell_text_4"
                  >
                    Potential Earnings
                  </p>
                  <p
                    style={{
                      marginLeft: 80,
                    }}
                    className="sell_text_5"
                  >
                    {tripDetails?.currency == "USD" ? "$ " : "₹ "}
                    {projectedEarning.toLocaleString()}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    data-cal-namespace=""
                    data-cal-link="supersquad/30min"
                    data-cal-config='{"layout":"month_view", "name": "Utkarsh Koushik", "email":"utkarshkoushik@gmail.com"}'
                    style={{ marginTop: 16, width: "100%" }}
                    className="sell_button"
                  >
                    Request Now
                  </button>
                </div>
              </div>
              <p
                style={{
                  marginTop: 16,
                }}
                className="sell_text_6"
              >
                Schedule a call to finalise and launch your trip
              </p>
            </div>
          </div>
        </div>
      );
    };

    const itinerary1 = () => {
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
                <img src={Star} style={{ height: "fit-content" }} />
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
                  src={Down}
                  style={{
                    cursor: "pointer",
                    WebkitTransform:
                      selectedIt == i._id ? "rotateX(180deg)" : "none",
                    transform: selectedIt == i._id ? "rotateX(180deg)" : "none",
                  }}
                  onClick={() => {
                    handleItChange(i);
                  }}
                />
              </div>
            </div>
            {selectedIt == i._id && (
              <div style={{ padding: 24, paddingTop: 0 }}>
                {i.day?.map((j, index) => itExpand(j, index))}
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
        <div style={{ padding: isMobile ? "0px 0px" : "0px 0px" }}>
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

    const detailedItn = () => {
      return <div style={{ padding: "48px 0px" }}>{itinerary1()}</div>;
    };

    const tripHighlights = () => {
      const cardWithText = (title, data) => {
        const cards = (i, index) => {
          return (
            <div
              key={i._id}
              style={{
                borderRadius: 24,
                boxShadow: "0px 2px 24px 1px rgba(102, 102, 102, 0.15)",
                marginTop: index == 0 ? 32 : 48,
              }}
            >
              <img
                src={i.image.replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
                style={{
                  width: "100%",
                  borderTopLeftRadius: 24,
                  borderTopRightRadius: 24,
                }}
              />
              <div style={{ padding: 24 }}>
                <p className="high_header">{i.title}</p>
                <p className="high_description">{i.description}</p>
              </div>
            </div>
          );
        };

        return (
          <div style={{}}>
            <p className="trip_high_text">{title}</p>
            {data?.map((i, index) => cards(i, index))}
          </div>
        );
      };

      return (
        <div style={{ padding: "48px 0px" }}>
          {cardWithText("Trip Highlights", tripDetails?.tripHighlight)}
        </div>
      );
    };

    const amenities = () => {
      const amns = [
        {
          id: "am-0",
          text: "5 nights accomodation",
          image: Am1,
        },
        {
          id: "am-1",
          text: "Breakfast and Dinners",
          image: Am2,
        },
        {
          id: "am-2",
          text: "Transfers during experience",
          image: Am3,
        },
        {
          id: "am-3",
          text: "Curated activities",
          image: Am4,
        },
        {
          id: "am-4",
          text: "Local guide and Trip leader",
          image: Am5,
        },
        {
          id: "am-5",
          text: "Private or sharing room",
          image: Am6,
        },
      ];

      const amCard = (i, index) => {
        return (
          <div key={i._id} className="amenities_card_wrapper_new">
            <img src={i.icon.replace('http://localhost:5005', 'https://gosupersquad.com:5005')} />
            <p className="am_card_text">{i.text}</p>
          </div>
        );
      };
      return (
        <div style={{ padding: "48px 0px" }}>
          <p className="preview_header_text">Amenities</p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 32,
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
            {selectAmenity == 0 &&
              tripDetails?.inclusions?.map((i, index) => amCard(i, index))}
            {selectAmenity == 1 &&
              tripDetails?.exclusions?.map((i, index) => amCard(i, index))}
            {selectAmenity == 2 &&
              tripDetails?.add_ons?.map((i, index) => amCard(i, index))}
          </div>
        </div>
      );
    };
    return (
      <div>
        <img
          src={Back}
          style={{ position: "absolute", cursor: "pointer" }}
          onClick={() => {
            setTripSlug();
          }}
        />
        {topSection()}
        <div style={{ display: "flex", gap: 24 }}>
          <div style={{ flex: 1 }}>
            {experience()}
            {detailedItn()}
            {tripHighlights()}
            {amenities()}
          </div>
          <div>{sellPrice()}</div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: 48 }}>
      {!tripSlug && filters()}
      {!tripSlug && itineraries()}

      {tripSlug && tripPreview()}
    </div>
  );
}
