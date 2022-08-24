import React, { FunctionComponent } from "react";
import { ListItem, ValueOption } from "./interfaces";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface OptionProps {
  option: ListItem;
  onSelect: (value: ValueOption, question: string) => void;
}

const Options: FunctionComponent<OptionProps> = ({ option, onSelect }) => {
  const selectOption = (valueOption: ValueOption) => {
    onSelect(valueOption, option.text);
  };
  const { valueOptions } = option;

  return (
    <>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid blue",
          py: 2,
        }}
      >
        <Typography component="h1" variant="h5">
          {option.text}
        </Typography>

        <Stack direction="row" spacing={2} sx={{ py: 2 }}>
          <Button
            variant="contained"
            onClick={() => selectOption(valueOptions[0])}
          >
            {valueOptions[0].text}
          </Button>
          <Button
            variant="contained"
            onClick={() => selectOption(valueOptions[1])}
          >
            {valueOptions[1].text}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default Options;
