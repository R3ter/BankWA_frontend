import { gql } from "@apollo/client";

export const DEPOSIT = gql`
  mutation Deposit($amount: Float!, $userPassport: String!) {
    Deposit(amount: $amount, userPassport: $userPassport) {
      result
      msg
    }
  }
`;
export const UPDATECRIDET = gql`
  mutation updateCridet($amount: Float!, $userPassport: String!) {
    editCredit(amount: $amount, userPassport: $userPassport) {
      msg
      result
    }
  }
`;
export const ADDACCOUNT = gql`
  mutation AddAccount(
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
export const TRANSFER = gql`
  mutation Transfer($from: String!, $to: String!, $amount: Float!) {
    Transfer(amount: $amount, from: $from, to: $to) {
      msg
      result
    }
  }
`;

export const WITHDRAW = gql`
  mutation Withdraw($userPassport: String!, $amount: Float!) {
    WithdrawMoney(amount: $amount, userPassport: $userPassport) {
      result
      msg
    }
  }
`;
export const SETACTIVE = gql`
  mutation SetActive($userPassport: String!, $active: Boolean!) {
    setUserActive(active: $active, userPassport: $userPassport)
  }
`;
