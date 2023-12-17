import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, IconButton } from "@mui/material";
import { useGlobalState } from "../../context/global";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Store } from "react-notifications-component";

export default function Appointments() {
  const { userInfo } = useGlobalState();
  const navigate = useNavigate();
  const isDoctor = userInfo.isDoctor == "doctor";
  const baseURL = "https://jsonplaceholder.typicode.com/users";
  const [appointmetState, setAppointmetState] = useState([
    {
      id: 11,
      name: "Taha Magdy",
      email: "tmagdy142@gmail.com",
    },
    {
      id: 22,
      name: "Taha Mohamed",
      email: "tmagdy142@gmail.com",
    },
  ]);
  const [SelectedAppointment, setSelectedAppointment] = useState({})
  useEffect(() => {
    axios.get(baseURL).then((resualt) => {
      setAppointmetState([ ...appointmetState,...resualt.data]);
    });
    return () => {};
  }, []);
  const changeStatus = async (data) => {

    const response = await axios.post("http://localhost:5000/send-email", {
      recipient: data.email,
      subject: `Hello Mr ${data.name}`,
      content: ` Your Appointments Is ${data.type}  `,
    }).then((result)=>{
      Store.addNotification({
        title: "Info",
        message: ` Send Status For Patiemt Successfully and Send Email For Him`, 
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
    }).catch((error)=>{
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
  console.log("SelectedAppointment",SelectedAppointment);
  return (
    <div className="appointment">
      {!isDoctor&&<Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
        <Button variant="contained" color="primary" onClick={()=> navigate("/appointment/add")}>
          Add Appointment
        </Button>
      </Box>}



      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Patient</TableCell>
              <TableCell>Email</TableCell>
              {isDoctor ? <TableCell>Action</TableCell> : null}
            </TableRow>
          </TableHead>
          <TableBody>
            {appointmetState.length>0?appointmetState.map((appointment) => (
              <TableRow
                key={appointment.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{appointment.id}</TableCell>
                <TableCell>{appointment.name}</TableCell>
                <TableCell>{appointment.email}</TableCell>
                {isDoctor ? (
                  <TableCell>
                    <IconButton onClick={()=>{
                        setSelectedAppointment({...appointment,type:"accepted"});
                        changeStatus({...appointment,type:"accepted"});
                    }}>
                      <CheckIcon sx={{ color: "#0ed531" }} />
                    </IconButton>
                    <IconButton onClick={()=>{
                         setSelectedAppointment({...appointment,type:"rejected"})
                         changeStatus({...appointment,type:"rejected"});

                        }}>
                      <CloseIcon sx={{ color: "#dc3545" }} />
                    </IconButton>
                  </TableCell>
                ) : null}
              </TableRow>
            )):  <TableRow
            sx={{ height:"200px","& td":{
                color:"#ccc",
                fontSize:"22px",
                textAlign:"center"

            } }}
           
          >
            <TableCell  colSpan={3}>No Data Fount</TableCell>
            
          </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
