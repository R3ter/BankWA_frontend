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
  IResultMsgEditCredit,
  IResultMsgTransfer,
} from "../API/Interfaces/IResultMsg";
import PopMessage from "./PopMessage";

export default ({
  message,
  userPassport,
  api,
  refetch,
}: {
  message: string;
  userPassport: string;
  api: DocumentNode;
  refetch: () => {};
}) => {
  const [open, setOpen] = React.useState(false);
  const [popmessage, setMessage] = React.useState(false);
  const [mutate, { loading, data }] = useMutation<IResultMsgTransfer>(api);

  const handleClickOpen = () => {
    setMessage(false);
    setOpen(true);
  };
  const amount = React.useRef({ amount: 0, to: "" });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {popmessage && data && (
        <PopMessage
          open={!!data}
          text={data?.Transfer.msg || ""}
          type={data?.Transfer.result ? "success" : "error"}
        />
      )}
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        {message}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Credit</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            onChange={(e) => {
              amount.current.to = e.target.value;
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Transfer To (passport number)"
            fullWidth
            variant="standard"
          />
          <TextField
            onChange={(e) => {
              amount.current.amount = +e.target.value;
            }}
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            fullWidth
            variant="standard"
            type={"number"}
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
                variables: {
                  amount: amount.current.amount,
                  from: userPassport,
                  to: amount.current.to,
                },
                onCompleted({ Transfer: { result } }) {
                  if (result) {
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
