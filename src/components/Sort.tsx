import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default ({
  sort,
  refetch,
}: {
  sort: { current: { sort: string } };
  refetch: () => void;
}) => {
  const [value, setValue] = React.useState("");
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
    sort.current.sort = (event.target as HTMLInputElement).value;
    refetch();
  };
  return (
    <FormControl>
      <FormLabel>Sort By</FormLabel>
      <RadioGroup value={value} onChange={handleRadioChange} row>
        <FormControlLabel value="credit" control={<Radio />} label="Credit" />
        <FormControlLabel value="cash" control={<Radio />} label="Cash" />
        <FormControlLabel
          value="passportNumber"
          control={<Radio />}
          label="Passport number"
        />
      </RadioGroup>
    </FormControl>
  );
};
