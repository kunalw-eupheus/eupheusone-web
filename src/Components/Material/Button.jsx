import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButton({ text }) {
  return (
    <Stack spacing={1} direction="row">
      <Button
        variant="contained"
        style={{
          color: "whitesmoke",
          backgroundColor: "rgb(100 116 139)",
          fontWeight: "800",
        }}
      >
        {text}
      </Button>
    </Stack>
  );
}
