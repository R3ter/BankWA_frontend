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
export interface IResultMsgTransfer {
  Transfer: {
    msg: string;
    result: boolean;
  };
}

export interface IResultMsgWithdraw {
  WithdrawMoney: {
    msg: string;
    result: boolean;
  };
}
