import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
} from "@mui/material";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase-config";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const SelectInput = styled(Select)(({ theme }) => ({
    "& .MuiSelect-nativeInput": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: "#F3F6F9",
      border: "1px solid",
      borderColor: "blue",
      fontSize: 16,
      width: "auto",
      padding: "10px 12px",
    },
  }));

  const [signupState, setSignupState] = useState({
    email: "",
    password: "",
    confirm_password: "",
    name: "",
    isDoctor: "",
  });

  const register = async () => {
    const res = await createUserWithEmailAndPassword(
      auth,
      signupState.email,
      signupState.password
    )
      .then(function () {
        let currentUser = auth.currentUser;
        Store.addNotification({
          title: "Info",
          message: "User Registered successfully",
          type: "success",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
          },
          onRemoval: () => {
            updateProfile(currentUser, {
              displayName: signupState.name,
              photoURL: signupState.isDoctor,
            });

            navigate("/login");
          },
        });

        // return updateProfile(currentUser,{
        //   displayName: signupState.name
        // });
      })
      .catch((error) => {
        Store.addNotification({
          title: "Something Went Wrong!",
          message: error.message,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      });
  };
  console.log(signupState);
  return (
    <div className="login">
      <div className="login-form p-5">
        <h6 className="text-center">Sign Up</h6>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Full Name</label>
          <TextField
            fullWidth
            placeholder="Enter Your Name"
            variant="outlined"
            value={signupState.name}
            onChange={(e) =>
              setSignupState({ ...signupState, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Email Address</label>
          <TextField
            fullWidth
            placeholder="Enter Your Email Address"
            variant="outlined"
            value={signupState.email}
            onChange={(e) =>
              setSignupState({ ...signupState, email: e.target.value })
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
            value={signupState.password}
            onChange={(e) =>
              setSignupState({ ...signupState, password: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Confirmation Password</label>
          <OutlinedInput
            id="outlined-adornment-password"
            placeholder="Enter Your Confirmation Password"
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
            value={signupState.confirm_password}
            onChange={(e) =>
              setSignupState({
                ...signupState,
                confirm_password: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>User Type</label>
          <SelectInput
            value={signupState.isDoctor}
            id="select-input"
            variant="outlined"
            onChange={(e) =>
              setSignupState({ ...signupState, isDoctor: e.target.value })
            }
          >
            <MenuItem value={"doctor"}>Doctor</MenuItem>
            <MenuItem value={"patient"}>Patient</MenuItem>
          </SelectInput>
        </FormControl>
        <button className="btn btn-primary w-100" onClick={register}>
          SignUp
        </button>
      </div>
    </div>
  );
}
