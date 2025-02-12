import React from "react";
import { Button, Paper, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

const Sidebar = ({ activeSection, setActiveSection, setSubSection }) => {
  return (
    <Paper
      sx={{
        width: 256,
        height: "100vh",
        backgroundColor: blue[800],
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 3,
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        User Dashboard
      </Typography>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mb: 2,
          backgroundColor: activeSection === "Invites" ? blue[700] : blue[500],
          "&:hover": {
            backgroundColor: blue[600],
          },
        }}
        onClick={() => {
          setActiveSection("Invites");
          setSubSection(null);
        }}
      >
        Invites
      </Button>
      <Button
        fullWidth
        variant="contained"
        sx={{
          mb: 2,
          backgroundColor:
            activeSection === "Proposed Events" ? blue[700] : blue[500],
          "&:hover": {
            backgroundColor: blue[600],
          },
        }}
        onClick={() => {
          setActiveSection("Proposed Events");
          setSubSection(null);
        }}
      >
        Proposed Events
      </Button>
    </Paper>
  );
};

export default Sidebar;