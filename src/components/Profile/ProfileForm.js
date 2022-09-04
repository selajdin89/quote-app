import { useContext, useRef, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  FormHelperText,
  CircularProgress,
  Typography,
} from "@mui/material";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

function ProfileForm() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const navigate = useNavigate();

  const newPaswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    const newenteredPassword = newPaswordInputRef.current.value;
    if (newenteredPassword.length < 6) {
      setError(true);
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC9kjiNa4ojGomm-vbTCL7gHqEOvxaGWYY",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: authCtx.token,
          password: newenteredPassword,
          returnSecureToken: false,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setIsLoading(false);
        navigate("/", { replace: true });
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <Stack>
      <Box
        sx={{ display: "flex", flexDirection: "column" }}
        component="form"
        onSubmit={submitHandler}
        noValidate
        autoComplete="off"
      >
        <TextField
          inputRef={newPaswordInputRef}
          id="filled-password-input"
          label="Type new password"
          type="password"
          variant="filled"
        />
        {error && (
          <FormHelperText error id="component-helper-text">
            Password must be longer then six characters!
          </FormHelperText>
        )}

        {!isLoading && (
          <Button
            type="submit"
            variant="outlined"
            sx={{ mt: 3, color: "blackColor" }}
          >
            Reset Password
          </Button>
        )}
        {isLoading && <CircularProgress />}
      </Box>
    </Stack>
  );
}

export default ProfileForm;
