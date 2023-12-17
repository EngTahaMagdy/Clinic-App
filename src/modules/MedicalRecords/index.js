import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import { useGlobalState } from "../../context/global";
import { useNavigate } from "react-router-dom";
export default function MedicalRecords() {
  const { userInfo, allRecords } = useGlobalState();
  const navigate = useNavigate();
  const isDoctor = userInfo.isDoctor === "doctor";
  return (
    <div className="medicalRecords">
      {!isDoctor && (
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 5 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/medical-records/add")}
          >
            Add New Record
          </Button>
        </Box>
      )}

      <TableContainer component={Paper} sx={{ mt: 1 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Record</TableCell>
              <TableCell>Name</TableCell>

              <TableCell>Doctor Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allRecords.length > 0 ? (
              allRecords.map((record, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <img
                      src={record.preview_image}
                      width={50}
                      height={50}
                      alt="record "
                    />
                  </TableCell>
                  <TableCell>{record.name}</TableCell>

                  <TableCell>{record.doctorEmail}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow
                sx={{
                  height: "200px",
                  "& td": {
                    color: "#ccc",
                    fontSize: "22px",
                    textAlign: "center",
                  },
                }}
              >
                <TableCell colSpan={4}>No Data Fount</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
