import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function BasicButton({ text, size, disable }) {
  return (
    <Stack spacing={1} direction="row">
      <Button
        size={size ? size : "medium"}
        variant="contained"
        disabled={disable}
        style={{
          color: "whitesmoke",
          backgroundColor: "rgb(100 116 139)",
          fontWeight: "800",
          // width: "100%",
        }}
      >
        {text}
      </Button>
    </Stack>
  );
}
