import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@apollo/client";

import "./App.css";

import { Button, CircularProgress, Switch, TextField } from "@mui/material";
import { GET_ALL_USERS } from "./API/Query";
import IUser from "./API/Interfaces/IUser";
import Deposit from "./components/Deposit";
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
import { RefObject, useRef, useState } from "react";
import PopMessage from "./components/PopMessage";
function App() {
  const filter = useRef({ maxCash: 0, minCash: 0, onlyActive: false });
  const [mtext, setMtext] = useState({ msg: "", error: false });
  const textFilter = useRef<{
    min: RefObject<any> | null;
    max: RefObject<any> | null;
  }>({ max: useRef(null), min: useRef(null) });
  const { loading, error, data, refetch } = useQuery<IUser>(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      starts: filter.current.minCash,
      ends: filter.current.maxCash,
    },
  });
  return (
    <div className="App">
      <PopMessage text={mtext.msg} type={mtext.error ? "error" : "success"} />
      <AddAccount api={ADDACCOUNT} refetch={refetch} />
      <TableContainer component={Paper}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <TextField
              onChange={(e) => {
                filter.current.minCash = +e.target.value;
              }}
              margin="dense"
              id="name"
              label="min cash"
              type={"number"}
              variant="standard"
              sx={{ margin: 1 }}
              inputRef={textFilter.current.min}
            />
            <TextField
              onChange={(e) => {
                filter.current.maxCash = +e.target.value;
              }}
              margin="dense"
              id="name"
              label="max cash"
              sx={{ margin: 1 }}
              type={"number"}
              inputRef={textFilter.current.max}
              variant="standard"
            />
            <Button
              variant="contained"
              sx={{ height: "100%", alignSelf: "end", marginLeft: 1 }}
              onClick={() => {
                refetch({
                  starts: filter.current.minCash,
                  ends: filter.current.maxCash,
                  onlyActive: filter.current.onlyActive,
                });
                setMtext({ msg: "", error: false });
              }}
            >
              Filter
            </Button>
            <Button
              color="error"
              variant="contained"
              sx={{ height: "100%", alignSelf: "end", marginLeft: 1 }}
              onClick={() => {
                filter.current.minCash = 0;
                filter.current.maxCash = 0;
                if (textFilter.current?.max?.current)
                  textFilter.current.max.current.value = 0;
                if (textFilter.current?.min?.current)
                  textFilter.current.min.current.value = 0;
                refetch({
                  starts: 0,
                  ends: 0,
                  onlyActive: filter.current.onlyActive,
                });
                setMtext({ msg: "", error: false });
              }}
            >
              clear
            </Button>
          </div>
          <div>
            <label>Only active?</label>
            <Switch
              onChange={(e) => {
                filter.current.onlyActive = e.target.checked;
                refetch({
                  starts: filter.current.minCash,
                  ends: filter.current.maxCash,
                  onlyActive: e.target.checked,
                });
                setMtext({ msg: "", error: false });
              }}
            />
          </div>
        </div>
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
                      setMtext={({ msg, error }) =>
                        setMtext({ ...{ msg, error } })
                      }
                      refetch={refetch}
                      userPassport={row.passportNumber + ""}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <UpdateCredit
                      api={UPDATECRIDET}
                      message="Update Credit"
                      refetch={refetch}
                      setMtext={({ msg, error }) =>
                        setMtext({ ...{ msg, error } })
                      }
                      userPassport={row.passportNumber + ""}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Transfer
                      message="Transfer Money"
                      userPassport={row.passportNumber + ""}
                      api={TRANSFER}
                      setMtext={({ msg, error }) =>
                        setMtext({ ...{ msg, error } })
                      }
                      refetch={refetch}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Withdraw
                      setMtext={({ msg, error }) =>
                        setMtext({ ...{ msg, error } })
                      }
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
