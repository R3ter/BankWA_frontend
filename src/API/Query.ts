import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query MyQuery {
    getAllUsers {
      name
      passportNumber
      credit
      cash
      role
      active
    }
  }
`;
