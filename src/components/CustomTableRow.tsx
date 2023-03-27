import { TableCell, TableRow } from "@mui/material";
import { DEPOSIT, TRANSFER, UPDATECRIDET, WITHDRAW } from "../API/Mutation";
import ActiveSwitch from "./ActiveSwitch";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
import UpdateCredit from "./UpdateCredit";
import Withdraw from "./Withdraw";

export default ({
  setMtext,
  refetch,
  row,
}: {
  setMtext: Function;
  refetch: () => {};
  row: {
    passportNumber: number;
    name: string;
    password: string;
    active: boolean;
    cash: number;
    credit: number;
    role: "user" | "admin";
  };
}) => (
  <TableRow
    key={row.passportNumber}
    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
  >
    <TableCell component="th" scope="row">
      {row.passportNumber}
    </TableCell>
    <TableCell align="center">{row.name}</TableCell>
    <TableCell align="center">{row.credit}</TableCell>
    <TableCell align="center">{row.cash}</TableCell>
    <TableCell align="center">{row.role}</TableCell>
    <ActiveSwitch
      active={row.active}
      passportNumber={"" + row.passportNumber}
    />

    <TableCell align="center">
      <Deposit
        api={DEPOSIT}
        message="Deposit"
        setMtext={({ msg, error }) => setMtext({ ...{ msg, error } })}
        refetch={refetch}
        userPassport={row.passportNumber + ""}
      />
    </TableCell>
    <TableCell align="center">
      <UpdateCredit
        api={UPDATECRIDET}
        message="Update Credit"
        refetch={refetch}
        setMtext={({ msg, error }) => setMtext({ ...{ msg, error } })}
        userPassport={row.passportNumber + ""}
      />
    </TableCell>
    <TableCell align="center">
      <Transfer
        message="Transfer Money"
        userPassport={row.passportNumber + ""}
        api={TRANSFER}
        setMtext={({ msg, error }) => setMtext({ ...{ msg, error } })}
        refetch={refetch}
      />
    </TableCell>
    <TableCell align="center">
      <Withdraw
        setMtext={({ msg, error }) => setMtext({ ...{ msg, error } })}
        message="Withdraw"
        userPassport={row.passportNumber + ""}
        api={WITHDRAW}
        refetch={refetch}
      />
    </TableCell>
  </TableRow>
);
