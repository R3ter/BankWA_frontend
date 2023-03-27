import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "@apollo/client";

import { CircularProgress, Switch } from "@mui/material";
import { GET_ALL_USERS } from "../API/Query";
import IUser from "../API/Interfaces/IUser";
import { ADDACCOUNT } from "../API/Mutation";
import AddAccount from "../components/AddAccount";
import { useRef, useState } from "react";
import PopMessage from "../components/PopMessage";
import Filter from "../components/Filter";
import CustomTableRow from "../components/CustomTableRow";
import Sort from "../components/Sort";
export default () => {
  const filter = useRef({
    maxCash: 0,
    minCash: 0,
    onlyActive: false,
    sort: "cash",
  });
  const [mtext, setMtext] = useState({ msg: "", error: false });

  const {
    loading,
    data,
    refetch: refresh,
  } = useQuery<IUser>(GET_ALL_USERS, {
    notifyOnNetworkStatusChange: true,
    variables: {
      starts: filter.current.minCash,
      ends: filter.current.maxCash,
      onlyActive: filter.current.onlyActive,

      sortBy: filter.current.sort,
    },
  });
  const refetch = async () => {
    await refresh({
      starts: filter.current.minCash,
      ends: filter.current.maxCash,
      sortBy: filter.current.sort,
      onlyActive: filter.current.onlyActive,
    });
  };
  return (
    <>
      <PopMessage text={mtext.msg} type={mtext.error ? "error" : "success"} />
      <AddAccount setMtext={setMtext} api={ADDACCOUNT} refetch={refetch} />
      <TableContainer component={Paper}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Filter filter={filter} refetch={refetch} setMtext={setMtext} />
          <Sort refetch={refetch} sort={filter} />
          <div>
            <label>Only active?</label>
            <Switch
              onChange={(e) => {
                filter.current.onlyActive = e.target.checked;
                refetch();
              }}
            />
          </div>
        </div>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {[
                "passport number",
                "name",
                "credit",
                "cash",
                "role",
                "Active",
                "Deposit",
                "edit credit",
                "Transfer",
                "withdraw",
              ].map((e) => (
                <TableCell>{e}</TableCell>
              ))}
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
                <CustomTableRow
                  refetch={refetch}
                  row={row}
                  setMtext={setMtext}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
