import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DocumentNode, useMutation } from "@apollo/client";
import { CircularProgress } from "@mui/material";
import { IResultMsgEditCredit } from "../API/Interfaces/IResultMsg";

export default ({
  message,
  userPassport,
  api,
  setMtext,
  refetch,
}: {
  message: string;
  userPassport: string;
  setMtext: ({ msg, error }: { msg: string; error: boolean }) => void;
  api: DocumentNode;
  refetch: () => void;
}) => {
  const [open, setOpen] = React.useState(false);

  const [mutate, { loading, data }] = useMutation<IResultMsgEditCredit>(api);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const amount = React.useRef(0);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen} variant="outlined" color="secondary">
        {message}
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Credit</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <TextField
            onChange={(e) => {
              amount.current = +e.target.value;
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
              setMtext({
                msg: "",
                error: false,
              });
              mutate({
                variables: { amount: amount.current, userPassport },
                onCompleted({ editCredit: { result, msg } }) {
                  setMtext({
                    msg: msg || "",
                    error: !result,
                  });
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
