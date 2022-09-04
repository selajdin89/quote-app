import React from "react";
import UserProfile from "../components/Profile/UserProfile";
import { Stack } from "@mui/material";

function ProfilePage() {
  return (
    <Stack alignItems="center" mt={30}>
      <UserProfile />
    </Stack>
  );
}

export default ProfilePage;
