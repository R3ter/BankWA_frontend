import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DocumentNode, gql, useMutation } from "@apollo/client";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
import {
  IResultMsgEditAddAccount,
  IResultMsgEditCredit,
} from "../Interfaces/IResultMsg";
import PopMessage from "./PopMessage";

export default ({ api, refetch }: { api: DocumentNode; refetch: () => {} }) => {
  const [open, setOpen] = React.useState(false);
  const [popmessage, setMessage] = React.useState(false);
  const [mutate, { loading, data }] =
    useMutation<IResultMsgEditAddAccount>(api);

  const handleClickOpen = () => {
    setMessage(false);
    setOpen(true);
  };
  const amount = React.useRef({ passportNumber: "", name: "", password: "" });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {popmessage && data && (
        <PopMessage
          open={!!data}
          text={data?.addAccount.msg || "new user was added!"}
          type={!data?.addAccount.error ? "success" : "error"}
        />
      )}
      <Button
        onClick={handleClickOpen}
        sx={{ float: "right" }}
        variant="contained"
        color="success"
      >
        + create account
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Credit</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            onChange={(e) => {
              amount.current.passportNumber = e.target.value;
            }}
            autoFocus
            margin="dense"
            label="Passport ID"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              amount.current.name = e.target.value;
            }}
            margin="dense"
            label="name"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              amount.current.password = e.target.value;
            }}
            margin="dense"
            label="password"
            fullWidth
            variant="standard"
            type={"password"}
          />
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              setMessage(true);
              mutate({
                variables: { ...amount.current },
                onCompleted(data) {
                  if (!data.addAccount.error) {
                    handleClose();
                    refetch();
                  }
                },
              });
            }}
          >
            {loading ? <CircularProgress color="secondary" /> : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
