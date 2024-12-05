import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Autocomplete from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import axios from "axios";
import { url } from "../../../helper";

import "./CreatorLogin.css";
import LoginPic from "../../../resources/images/creator/login-pic.png";
import Logo from "../../../resources/images/triphome/logo.svg";
import Pass from "../../../resources/images/creator/eye-slash.svg";
import Login from "../../../resources/images/creator/close-circle.svg";

export default function CreatorSignup() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [name, setName] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [phone, setPhone] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [socialLink, setSocialLink] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  const [socialChannel, setSocialChannel] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  const [bio, setBio] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  const handleRemove = (func) => {
    func({
      value: "",
      error: false,
      helperText: "",
    });
  };

  const handleChange = (func, val) => {
    func({
      value: val,
      error: false,
      helperText: "",
    });
  };
  const handleError = (func, text) => {
    func({
      value: "",
      error: true,
      helperText: text + " cannot be empty",
    });
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const isValidUrl = (urlString) => {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  };

  const handleRegister = () => {
    let invalid = false;
    if (name.value == "") {
      handleError(setName, "Name");
      invalid = true;
    }
    if (email.value == "") {
      handleError(setEmail, "Email");
      invalid = true;
    }
    if (phone.value == "") {
      handleError(setPhone, "Phone");
      invalid = true;
    }
    if (socialLink.value == "") {
      handleError(setSocialLink, "Social media link");
      invalid = true;
    }
    if (socialChannel.value == "" || socialChannel.value == null) {
      handleError(setSocialChannel, "Main social channel");
      invalid = true;
    }
    if (password.value == "") {
      handleError(setPassword, "Password");
      invalid = true;
    }
    if (confirmPassword.value == "") {
      handleError(setConfirmPassword, "Confirm password");
      invalid = true;
    }
    if (bio.value == "") {
      handleError(setBio, "Bio");
      invalid = true;
    }
    if (!isValidPhoneNumber(phone.value)) {
      setPhone({
        value: phone.value,
        error: true,
        helperText: "Enter a valid phone number",
      });
      invalid = true;
    }
    if (invalid) {
      document.body.scrollTop = document.documentElement.scrollTop = 250;
    }
    if (
      name.value != "" &&
      email.value != "" &&
      phone.value != "" &&
      socialLink.value != "" &&
      socialChannel.value != "" &&
      socialChannel.value != null &&
      password.value != "" &&
      confirmPassword.value != ""
    ) {
      if (!validateEmail(email.value)) {
        setEmail({
          value: email.value,
          error: true,
          helperText: "Please enter a valid email address",
        });
        invalid = true;
      }
      if (password.value != confirmPassword.value) {
        setConfirmPassword({
          value: confirmPassword.value,
          error: true,
          helperText: "Confirm password does not matches password",
        });
        invalid = true;
      }
      if (!isValidPhoneNumber(phone.value)) {
        setPhone({
          value: phone.value,
          error: true,
          helperText: "Enter a valid phone number",
        });
        invalid = true;
      }
      if (!isValidUrl(socialLink.value)) {
        setSocialLink({
          value: socialLink.value,
          error: true,
          helperText: "Enter a valid url",
        });
        invalid = true;
      }
      if (invalid) {
        document.body.scrollTop = document.documentElement.scrollTop = 250;
      }
      if (!invalid) {
        axios
          .post(url + "v1/auth/register", {
            name: name.value,
            email: email.value,
            phone: phone.value,
            social_media_link: socialLink.value,
            main_social_channel: socialChannel.value,
            password: password.value,
            role: "Creator",
            bio: bio.value,
          })
          .then((res) => {
            window.open("home", "_self");
          })
          .catch((err) => {
            console.log(err.response.data.message);
            if (err.response.data.type == "Phone") {
              setPhone({
                value: phone.value,
                error: true,
                helperText: err.response.data.message,
              });
            }
            if (err.response.data.type == "Email") {
              setEmail({
                value: email.value,
                error: true,
                helperText: err.response.data.message,
              });
            }
            document.body.scrollTop = document.documentElement.scrollTop = 250;
          });
      }
    }
  };

  const textFields = () => {
    return (
      <div
        style={{
          boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.08)",
          marginTop: 48,
          padding: 48,
          maxHeight: "calc(100vh - 275px)",
          overflow: "auto",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#171717",
            fontFamily: "Inter",
            fontSize: "32px",
            fontWeight: "500",
            textAlign: "center",
          }}
        >
          Create your account
        </p>
        <div style={{ marginTop: 32 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Name"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={Login}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(setName);
                    }}
                  />
                </InputAdornment>
              ),
              style: { borderColor: "red" },
            }}
            className="input_class_name1"
            style={{
              width: 492,
              display: "block",
              paddingRight: 16,
              marginTop: 32,
            }}
            type="text"
            value={name.value}
            // error={name.error}
            // helperText={name.helperText}
            onChange={(e) => {
              handleChange(setName, e.target.value);
            }}
          />
          {name.error && <p className="class_helper_text">{name.helperText}</p>}
        </div>
        <div style={{ marginTop: 32 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Email"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={Login}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(setEmail);
                    }}
                  />
                </InputAdornment>
              ),
              style: { borderColor: "red" },
            }}
            className="input_class_name1"
            style={{
              width: 492,
              display: "block",
              paddingRight: 16,
              marginTop: 32,
            }}
            type="text"
            value={email.value}
            // error={email.error}
            // helperText={email.helperText}
            onChange={(e) => {
              handleChange(setEmail, e.target.value);
            }}
          />
          {email.error && (
            <p className="class_helper_text">{email.helperText}</p>
          )}
        </div>
        <div style={{ marginTop: 32 }}>
          <PhoneInput
            placeholder="Phone"
            value={phone.value}
            onChange={(val) => {
              setPhone({ value: val, error: false, helperText: "" });
            }}
            maxLength={11}
            defaultCountry="IN"
            className="input_class_name1"
            style={{
              display: "flex",
              paddingRight: 16,
              marginTop: 32,
              height: 29,
            }}
          />
          {phone.error && (
            <p className="class_helper_text">{phone.helperText}</p>
          )}
        </div>
        <div style={{ marginTop: 32 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Social media link"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={Login}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleRemove(setSocialLink);
                    }}
                  />
                </InputAdornment>
              ),
              style: { borderColor: "red" },
            }}
            className="input_class_name1"
            style={{
              width: 492,
              display: "block",
              paddingRight: 16,
              marginTop: 32,
            }}
            type="url"
            value={socialLink.value}
            // error={socialLink.error}
            // helperText={socialLink.helperText}
            onChange={(e) => {
              handleChange(setSocialLink, e.target.value);
            }}
          />
          {socialLink.error && (
            <p className="class_helper_text">{socialLink.helperText}</p>
          )}
        </div>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          multiple={false}
          options={socialMedias}
          className="input_class_name1"
          style={{
            paddingRight: 16,
            marginTop: 32,
            height: 29,
          }}
          renderInput={(params) => (
            <TextField {...params} placeholder="Main social channel" />
          )}
          value={socialChannel.value}
          onChange={(event, newValue) => {
            setSocialChannel({ value: newValue, error: false, helperText: "" });
          }}
        />
        {socialChannel.error && (
          <p className="class_helper_text">{socialChannel.helperText}</p>
        )}
        <div style={{ marginTop: 32 }}>
          <textarea
            className="input_class_name"
            placeholder="Add your bio"
            style={{ height: 54 }}
            value={bio.value}
            onChange={(e) => {
              handleChange(setBio, e.target.value);
            }}
          />
          {bio.error && <p className="class_helper_text">{bio.helperText}</p>}
        </div>
        <div style={{ marginTop: 32 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={Pass}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowPass(!showPass);
                    }}
                  />
                </InputAdornment>
              ),
            }}
            className="input_class_name1"
            style={{
              width: 492,
              display: "block",
              paddingRight: 16,
              marginTop: 32,
            }}
            type={showPass ? "text" : "password"}
            value={password.value}
            onChange={(e) => {
              handleChange(setPassword, e.target.value);
            }}
          />
          {password.error && (
            <p className="class_helper_text">{password.helperText}</p>
          )}
        </div>
        <div style={{ marginTop: 32 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            label="Confirm password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <img
                    src={Pass}
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setShowConfirmPass(!showConfirmPass);
                    }}
                  />
                </InputAdornment>
              ),
              style: { borderColor: "red" },
            }}
            className="input_class_name1"
            style={{
              width: 492,
              display: "block",
              paddingRight: 16,
              marginTop: 32,
            }}
            type={showConfirmPass ? "text" : "password"}
            value={confirmPassword.value}
            onChange={(e) => {
              handleChange(setConfirmPassword, e.target.value);
            }}
          />
          {confirmPassword.error && (
            <p className="class_helper_text">{confirmPassword.helperText}</p>
          )}
        </div>

        <button
          style={{
            border: "none",
            outline: "none",
            width: 508,
            height: 56,
            background: "black",
            fontFamily: "Inter",
            color: "white",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 18,
            cursor: "pointer",
            marginTop: 32,
          }}
          onClick={() => {
            handleRegister();
          }}
        >
          Create Account
        </button>
        <div style={{ display: "flex", margin: "24px 0px 0px 0px" }}>
          <p
            style={{
              margin: 0,
              color: "#737373",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Already have an account?{" "}
          </p>
          <p
            style={{
              margin: 0,
              marginLeft: 8,
              color: "#171717",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 18,
              cursor: "pointer",
              borderBottomColor: "#4F90F0",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
            }}
            onClick={() => {
              window.open("login", "_self");
            }}
          >
            Login
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ maxWidth: "1520px", display: "flex", margin: "auto" }}>
        <div style={{ flex: 1, padding: 48 }}>
          <img src={Logo} style={{ objectFit: "cover", height: 40 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            {textFields()}
          </div>
        </div>
        {!isMobile && (
          <img
            src={LoginPic}
            style={{
              flex: 1,
              width: "40%",
              objectFit: "cover",
              height: "100vh",
              borderRadius: "32px 0px 0px 32px",
            }}
          />
        )}
      </div>
    </div>
  );
}

const socialMedias = [
  "Facebook",
  "Twitter",
  "Instagram",
  "Youtube",
  "Snapchat",
];
