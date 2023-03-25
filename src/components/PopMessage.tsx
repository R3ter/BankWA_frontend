import { Snackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { useEffect, useRef, useState } from "react";

interface IProps {
  text: string;
  type?: "success" | "error";
}
export default ({ text, type }: IProps) => {
  const [state, setState] = useState({ text, open: !!text, type });

  useEffect(() => {
    setState({ text, open: !!text, type });
    const timer = setTimeout(() => {
      setState({ text: "", open: false, type });
    }, 5000);
    return () => clearTimeout(timer);
  }, [text]);

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <Snackbar
      anchorOrigin={{ horizontal: "right", vertical: "top" }}
      open={state.open}
    >
      <Alert severity={state.type || "error"}>{state.text}</Alert>
    </Snackbar>
  );
};
