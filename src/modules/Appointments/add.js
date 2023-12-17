import { FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";

export default function Add() {
  const navigate = useNavigate();
  const [appointmentState, setAppointmentState] = useState({
    name: "",
    email: "",
    doctorName: "",
    doctorEmail: "",
  });
  const baseURL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    axios.get(baseURL).then((resualt) => {
      // setAppointmetState([ ...appointmetState,...resualt.data]);
    });
    return () => {};
  }, []);
  const add = async () => {
    const res = await axios
      .post(baseURL, { ...appointmentState })
      .then(async(res) => {
        await axios
        .post("http://localhost:5000/send-email", {
          recipient: appointmentState.doctorEmail,
          subject: "Hello Docter",
          content: `There is New Request From Patient Name ${appointmentState.name}`,
        }).then(()=>{
            Store.addNotification({
                title: "Info",
                message: "Create Appointment successfully and Send Email For Doctor",
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
                  navigate("/appointments");
                },
              });
        })








      
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
            duration: 3000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      });
  };

  return (
    <div className="addAppointment">
      <div className="login-form p-5">
        <h6 className="text-center">Add Appoinment</h6>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Full Name</label>
          <TextField
            fullWidth
            placeholder="Enter Your Name"
            variant="outlined"
            value={appointmentState.name}
            onChange={(e) =>
              setAppointmentState({ ...appointmentState, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Email Address</label>
          <TextField
            fullWidth
            placeholder="Enter Your Email Address"
            variant="outlined"
            value={appointmentState.email}
            onChange={(e) =>
              setAppointmentState({
                ...appointmentState,
                email: e.target.value,
              })
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Doctor Name</label>
          <TextField
            fullWidth
            placeholder="Enter Doctor Name"
            variant="outlined"
            value={appointmentState.doctorName}
            onChange={(e) =>
              setAppointmentState({
                ...appointmentState,
                doctorName: e.target.value,
              })
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Email Address (*Note after adding Appointment , send email notification on this mail)</label>
          <TextField
            fullWidth
            placeholder="Enter Doctor Email Address"
            variant="outlined"
            value={appointmentState.doctorEmail}
            onChange={(e) =>
              setAppointmentState({
                ...appointmentState,
                doctorEmail: e.target.value,
              })
            }
          />
        </FormControl>

        <button className="btn btn-primary w-100" onClick={add}>
          Create Appointment
        </button>
      </div>
    </div>
  );
}
