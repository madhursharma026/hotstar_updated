import "./Login.css";
import { useSelector } from "react-redux";
import MuiAlert from "@mui/material/Alert";
import { useHistory } from "react-router-dom";
import LoginLogo from "./LoginLogo/LoginLogo.png";
import React, { useEffect, useState } from "react";
import { Input, InputAdornment, FormControl, Snackbar } from "@mui/material/";
import { gql, useMutation, useQuery } from "@apollo/client";
import { loginQuery } from "../Schemas/LoginSchema";
import { useAuth } from "../hooks/useAuth";
import CircularProgress from "@mui/material/CircularProgress";

function Login() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const [ErrorOpen, setErrorOpen] = React.useState(false);
  const [errorMessage, seterrorMessage] = React.useState("");
  const [LoginMobileNumber, setLoginMobileNumber] = useState("");
  const [generated_otp, setgenerated_otp] = useState("");
  const [entered_mobile_number, setentered_mobile_number] = useState("");
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(false);
  const gettingUserDetails = useSelector(
    (state) => state.ReduxCommands.LoginDetails
  );

  const {loading} = useAuth();

  function handleClick() {
    setOpen(true);
  }

  function handleErrorClick() {
    setErrorOpen(true);
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    history.push({
      pathname: "./confirm_otp",
      generated_otp: generated_otp,
      entered_mobile_number: entered_mobile_number,
    });
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const [loginMutation, { error }] = useMutation(loginQuery);
  console.log(error);

  async function LoginSubmitForm(e) {
    e.preventDefault();
    console.log("result");
    setLoginBtnDisabled(true);

    let result = await loginMutation({
      variables: { phoneNumber: `+91${LoginMobileNumber}` },
    }).catch(console.log);
    console.log(result);

    if (result?.data?.webLogin === "OTP code send successfully") {
      setentered_mobile_number(LoginMobileNumber);
      handleClick();
    } else {
      console.log(result?.error);
      seterrorMessage(result?.errors.map((elem) => `${elem}, `));
      handleErrorClick();
      setLoginBtnDisabled(false);
    }
  }


  if(loading) {
    return <></>
  }
  return (
    <>
      <div className="container-md text-center text-light pt-5">
        <div className="mb-2">
          <img src={LoginLogo} className="img-fluid LoginLogo" alt="#" />
        </div>
        <form className="p-3 p-md-5" onSubmit={LoginSubmitForm}>
          <FormControl variant="standard">
            <h5 className="mobile_number_label">Mobile Number</h5>
            <Input
              style={{ color: "white", fontSize: "20px" }}
              value={LoginMobileNumber}
              onChange={(e) => setLoginMobileNumber(e.target.value)}
              required
              inputProps={{ maxLength: 10, minLength: 10 }}
              autoFocus
              startAdornment={
                <InputAdornment position="start">
                  <span style={{ color: "white", fontSize: "20px" }}>+91</span>
                </InputAdornment>
              }
            />
            <button
              className="btn btn-primary w-100 mt-3"
              type="submit"
              disabled={loginBtnDisabled}
              style={{ position: "relative" }}
            >
              Login
              {loginBtnDisabled && (
                <CircularProgress
                  style={{
                    position: "absolute",
                    right: "-50px",
                    height: "30px",
                    width: "30px",
                    top: "3px",
                    bottom: "0",
                  }}
                />
              )}
            </button>
          </FormControl>
        </form>
      </div>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          OTP Send to your Mobile number
        </Alert>
      </Snackbar>
      <Snackbar
        open={ErrorOpen}
        autoHideDuration={1500}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage || "Something went wrong"}
        </Alert>
      </Snackbar>
    </>
  );
}
export default Login;
