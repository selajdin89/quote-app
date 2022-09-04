import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AuthContext from "../../store/auth-context";

import PsychologyIcon from "@mui/icons-material/Psychology";
function MainNavigation() {
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/", { replace: true });
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color="primary"
        position="static"
        // sx={{ bgcolor: "primary", color: "rgba(0, 0, 0, 0.87)" }}
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="icon"
            sx={{ mr: 2 }}
          >
            <PsychologyIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            QG
          </Typography>
          {!authCtx.isLoggedIn && (
            <Link
              style={{
                color: "inherit",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              to="/auth"
            >
              <Button color="inherit">Login</Button>
            </Link>
          )}
          {authCtx.isLoggedIn && (
            <Link
              style={{
                color: "inherit",
                textTransform: "uppercase",
                textDecoration: "none",
              }}
              to="/profile"
            >
              <Button color="inherit">Profile</Button>
            </Link>
          )}
          {authCtx.isLoggedIn && (
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainNavigation;
