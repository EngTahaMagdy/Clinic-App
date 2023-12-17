import React, { useEffect, useState } from "react";
import { useGlobalState } from "../../context/global";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function Dashboard() {
  const { userInfo, allRecords, token } = useGlobalState();
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

  useEffect(() => {
    axios.get(baseURL).then((resualt) => {
      setAppointmetState([...appointmetState, ...resualt.data]);
    });
    return () => {};
  }, []);
  /************************************* */

  const sendEmailNotification = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-email", {
        recipient: "fefewf42@gmail.com",
        subject: "Hello from React.js",
        content: "This is a test email",
      });
      //const res = await axios.get("http://localhost:5000/api");
      ////   console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  /********************************************* */
  return (
    <div className="dashboard">
      <h6 onClick={sendEmailNotification}>
        Hello {isDoctor ? "DR" : "Mr"} :{" "}
        <span className="text-capitalize">{userInfo.name} </span>
      </h6>

      <div className="row">
        <div className="col-md-6">
          <div className="appointment-box">
            <h3 className="text-center">Appointment</h3>
            {appointmetState.length > 0 ? (
              <AppointmentBox data={appointmetState} />
            ) : (
              <div className="no-data">
                <h6>No Data Fount</h6>
              </div>
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="record-box">
            <h3 className="text-center">Medical Records</h3>
            {allRecords.length > 0 ? (
              <RecordsBox data={allRecords} />
            ) : (
              <div className="no-data">
                <h6>No Data Fount</h6>
              </div>
            )}
          </div>
        </div>

        <div className="col-md-6 mt-5">
          <div className="record-box">
            <h3 className="text-center">Notification</h3>

            <div className="no-data">
              <h6>Check your Personal Email To Recieve all Data</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RecordsBox(props) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div>
      {data.slice(0, 2).map((item, index) => (
        <div className="row">
          <div className="col-md-6">
            <p>Doctor Email :</p> {item.doctorEmail}
          </div>
          <div className="col-md-6">
            <p>Record :</p>
            <img src={item.preview_image} alt="record" width={60} height={60} />
          </div>
        </div>
      ))}
      <Button
        variant="outlined"
        color="info"
        sx={{ margin: "15px auto", display: "flex" }}
        onClick={() => navigate("/medical-records")}
      >
        More Data
      </Button>
    </div>
  );
}

export function AppointmentBox(props) {
  const { data } = props;
  const navigate = useNavigate();

  return (
    <div>
      {data.slice(0, 4).map((item, index) => (
        <div className="row">
          <div className="col-md-6 mb-3">
            <span>Name :</span> {item.name}
          </div>
          <div className="col-md-6 mb-3">
            <span>Email :</span>
            {item.email}
          </div>
        </div>
      ))}
      <Button
        variant="outlined"
        color="info"
        sx={{ margin: "15px auto", display: "flex" }}
        onClick={() => navigate("/appointments")}
      >
        More Data
      </Button>
    </div>
  );
}
