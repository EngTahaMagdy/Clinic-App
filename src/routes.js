import { lazy } from "react";
import { Route, Routes  } from "react-router-dom";

// Lazy Components
const Dashboard = lazy(() => import("./modules/Dashboard"));
const Appointments = lazy(() => import("./modules/Appointments"));
const AddAppointments = lazy(() => import("./modules/Appointments/add"));
const MedicalRecords = lazy(() => import("./modules/MedicalRecords"));
const AddMedicalRecords=lazy(() => import("./modules/MedicalRecords/add"));
// Application Routes
const AllRoute = (
  <Routes>
    <Route path="/dashboard" element={<Dashboard/>} />
    <Route path="/appointments" element={<Appointments/>} />
    <Route path="/appointment/add" element={<AddAppointments/>} />
    <Route path="/medical-records" element={<MedicalRecords/>} />
    <Route path="/medical-records/add" element={<AddMedicalRecords/>} />


	

  </Routes>
);

export default AllRoute;
