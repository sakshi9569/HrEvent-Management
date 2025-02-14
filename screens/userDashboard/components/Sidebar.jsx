import React from "react";
import { Button, Paper, Typography } from "@mui/material";

const Sidebar = ({ activeSection, setActiveSection, setSubSection }) => {
  return (
    <Paper
      sx={{
        width: 256,
        height: "100vh",
        backgroundColor: "#5C7285",
        color: "#E2E0C8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 8,
        boxShadow: 8,
        position: "fixed",
        top: 64, 
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
          backgroundColor: activeSection === "Invites" ? "#818C78" : "#A7B49E",
          "&:hover": {
            backgroundColor: "#E2E0C8",
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
            activeSection === "Proposed Events" ? "#818C78" : "#A7B49E",
          "&:hover": {
            backgroundColor: "#E2E0C8",
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