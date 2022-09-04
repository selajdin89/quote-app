import React from "react";
import AuthForm from "../components/AuthForm";
import { Paper, Stack } from "@mui/material";

function Auth() {
  return (
    <Stack alignItems="center" marginTop={30}>
      <Paper
        elevation={4}
        sx={{
          "& .MuiPaper-root": {
            width: "25%",
            maxWidth: "400px",
            minWidth: "300px",
          },
        }}
      >
        <AuthForm />
      </Paper>
    </Stack>
  );
}

export default Auth;
