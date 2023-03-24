import { gql } from "@apollo/client";

export const DEPOSIT = gql`
  mutation MyMutation($amount: Float!, $userPassport: String!) {
    Deposit(amount: $amount, userPassport: $userPassport) {
      result
      msg
    }
  }
`;
export const UPDATECRIDET = gql`
  mutation MyMutation($amount: Float!, $userPassport: String!) {
    editCredit(amount: $amount, userPassport: $userPassport) {
      msg
      result
    }
  }
`;
export const ADDACCOUNT = gql`
  mutation MyMutation(
    $passportNumber: String!
    $password: String!
    $name: String!
  ) {
    addAccount(
      userData: {
        passportNumber: $passportNumber
        password: $password
        name: $name
      }
    ) {
      error
      msg
    }
  }
`;
