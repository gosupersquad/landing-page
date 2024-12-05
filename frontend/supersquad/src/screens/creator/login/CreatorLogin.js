import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import useMediaQuery from "@mui/material/useMediaQuery";

import "./CreatorLogin.css";
import LoginPic from "../../../resources/images/creator/login-pic.png";
import Logo from "../../../resources/images/triphome/logo.svg";
import Pass from "../../../resources/images/creator/eye-slash.svg";
import Login from "../../../resources/images/creator/close-circle.svg";
import axios from "axios";
import { url } from "../../../helper";

export default function CreatorLogin() {
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [verified, setVerified] = useState(false);
  const [passwordReset, setPasswordReset] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const [email, setEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    helperText: "",
  });

  const [showPass, setShowPass] = useState(false);

  const handleEmailChange = (e) => {
    setEmail({
      error: false,
      helperText: "",
      value: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      error: false,
      helperText: "",
      value: e.target.value,
    });
  };

  const handleLogin = () => {
    axios
      .post(url + "v1/auth/login", {
        email: email.value,
        password: password.value,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        window.open("home", "_self");
      })
      .catch((err) => {
        setEmail({
          value: email.value,
          error: true,
          helperText: err.response.data.message,
        });
        console.log(err.response.data.message);
      });
  };

  const [otpEmail, setOtpEmail] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [otpVal, setOtpVal] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [pass, setPass] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [confirmPass, setConfirmPass] = useState({
    value: "",
    error: false,
    helperText: "",
  });
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [counter, setCounter] = useState(0);
  const handleResendOTP = () => {
    setCounter(30);
    axios
      .post(url + "v1/auth/send_otp", {
        email: otpEmail.value,
      })
      .then((res) => {
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (counter >= 0) {
      let timer;
      if (counter > 0) {
        timer = setInterval(() => {
          setCounter((seconds) => seconds - 1);
        }, 1000);
      } else if (counter === 0) {
      }
      return () => clearInterval(timer);
    }
  }, [counter]);
  const textFields = () => {
    const handleOtpEmailChange = (e) => {
      setOtpEmail({ value: e.target.value, error: false, helperText: "" });
    };
    const handleSendOtp = () => {
      if (otpEmail.value) {
        axios
          .post(url + "v1/auth/send_otp", {
            email: otpEmail.value,
          })
          .then((res) => {
            if (res.data.status == "success") {
              setOtpSent(true);
            } else if (res.data.status == "error") {
              setOtpSent(false);
              setOtpEmail({
                value: otpEmail.value,
                error: true,
                helperText: res.data.message,
              });
            }
          })
          .catch((err) => console.log(err));
      }
    };
    const otpScreen = () => {
      const handleVerifyOtp = () => {
        if (otpVal.value) {
          axios
            .post(url + "v1/auth/verify_otp", {
              email: otpEmail.value,
              otp: otpVal.value,
            })
            .then((res) => {
              if (res.data.status == "success") {
                setVerified(true);
              } else if (res.data.status == "error") {
                setVerified(false);
                setOtpVal({
                  value: otpVal.value,
                  error: true,
                  helperText: res.data.message,
                });
              }
            })

            .catch((err) => console.log(err));
        }
      };
      return (
        <div
          style={{
            boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.08)",
            marginTop: 48,
            padding: 48,
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
            Reset your password
          </p>
          {!otpSent && (
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
                          setOtpEmail({
                            value: "",
                            error: false,
                            helperText: "",
                          });
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { borderColor: "red" },
                }}
                className="input_class_name1"
                style={{ width: 492, display: "block", paddingRight: 16 }}
                type="text"
                value={otpEmail.value}
                onChange={handleOtpEmailChange}
              />
              {otpEmail.error && (
                <p className="class_helper_text">{otpEmail.helperText}</p>
              )}
            </div>
          )}
          {otpSent && (
            <div style={{ marginTop: 32 }}>
              <TextField
                id="input-with-icon-textfield"
                variant="outlined"
                label="OTP"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <img
                        src={Login}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setOtpVal({
                            value: "",
                            error: false,
                            helperText: "",
                          });
                        }}
                      />
                    </InputAdornment>
                  ),
                  style: { borderColor: "red" },
                }}
                className="input_class_name1"
                style={{ width: 492, display: "block", paddingRight: 16 }}
                type="number"
                value={otpVal.value}
                onChange={(e) => {
                  setOtpVal({
                    value: e.target.value,
                    error: false,
                    helperText: "",
                  });
                }}
              />
              {counter == 0 && (
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
                    width: "fit-content",
                    marginTop: 24,
                  }}
                  onClick={handleResendOTP}
                >
                  Resend OTP
                </p>
              )}
              {counter != 0 && (
                <p
                  style={{
                    margin: 0,
                    color: "#737373",
                    fontFamily: "Inter",
                    fontWeight: 500,
                    fontSize: 16,
                    marginTop: 24,
                  }}
                >
                  You can request another OTP in {counter} seconds
                </p>
              )}
              {otpVal.error && (
                <p className="class_helper_text">{otpVal.helperText}</p>
              )}
            </div>
          )}
          {!otpSent && (
            <button
              style={{
                border: "none",
                outline: "none",
                width: "508px",
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
                handleSendOtp();
              }}
            >
              Send OTP
            </button>
          )}
          {otpSent && (
            <button
              style={{
                border: "none",
                outline: "none",
                width: "508px",
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
                handleVerifyOtp();
              }}
            >
              Verify
            </button>
          )}
          {/* <div style={{ display: "flex", margin: "24px 0px 0px 0px" }}>
            <p
              style={{
                margin: 0,
                color: "#737373",
                fontFamily: "Inter",
                fontWeight: 500,
                fontSize: 18,
              }}
            >
              Don’t have an account?{" "}
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
                width: 58,
              }}
            >
              Create
            </p>
          </div> */}
        </div>
      );
    };
    const handleSetPassword = () => {
      if (pass.value != confirmPass.value) {
        setConfirmPass({
          value: confirmPass.value,
          error: "true",
          helperText: "Passwords do not match",
        });
        return;
      }
      if (!passwordSuccess && pass.value) {
        axios
          .post(url + "v1/auth/reset_password", {
            email: otpEmail.value,
            newPassword: pass.value,
          })
          .then((res) => {
            if (res.data.status == "success") {
              setTimeout(() => {
                setVerified(false);
                setOtpSent(false);
                setIsForgotPassword(false);
              }, 2000);
              setPasswordSuccess(true);
              setOtpEmail({ value: "", error: false, helperText: "" });
              setOtpVal({ value: "", error: false, helperText: "" });
              setPass({ value: "", error: false, helperText: "" });
              setConfirmPass({ value: "", error: false, helperText: "" });
            }
          })
          .catch((err) => console.log(err));
      }
    };

    const setPassword = () => {
      return (
        <div
          style={{
            boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.08)",
            marginTop: 48,
            padding: 48,
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
            Reset your password
          </p>

          <div style={{ marginTop: 32 }}>
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              label="Password"
              className="input_class_name1"
              style={{ width: 492, display: "block", paddingRight: 16 }}
              type="text"
              value={pass.value}
              onChange={(e) => {
                setPass({
                  value: e.target.value,
                  error: false,
                  helperText: "",
                });
              }}
            />
            {pass.error && (
              <p className="class_helper_text">{pass.helperText}</p>
            )}
          </div>

          <div style={{ marginTop: 32 }}>
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              label="Confirm Password"
              className="input_class_name1"
              style={{ width: 492, display: "block", paddingRight: 16 }}
              type="text"
              value={confirmPass.value}
              onChange={(e) => {
                setConfirmPass({
                  value: e.target.value,
                  error: false,
                  helperText: "",
                });
              }}
            />
            {confirmPass.error && (
              <p className="class_helper_text">{confirmPass.helperText}</p>
            )}
          </div>

          <button
            style={{
              border: "none",
              outline: "none",
              width: "508px",
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
              handleSetPassword();
            }}
          >
            Reset password
          </button>
          {passwordSuccess && (
            <p
              style={{
                fontFamily: "Inter",
                fontWeight: 500,
                color: "green",
                fontSize: 18,
                margin: "16px 0px",
                textAlign: "center",
              }}
            >
              Password reset successfully, redirecting to login page...
            </p>
          )}
        </div>
      );
    };

    if (isForgotPassword) {
      if (verified) {
        return setPassword();
      } else {
        return otpScreen();
      }
    } else {
      return (
        <div
          style={{
            boxShadow: "0px 10px 60px 0px rgba(0, 0, 0, 0.08)",
            marginTop: 48,
            padding: 48,
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
            Log in to your account
          </p>
          <div style={{ marginTop: 32 }}>
            <TextField
              id="input-with-icon-textfield"
              variant="outlined"
              label="Email"
              className="input_class_name1"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <img src={Login} style={{ cursor: "pointer" }} />
                  </InputAdornment>
                ),
                style: { borderColor: "red" },
              }}
              style={{ width: 492, display: "block", paddingRight: 16 }}
              type="text"
              value={email.value}
              // error={email.error}
              // helperText={email.helperText}
              onChange={handleEmailChange}
            />
            {email.error && (
              <p className="class_helper_text">{email.helperText}</p>
            )}
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
                style: { borderColor: "red" },
              }}
              className="input_class_name1"
              style={{ width: 492, display: "block", paddingRight: 16 }}
              type={showPass ? "text" : "password"}
              value={password.value}
              // error={password.error}
              // helperText={password.helperText}
              onChange={handlePasswordChange}
            />
            {password.error && (
              <p className="class_helper_text">{password.helperText}</p>
            )}
          </div>

          <p
            style={{
              margin: "24px 0px",
              color: "#171717",
              fontFamily: "Inter",
              fontWeight: 500,
              fontSize: 18,
              cursor: "pointer",
              borderBottomColor: "#4F90F0",
              borderBottomWidth: "1px",
              borderBottomStyle: "solid",
              width: 154,
            }}
            onClick={() => {
              setIsForgotPassword(true);
            }}
          >
            Forgot password?
          </p>
          <button
            style={{
              border: "none",
              outline: "none",
              width: "508px",
              height: 56,
              background: "black",
              fontFamily: "Inter",
              color: "white",
              borderRadius: 8,
              fontWeight: 500,
              fontSize: 18,
              cursor: "pointer",
            }}
            onClick={handleLogin}
          >
            Log In
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
              Don’t have an account?{" "}
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
                width: 58,
              }}
              onClick={() => {
                window.open("signup", "_self");
              }}
            >
              Create
            </p>
          </div>
        </div>
      );
    }
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
