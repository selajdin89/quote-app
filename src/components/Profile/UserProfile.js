import { Paper } from "@mui/material";
import React from "react";
import ProfileForm from "./ProfileForm";

function UserProfile() {
  return (
    <Paper sx={{ p: 6 }}>
      <ProfileForm />
    </Paper>
  );
}

export default UserProfile;
