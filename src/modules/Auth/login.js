import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import { useGlobalDispatch } from "../../context/global";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const [loginState, setLoginState] = useState({
    email: "",
    password: "",
  });

  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
  });

  const login = async () => {
    const user = await signInWithEmailAndPassword(
      auth,
      loginState.email,
      loginState.password
    )
      .then((result) => {
        Store.addNotification({
          title: "Info",
          message: "Logined successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true,
            pauseOnHover: true,
          },
          onRemoval: () => {
            dispatch({
              type: "login",
              isAuth: true,
              token: result._tokenResponse.idToken,
              userInfo: {
                email: result._tokenResponse.email,
                name: result._tokenResponse.displayName,
                isDoctor: result._tokenResponse.profilePicture,
              },
            });
            navigate("/dashboard");
          },
        });
      })
      .catch((error) => {
        console.log(error.message);
        Store.addNotification({
          title: "Something Went Wrong!",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      });
  };

  return (
    <div className="login">
      <div className="login-form p-5">
        <h6 className="text-center">Login</h6>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Email Address</label>
          <TextField
            fullWidth
            placeholder="Enter Your Email Address"
            variant="outlined"
            value={loginState.email}
            onChange={(e) =>
              setLoginState({ ...loginState, email: e.target.value })
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Password</label>
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="Enter Your Email Address"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            value={loginState.password}
            onChange={(e) =>
              setLoginState({ ...loginState, password: e.target.value })
            }
          />
        </FormControl>
        <button className="btn btn-primary w-100" onClick={login}>
          Login
        </button>
        <div className="d-flex justify-content-end new-user">
          <p>
            New User?{" "}
            <span role="button" onClick={() => navigate("/register")}>
              Signup
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
