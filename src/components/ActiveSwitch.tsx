import { useMutation } from "@apollo/client";
import { CircularProgress, Switch, TableCell } from "@mui/material";
import { SETACTIVE } from "../API/Mutation";

export default ({
  passportNumber,
  active,
}: {
  passportNumber: string;
  active: boolean;
}) => {
  const [mutate, { loading, data }] = useMutation<{ setUserActive: boolean }>(
    SETACTIVE
  );

  return (
    <TableCell align="center">
      {loading && <CircularProgress color="secondary" />}
      {!loading && (
        <Switch
          onChange={() => {
            mutate({
              variables: {
                active: !(data ? data.setUserActive : active),
                userPassport: passportNumber,
              },
            });
          }}
          checked={data ? data.setUserActive : active}
        />
      )}
    </TableCell>
  );
};
