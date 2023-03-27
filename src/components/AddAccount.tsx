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
import { IResultMsgEditAddAccount } from "../API/Interfaces/IResultMsg";

export default ({
  api,
  refetch,
  setMtext,
}: {
  api: DocumentNode;
  refetch: () => void;
  setMtext: Function;
}) => {
  const [open, setOpen] = React.useState(false);
  const [mutate, { loading, data }] =
    useMutation<IResultMsgEditAddAccount>(api);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const amount = React.useRef<any>({
    passportNumber: "",
    name: "",
    password: "",
  });
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
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
          {["passportNumber", "name", "password"].map((v) => {
            return (
              <TextField
                onChange={(e) => {
                  amount.current[v] = e.target.value;
                }}
                autoFocus
                margin="dense"
                label={v}
                fullWidth
                variant="standard"
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button disabled={loading} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            onClick={() => {
              mutate({
                variables: { ...amount.current },
                onCompleted({ addAccount: { error, msg } }) {
                  setMtext({
                    msg: msg || "",
                    error: error,
                  });
                  if (!error) {
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
