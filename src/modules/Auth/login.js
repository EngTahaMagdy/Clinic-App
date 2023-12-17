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
import {useFormik} from "formik"

import * as yup from "yup"
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useGlobalDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  onAuthStateChanged(auth, (currentUser) => {
    console.log(currentUser);
  });

  const validationSchema = yup.object({
    email: yup
      .string("*user Email Required")
      .email("*userEmail Should be Email Format")
      .required("*user Email Required"),
    password: yup
      .string("*password Required")
      .min(6, "*password is min 6 characters")
      .required("*password Required"),
    
  });

const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: validationSchema,
    onSubmit: async(values) => {    
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
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
    },
  });
  return (
    <div className="login">
      <div className="login-form p-5">
        <h6 className="text-center">Login</h6>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Email Address</label>
          <TextField
          id="email"
            fullWidth
            placeholder="Enter Your Email Address"
            variant="outlined"
            value={formik.values.email}
            onChange={formik.handleChange}
            className={
                formik.errors.email && formik.touched.email ? "input-error" : ""
              }
           
          />
          {formik.touched.email && formik.errors.email ? (
        <span className="text-danger">{formik.errors.email}</span>
      ) : (
        ""
      )}
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Password</label>
          <OutlinedInput
            id="password"
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
            value={formik.values.password}
            onChange={formik.handleChange}

            
          />
          {formik.touched.password && formik.errors.password ? (
        <span className="text-danger">{formik.errors.password}</span>
      ) : (
        ""
      )}
        </FormControl>
        <button className="btn btn-primary w-100" onClick={formik.handleSubmit}>
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
