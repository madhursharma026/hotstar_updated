import { gql } from "@apollo/client";

export const LogoutSchema = gql`
  mutation Logout(
    $userId: Int!
    $userCollection: EUserCollections
    $device: String
  ) {
    logout(
      logoutInput: {
        userId: $userId
        userCollection: $userCollection
        device: $device
      }
    )
  }
`;
