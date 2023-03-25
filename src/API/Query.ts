import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query MyQuery($starts: Float, $ends: Float, $onlyActive: Boolean) {
    getAllUsers(
      filter: { starts: $starts, ends: $ends }
      onlyActive: $onlyActive
    ) {
      name
      passportNumber
      credit
      cash
      role
      active
    }
  }
`;
