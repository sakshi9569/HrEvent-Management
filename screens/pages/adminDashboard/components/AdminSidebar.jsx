import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Add as AddIcon, Event as EventIcon, People as PeopleIcon } from "@mui/icons-material";

const AdminSidebar = ({ openModal, handleFetchAllEvents, setActiveSection }) => {
  return (
    <Box
      sx={{
        width: 256,
        height: "100vh",
        backgroundColor: "#5C7285",
        color: "#E2E0C8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 10,
        boxShadow: 8,
      }}
    >
      <List className="position: fixed">
        <ListItem>
          <ListItemText
            primary="Admin Dashboard"
            sx={{ color: "#E2E0C8", fontWeight: "bold" }}
          />
        </ListItem>

        {/* Create Event Button */}
        <ListItem
          button
          onClick={() => openModal("create")}
          sx={{
            backgroundColor: "#A7B49E",
            mb: 2,
            "&:hover": { backgroundColor: "#E2E0C8" },
          }}
        >
          <ListItemIcon>
            <AddIcon sx={{ color: "#5C7285" }} />
          </ListItemIcon>
          <ListItemText primary="Create Event" sx={{ color: "#5C7285" }} />
        </ListItem>

        {/* Fetch All Events Button */}
        <ListItem
          button
          onClick={handleFetchAllEvents}
          sx={{
            backgroundColor: "#A7B49E",
            mb: 2,
            "&:hover": { backgroundColor: "#E2E0C8" },
          }}
        >
          <ListItemIcon>
            <EventIcon sx={{ color: "#5C7285" }} />
          </ListItemIcon>
          <ListItemText primary="Fetch All Events" sx={{ color: "#5C7285" }} />
        </ListItem>

        {/* Proposed Events Button */}
        <ListItem
          button
          onClick={() => setActiveSection("Proposed Events")}
          sx={{
            backgroundColor: "#A7B49E",
            "&:hover": { backgroundColor: "#E2E0C8" },
          }}
        >
          <ListItemIcon>
            <PeopleIcon sx={{ color: "#5C7285" }} />
          </ListItemIcon>
          <ListItemText primary="Proposed Events" sx={{ color: "#5C7285" }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;
