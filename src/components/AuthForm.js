import {
  Box,
  TextField,
  Stack,
  Button,
  FormHelperText,
  CircularProgress,
  Typography,
} from "@mui/material";

import { useState, useContext } from "react";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [emailIsTouched, setEmailIsTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    resetFields();
  };

  const handleEmail = (event) => {
    setEmailValue(event.target.value);
  };

  const emailBlurHandler = () => {
    setEmailIsTouched(true);
  };
  const passwordBlurHandler = () => {
    setPasswordIsTouched(true);
  };

  const handlePassword = (event) => {
    setPasswordValue(event.target.value);
  };

  const resetFields = () => {
    setEmailValue("");
    setPasswordValue("");
    setEmailIsTouched(false);
    setPasswordIsTouched(false);
  };

  const enteredEmail = emailValue;
  const enteredPassword = passwordValue;

  const emailIsNotValid = !enteredEmail.trim().includes("@") && emailIsTouched;
  const passwordIsNotValid = enteredPassword.length < 6 && passwordIsTouched;

  const formIsValid = !emailIsNotValid && !passwordIsNotValid;

  const submitHandler = (event) => {
    event.preventDefault();

    setIsLoading(true);
    setEmailIsTouched(true);
    setPasswordIsTouched(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9kjiNa4ojGomm-vbTCL7gHqEOvxaGWYY";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC9kjiNa4ojGomm-vbTCL7gHqEOvxaGWYY";
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
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
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString());
        navigate("/quote", { replace: true });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <Box
      onSubmit={submitHandler}
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <Stack justifyContent="center" alignItems="center" p={4}>
        <TextField
          onBlur={emailBlurHandler}
          onChange={handleEmail}
          id="outlined-email-input"
          label="Email"
          type="email"
          value={emailValue}
        />
        {emailIsNotValid && (
          <FormHelperText error id="component-helper-text">
            Enter a valid email adress
          </FormHelperText>
        )}

        <TextField
          onBlur={passwordBlurHandler}
          onChange={handlePassword}
          id="outlined-password-input"
          label="Password"
          type="password"
          value={passwordValue}
        />
        {passwordIsNotValid && (
          <FormHelperText error id="component-helper-text">
            Valid password required
          </FormHelperText>
        )}
        {!isLoading && (
          <Button type="submit" variant="contained" sx={{ mt: "20px" }}>
            {isLogin ? "Login" : "Create account"}
          </Button>
        )}
        {isLoading && <CircularProgress />}
        <Button
          onClick={switchAuthModeHandler}
          variant="text"
          size="small"
          sx={{ mt: "15px" }}
        >
          <Typography color="blackColor" textTransform="none">
            {!isLogin ? "Login with existing account" : "Sign up"}
          </Typography>
        </Button>
      </Stack>
    </Box>
  );
}

export default AuthForm;
