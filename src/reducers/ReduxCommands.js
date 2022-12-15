import {useMutation} from "@apollo/client";
import {LogoutSchema} from "../Schemas/LogoutSchema";

const initialStateList = {
    LoginDetails: [],
    HomepageData: '',
    SearchInput:''
}

function ReduxCommands(state = initialStateList, action) {

    switch (action.type) {
        case "LoginDetailsSave":
            return {
                LoginDetails: [{ id: action.payload.id, MobileNumber: action.payload.MobileNumber, created_at: action.payload.created_at, login_token: action.payload.login_token, jwt_token: action.payload.jwt_token }],
                HomepageData: (state.HomepageData)
            }
        case "HomepageDataSave":
            return {
                LoginDetails: (state.LoginDetails),
                HomepageData: (action.payload.dataList)
            }
        case "LogoutUser":
            return {
                LoginDetails: [],
                HomepageData: ""
            }
        case "HeaderSearch":
            return {
                SearchInput: action.payload.value
            }
        default: return state
    }
}

export default ReduxCommands;


