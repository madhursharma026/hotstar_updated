import { gql } from "@apollo/client";

export const OPTVerification = gql`
  mutation OPTVerification($optCode:String!,$phoneNumber:String!) {
    webLoginVerification(
      webLoginVerificationInput: {
        otpCode:  $optCode
        phoneNumber:$phoneNumber
      }
    ) {
      token
      expiresIn
#      user
    }
  }
`;
