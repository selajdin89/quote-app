import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

function StartingPage() {
  return (
    <Box
      sx={{
        textAlign: "center",
        mt: 28,
        color: "white",
      }}
    >
      <Typography variant="h3" fontFamily="cursive" mb={2}>
        Programmers need to be inspired, and we care about that 👌
      </Typography>
      <Typography variant="h6" fontFamily="cursive" mb={2}>
        Login or create your account to get some nice motivational quote for
        everyday.
      </Typography>

      <Link style={{ textDecoration: "none", color: "inherit" }} to="/auth">
        <Button size="large" variant="contained" sx={{ mt: 4 }}>
          Login
        </Button>
      </Link>
    </Box>
  );
}

export default StartingPage;
