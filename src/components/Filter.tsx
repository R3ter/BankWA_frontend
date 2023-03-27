import { Button, TextField } from "@mui/material";
import { RefObject, useRef } from "react";

export default ({
  refetch,
  filter,
  setMtext,
}: {
  refetch: Function;
  setMtext: Function;
  filter: {
    current: {
      maxCash: number;
      minCash: number;
      onlyActive: boolean;
      sort: string;
    };
  };
}) => {
  const textFilter = useRef<{
    min: RefObject<any> | null;
    max: RefObject<any> | null;
  }>({ max: useRef(null), min: useRef(null) });
  return (
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
  );
};
