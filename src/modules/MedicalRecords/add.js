import styled from "@emotion/styled";
import { Button, FormControl, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Store } from "react-notifications-component";
import { useNavigate } from "react-router-dom";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useGlobalDispatch, useGlobalState } from "../../context/global";

export default function Add() {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const dispatch = useGlobalDispatch();
  const { allRecords } = useGlobalState();
  const navigate = useNavigate();
  const [recordState, setRecordState] = useState({
    image: "",
    preview_image: "",
    name: "",
    doctorEmail: "",
  });

  const add = async () => {
    dispatch({ type: "Allrecords", allRecords: [...allRecords, recordState] });
    const response = await axios
      .post("http://localhost:5000/send-email", {
        recipient: recordState.doctorEmail,
        subject: "Hello Docter",
        content: `There is New Request From Patient Name ${recordState.name}`,
      })
      .then((result) => {
        Store.addNotification({
          title: "Info",
          message:
            "Upload Your Medical Records Successfully and Send Email For Doctor",
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
            navigate("/medical-records");
          },
        });
      })
      .catch((error) => {
        Store.addNotification({
          title: "Info",
          message: error,
          type: "danger",
          insert: "top",
          container: "top-right",
          animationIn: ["animated", "fadeIn"],
          animationOut: ["animated", "fadeOut"],
          dismiss: {
            duration: 1000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      });
  };

  return (
    <div className="addAppointment">
      <div className="login-form p-5">
        <h6 className="text-center">Add New Record</h6>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Name</label>
          <TextField
            fullWidth
            placeholder="Enter Your Name"
            variant="outlined"
            value={recordState.name}
            onChange={(e) =>
              setRecordState({ ...recordState, name: e.target.value })
            }
          />
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <label>Doctor Email Address</label>
          <TextField
            fullWidth
            placeholder="Enter Doctor Email Address"
            variant="outlined"
            value={recordState.doctorEmail}
            onChange={(e) =>
              setRecordState({ ...recordState, doctorEmail: e.target.value })
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mb: 4 }}>
          <label>Record Image</label>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Upload Your Record
            <VisuallyHiddenInput
              type="file"
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) =>
                setRecordState({
                  ...recordState,
                  preview_image: URL.createObjectURL(e.target.files[0]),
                  image: e.target.files[0],
                })
              }
            />
          </Button>
          {recordState.preview_image && (
            <img
              src={recordState.preview_image}
              alt="record"
              width={200}
              height={200}
            />
          )}
        </FormControl>

        <button className="btn btn-primary w-100" onClick={add}>
          Create Appointment
        </button>
      </div>
    </div>
  );
}
