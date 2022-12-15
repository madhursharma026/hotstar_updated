import {gql} from "@apollo/client";

export const loginQuery = gql`
    
    mutation login($phoneNumber:String!) {
        webLogin(webLoginInput: { otpType: SMS, phoneNumber: $phoneNumber })
    }

`