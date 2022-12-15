import { gql } from "@apollo/client";

export const refreshTokenSchema = gql`
  mutation refreshToken($token: String!) {
    refreshToken(refreshToken: $token) {
      refreshToken
      token
    }
  }
`;
