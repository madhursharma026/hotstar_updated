
import './Login.css'
import React, { useEffect } from 'react'
import {OTPInputField} from './OTPInputField';
import LoginLogo from './LoginLogo/LoginLogo.png';
import { useDispatch, useSelector } from "react-redux"
import { useHistory, useLocation } from 'react-router-dom';


function ConfirmOTP(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])


    const history = useHistory()
    const location = useLocation();
    // const gettingUserDetails = useSelector((state) => state.ReduxCommands.LoginDetails);
    // {
    //     useEffect(() => {
    //         if (gettingUserDetails.length !== 0) {
    //             history.push("/")
    //         }
    //     })
    // }
    const dispatch = useDispatch();

    return (
        <>
            <div className='text-light mt-5'>
                <div className="container-lg">
                    <h1 className='text-center mb-3'><b><u>Confirm OTP</u></b></h1>
                    <div className="text-center mb-5">
                        <img src={LoginLogo} className="img-fluid LoginLogo" alt="#" />
                    </div>
                    <OTPInputField dispatch={dispatch} BaseUrl={props.BaseUrl} generated_otp={location.generated_otp} entered_mobile_number={location.entered_mobile_number} />
                </div>
            </div>
            <br /><br />
        </>
    );
}

export default ConfirmOTP;
