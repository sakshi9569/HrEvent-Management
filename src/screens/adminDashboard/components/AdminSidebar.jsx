import React from "react";
import { Button, Typography, Paper } from "@mui/material";
import { Add as AddIcon, Event as EventIcon, People as PeopleIcon } from "@mui/icons-material";

const AdminSidebar = ({ openModal, handleFetchAllEvents, setActiveSection }) => {
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
        Admin Dashboard
      </Typography>

      {/* Create Event Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => openModal("create")}
        sx={{
          mb: 2,
          backgroundColor: "#818C78",
          color: "#A7B49E",
          "&:hover": {
            backgroundColor: "#E2E0C8",
          },
        }}
      >
        Create Event
      </Button>

      {/* Fetch All Events Button */}
      <Button
        fullWidth
        variant="contained"
        startIcon={<EventIcon />}
        onClick={handleFetchAllEvents}
        sx={{
          mb: 2,
          backgroundColor: "#818C78",
          color: "#A7B49E",
          "&:hover": {
            backgroundColor: "#E2E0C8",
          },
        }}
      >
        Fetch All Events
      </Button>
      <Button
        fullWidth
        variant="contained"
        startIcon={<PeopleIcon />}
        onClick={() => setActiveSection("Proposed Events")}
        sx={{
          mb: 2,
          backgroundColor: "#818C78",
          color: "#A7B49E",
          "&:hover": {
            backgroundColor: "#E2E0C8",
          },
        }}
      >
        Proposed Events
      </Button>
    </Paper>
  );
};

export default AdminSidebar;