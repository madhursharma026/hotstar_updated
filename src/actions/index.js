import {useEffect} from "react";
import {useMutation} from "@apollo/client";
import {LogoutSchema} from "../Schemas/LogoutSchema";

export const LoginDetailsSave = (id, MobileNumber, created_at, login_token, jwt_token) => {
    return {
        type: "LoginDetailsSave",
        payload: {
            id: id,
            MobileNumber: MobileNumber,
            created_at: created_at,
            login_token: login_token,
            jwt_token: jwt_token
        }
    }
}

export const HomepageDataSave = (dataList) => {
    return {
        type: "HomepageDataSave",
        payload: {
            dataList: dataList
        }
    }
}
export const HeaderSearch = (value) => {
    return {
        type: "HeaderSearch",
        payload: {
            value
        }
    }
}

export const LogoutUser = () => {
    localStorage.setItem("token",'')
    return {
        type: "LogoutUser"
    }
}



