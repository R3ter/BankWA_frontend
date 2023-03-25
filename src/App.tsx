import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@apollo/client";

import "./App.css";

import { Button, CircularProgress, Switch } from "@mui/material";
import { GET_ALL_USERS } from "./API/Query";
import IUser from "./API/Interfaces/IUser";
import Deposit from "./components/Deposit/Deposit";
import {
  ADDACCOUNT,
  DEPOSIT,
  TRANSFER,
  UPDATECRIDET,
  WITHDRAW,
} from "./API/Mutation";
import UpdateCredit from "./components/UpdateCredit";
import AddAccount from "./components/AddAccount";
import Transfer from "./components/Transfer";
import Withdraw from "./components/Withdraw";
import ActiveSwitch from "./components/ActiveSwitch";
function App() {
  const { loading, error, data, refetch } = useQuery<IUser>(GET_ALL_USERS);

  return (
    <div className="App">
      <AddAccount api={ADDACCOUNT} refetch={refetch} />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>passport number</TableCell>
              <TableCell align="center">name</TableCell>
              <TableCell align="center">credit</TableCell>
              <TableCell align="center">cash</TableCell>
              <TableCell align="center">role</TableCell>
              <TableCell align="center">Active</TableCell>
              <TableCell align="center">Deposit</TableCell>
              <TableCell align="center">edit credit</TableCell>
              <TableCell align="center">Transfer</TableCell>
              <TableCell align="center">withdraw</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading && (
              <TableRow sx={{ height: "200px" }}>
                <CircularProgress color="secondary" />
              </TableRow>
            )}
            {data &&
              data.getAllUsers.map((row) => (
                <TableRow
                  key={"row.name"}
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
                      refetch={refetch}
                      userPassport={row.passportNumber + ""}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <UpdateCredit
                      api={UPDATECRIDET}
                      message="Update Credit"
                      refetch={refetch}
                      userPassport={row.passportNumber + ""}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Transfer
                      message="Transfer Money"
                      userPassport={row.passportNumber + ""}
                      api={TRANSFER}
                      refetch={refetch}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Withdraw
                      message="Withdraw"
                      userPassport={row.passportNumber + ""}
                      api={WITHDRAW}
                      refetch={refetch}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default App;
