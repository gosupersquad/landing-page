import React, { useState, useEffect } from "react";
import "./CreatorHome.css";
import Clock from "../../../resources/images/triphome/clock.svg";
import Localtion from "../../../resources/images/triphome/map-pin.svg";
import Calendar from "../../../resources/images/triphome/calendar 2.svg";
import Star from "../../../resources/images/triphome/star.svg";
import Down from "../../../resources/images/creatorhome/chevron-down-light.svg";
import { TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import axios from "axios";
import { url } from "../../../helper";

export default function MyTrips() {
  const token = localStorage.getItem("token");
  const [selectedTripState, setSelectedTripState] = useState(0);
  const [selectedIt, setSelectedIt] = useState("");
  const [tripDetails, setTripDetails] = useState({});
  const [tripTitle, setTripTitle] = useState("");
  const [description, setDescription] = useState("");
  const [theme, setTheme] = useState([]);
  const [cur, setCur] = useState("USD");
  const [price, setPrice] = useState();
  const [earlyBirdPrice, setEarlyBirdPrice] = useState();
  const [hostBio, setHostBio] = useState("");
  const [bookingArr, setBookingArr] = useState([]);
  const save = () => {
    const data = {
      title: tripTitle ? tripTitle : tripDetails?.title,
      host_bio: description ? description : hostBio,
      currency: cur ? cur : "USD",
      price: price ? price : tripDetails?.price,
      earlyBirdPrice: earlyBirdPrice
        ? earlyBirdPrice
        : tripDetails.early_bird_price,
      trip_slug: tripDetails?.slug,
    };
    axios
      .post(url + "v1/trip/update_trip_by_creator", data, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(url + "v1/trip/get_creator_trip", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.trip) {
          setTripDetails(res.data.trip);
          setTripTitle(res.data.trip.title);
          setDescription(res.data.creator_bio);
          setHostBio(res.data.creator_bio);
          setPrice(res.data.trip.price);
          setEarlyBirdPrice(res.data.trip.early_bird_price);
          setCur(res.data.trip.currency ?? "USD");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (tripDetails?.slug) {
      axios
        .post(
          url + "v1/trip/get_bookings",
          { trip_slug: tripDetails?.slug },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setBookingArr(res.data.bookings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [tripDetails]);

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
      <div style={{ padding: "0px 0px", flex: 1 }}>
        <p className="it_header_text">Trip Itinerary</p>
        <div
          style={{
            background: "var(--Light-Light-200, #F5F5F5)",
            borderRadius: 24,
            marginTop: 32,
          }}
        >
          {tripDetails?.itinerary?.map((i, index) => itCard(i, index))}
        </div>
      </div>
    );
  };

  const [priceArr, setPriceArr] = useState([]);
  useEffect(() => {
    if (tripDetails?.cost_price && price) {
      const cp = tripDetails?.cost_price;
      const perTravellerProfit = price - cp - (price - cp) * 0.1;
      const arr = [];
      for (let i = 8; i <= 20; i += 2) {
        arr.push({
          no: i,
          cost: cp,
          projected: i * perTravellerProfit,
        });
      }
      arr.push({
        no: 25,
        cost: cp,
        projected: 25 * perTravellerProfit,
      });
      setPriceArr([...arr]);
    }
  }, [tripDetails, price]);
  const myTrips = () => {
    const itnCard = () => {
      return (
        <div
          key={"it-0"}
          className="itn_card_wrapper"
          style={{ width: "436px" }}
          onClick={() => {
            window.open("/itinerary/" + tripDetails?.slug);
          }}
        >
          <img
            src={tripDetails?.card_img?.replace('http://localhost:5005', 'https://gosupersquad.com:5005')}
            style={{
              width: "100%",
              borderRadius: "24px 24px 0px 0px",
              height: 235,
              objectFit: "cover",
            }}
          />
          <div style={{ padding: 24 }}>
            <p className="title_text_itn_card">{tripDetails?.title}</p>
            <div
              style={{
                display: "flex",
                gap: 8,

                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <img src={Calendar} />
                <p className="itn_card_secondary_text">
                  {tripDetails?.tags?.[0]}
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <img src={Clock} />

                <p className="itn_card_secondary_text">
                  {Math.ceil(
                    (new Date(tripDetails?.end_date) -
                      new Date(tripDetails?.start_date)) /
                      (1000 * 24 * 3600)
                  )}{" "}
                  days
                </p>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <img src={Localtion} />
                <p className="itn_card_secondary_text">
                  {tripDetails?.location}
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const textBoxes = () => {
      const handleTitleChange = (e) => {
        setTripTitle(e.target.value);
      };

      return (
        <div style={{ flex: 1 }}>
          <p className="title_label_text">Trip Title</p>
          <input
            className="input_class_name"
            placeholder="Enter Title"
            value={tripTitle}
            onChange={handleTitleChange}
            style={{ maxWidth: 300 }}
          />
          <p className="title_label_text" style={{ marginTop: 20 }}>
            Description
          </p>
          <textarea
            className="input_class_name"
            placeholder="Enter Description"
            style={{ height: 196 }}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
      );
    };

    const promotion = () => {
      return (
        <div className="promo_wrapper_div">
          <p className="title_text_itn_card">Promotion Playbook</p>
          <p className="itn_card_secondary_text" style={{ marginTop: 4 }}>
            Tips and Tricks to maximize bookings
          </p>
          <button className="promo_btn">Download</button>
        </div>
      );
    };

    const pricing = () => {
      const curren = ["USD", "INR"];
      const handleCurChange = (e, val) => {
        setCur(val);
      };

      return (
        <div style={{ flex: 1 }}>
          <p className="title_label_text">Early Bird Price</p>
          <div style={{ display: "flex", gap: 8 }}>
            <Autocomplete
              id="multiple-limit-tags"
              options={curren}
              className={"input_class_name"}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Currency"
                  style={{ padding: 0 }}
                />
              )}
              onChange={handleCurChange}
              value={cur}
              style={{ width: 133, height: 21 }}
            />
            <input
              className="input_class_name"
              placeholder="Enter Price"
              style={{ flex: 1, width: "unset" }}
              type="number"
              value={earlyBirdPrice}
              onChange={(e) => {
                setEarlyBirdPrice(e.target.value);
              }}
              onWheel={(e) => {
                e.target.blur();
              }}
            />
          </div>
          <p className="title_label_text" style={{ marginTop: 20 }}>
            Regular Price
          </p>
          <input
            className="input_class_name"
            placeholder="Enter Price"
            type="number"
            value={price}
            onWheel={(e) => {
              e.target.blur();
            }}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <p className="title_label_text" style={{ marginTop: 20 }}>
            Potential Earnings
          </p>
          <table className="table_style">
            <tr>
              <th className="td_border_1">No. of travellers</th>
              <th className="td_border_1">Cost per traveller</th>
              <th>Project Earnings</th>
            </tr>
            {priceArr.map((i) => (
              <tr>
                <td className="td_border_1">{i.no}</td>
                <td className="td_border_1">
                  {i.currency == "USD" ? "$ " : "₹ "}
                  {i.cost.toLocaleString()}
                </td>
                <td>
                  {i.currency == "USD" ? "$ " : "₹ "}
                  {i.projected.toLocaleString()}
                </td>
              </tr>
            ))}
          </table>
        </div>
      );
    };

    const bookings = () => {
      const lastBooking = bookingArr?.[bookingArr?.length - 1];
      const bookRow = (i) => {
        return (
          <div
            className="booking_row_div"
            key={i._id}
            style={{
              borderBottom:
                i._id == lastBooking._id ? "none" : "1px solid #dedede",
            }}
          >
            <div style={{ flex: 1, marginTop: 4 }}>
              <p className="book_primary_text">{i.name}</p>
              <p
                className="book_secondary_text"
                style={{ display: "flex", alignItems: "center", gap: 6 }}
              >
                {i.gender}
                <div
                  style={{
                    width: 4,
                    height: 4,
                    background: "rgba(0, 0, 0, 0.7)",
                    borderRadius: 100,
                  }}
                />
                {i.country}
              </p>
            </div>
            <div style={{ width: 183, marginRight: 100 }}>
              <p className="book_primary_text">{i.email}</p>
              <p className="book_secondary_text" style={{ marginTop: 4 }}>
                {i.phone}
              </p>
            </div>
            <div style={{ width: 88 }}>
              <button className="price_paid_button">
                {i.currency == "INR" ? "₹ " : "$ "}
                {i.amount_paid}
              </button>
            </div>
          </div>
        );
      };
      return (
        <div style={{}}>
          <p className="booking_text">Bookings</p>
          <div className="booking_wrapper_div">
            <div
              className="booking_row_div"
              style={{
                borderBottom:
                  bookingArr?.length == 0 ? "none" : "1px solid #dedede",
              }}
            >
              <p className="table_header_text" style={{ flex: 1 }}>
                Customer Info
              </p>

              <p
                className="table_header_text"
                style={{ width: 183, marginRight: 100 }}
              >
                Contact Info
              </p>
              <p className="table_header_text" style={{ width: 88 }}>
                Payment
              </p>
            </div>
            {bookingArr?.map((i) => bookRow(i))}
          </div>
        </div>
      );
    };

    return (
      <div>
        {options()}
        {selectedTripState != 3 && (
          <div style={{ display: "flex", gap: 24 }}>
            <div>
              {itnCard()}
              {selectedTripState == 1 && promotion()}
            </div>

            {selectedTripState == 0 && textBoxes()}
            {selectedTripState == 1 && pricing()}
            {selectedTripState == 2 && itinerary1()}
          </div>
        )}

        {selectedTripState == 3 && bookings()}
      </div>
    );
  };

  const options = () => {
    return (
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 48 }}>
          <button
            className={
              selectedTripState == 0
                ? "itn_selected_button"
                : "itn_selected_button itn_unselected_button"
            }
            onClick={() => {
              setSelectedTripState(0);
            }}
          >
            Details
          </button>
          <button
            className={
              selectedTripState == 1
                ? "itn_selected_button"
                : "itn_selected_button itn_unselected_button"
            }
            onClick={() => {
              setSelectedTripState(1);
            }}
          >
            Pricing
          </button>
          <button
            className={
              selectedTripState == 2
                ? "itn_selected_button"
                : "itn_selected_button itn_unselected_button"
            }
            onClick={() => {
              setSelectedTripState(2);
            }}
          >
            Itinerary
          </button>
          <button
            className={
              selectedTripState == 3
                ? "itn_selected_button"
                : "itn_selected_button itn_unselected_button"
            }
            onClick={() => {
              setSelectedTripState(3);
            }}
          >
            Booking
          </button>
        </div>
        <button className="save_btn" onClick={save}>
          Save
        </button>
      </div>
    );
  };
  return <div style={{ padding: 48 }}>{tripDetails?.slug && myTrips()}</div>;
}
