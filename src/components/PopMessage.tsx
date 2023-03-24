import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  text: string;
  open: boolean;
  type?: "success" | "error";
}
export default (props: IProps) => {
  const [state, setState] = useState(props.open);

  useEffect(() => {
    setState(props.open);
    const timer = setTimeout(() => {
      setState(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [props]);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={state}
    >
      <Alert severity={props.type || "error"}>{props.text}</Alert>
    </Snackbar>
  );
};
