import React, { Component, useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import "./Login.css";
import { LoginDetailsSave } from "../actions/index";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useMutation } from "@apollo/client";
import { OPTVerification } from "../Schemas/OPTSchema";
import { useHistory } from "react-router-dom";
import {LogoutSchema} from "../Schemas/LogoutSchema";

export const OTPInputField = ({ dispatch, entered_mobile_number, BaseUrl }) => {
  const navigate = useHistory();
  useEffect(() => {
    if (!entered_mobile_number) navigate.push("/login");
  }, []);

  //STATES
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //HANDLERS
  const handleChange = (generatedOTP) => setGeneratedOTP(generatedOTP);

  const handleErrorClick = (value) => {
    setErrorMessage(value)
    setErrorOpen(true);
    console.log(value)
  };

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorOpen(false);
  };

  // async FormSubmitConfirmOTP(e) {
  //     e.preventDefault()
  //     fetch(`${this.props.BaseUrl}/confirm_otp_process/${this.state.generatedOTP}`).then((result) => {
  //         result.json().then((resp) => {
  //             if (resp.info === "success") {
  //                 this.props.dispatch(LoginDetailsSave(resp.UserDetail[0], resp.UserDetail[1], resp.UserDetail[2], resp.UserDetail[3]))
  //             } else {
  //                 this.setState({ errorMessage: resp.info })
  //                 this.handleErrorClick()
  //             }
  //         })
  //     })
  // }

  //FUNCTIONS
  const [OPTMutation, {error}] = useMutation(OPTVerification);
  const [logoutMutation, {error:logoutError}] = useMutation(LogoutSchema);
  const history = useHistory()
  console.log(logoutError)

  const FormSubmitConfirmOTP = async (e) => {
    e.preventDefault();
    console.log(generatedOTP)
    console.log(entered_mobile_number)
    // await logoutMutation({variables:{
    // { userId: 10384, userCollection: SUPER_MATE, device: "PC" }
    //   }})
    const result = await OPTMutation({
      variables: { optCode: generatedOTP, phoneNumber: `+91${entered_mobile_number}` },
    }).then((result)=>{
      console.log(result?.data)
      localStorage.setItem("token", result?.data?.webLoginVerification?.token);
      localStorage.setItem("expiresIn", result?.data?.webLoginVerification?.expiresIn);
      history.push('/')


    })
        .catch((reason)=>{
      console.log(reason)
      handleErrorClick(reason?.message);
    })
    // console.log(result?.errors)
    // if(result?.errors){
    //   handleErrorClick(result?.errors?.map(elem=>`${elem}, `))
    // }

  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      <form onSubmit={(e) => FormSubmitConfirmOTP(e)} className="otp_form">
        <div className="otp_form_input">
          <OtpInput
            inputStyle={{ fontSize: "24px", width: "100%" }}
            isInputNum={true}
            value={generatedOTP}
            onChange={handleChange}
            numInputs={5}
            separator={<span>-</span>}
            shouldAutoFocus={true}
          />
        </div>
        <button
          className="btn btn-primary mt-3 confirm_input_btn"
          type="submit"
        >
          Confirm
        </button>
      </form>
      <Snackbar
        open={errorOpen}
        autoHideDuration={1500}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};
