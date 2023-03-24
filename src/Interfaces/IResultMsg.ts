export interface IResultMsgDeposit {
  Deposit: {
    msg: string;
    result: boolean;
  };
}
export interface IResultMsgEditCredit {
  editCredit: {
    msg: string;
    result: boolean;
  };
}
export interface IResultMsgEditAddAccount {
  addAccount: {
    msg: string;
    error: boolean;
  };
}
