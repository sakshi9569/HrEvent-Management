import React from "react";
import { List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import { Add as AddIcon, Event as EventIcon, People as PeopleIcon } from "@mui/icons-material";

const AdminSidebar = ({ openModal, handleFetchAllEvents, setActiveSection }) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        bgcolor: "cyan", 
        boxShadow: 8, 
      }}
    >
      <List>
        {/* Dashboard Title */}
        <ListItem>
          <ListItemText
            primary="Admin Dashboard"
            sx={{ color: "cyan.800", fontWeight: "bold" }} // Dark cyan for text
          />
        </ListItem>

        {/* Create Event */}
        <ListItem button onClick={() => openModal("create")}>
          <ListItemIcon>
            <AddIcon sx={{ color: "cyan.800" }} /> 
          </ListItemIcon>
          <ListItemText
            primary="Create Event"
            sx={{ color: "cyan.800" }} // Dark cyan for text
          />
        </ListItem>

        {/* Fetch All Events */}
        <ListItem button onClick={handleFetchAllEvents}>
          <ListItemIcon>
            <EventIcon sx={{ color: "cyan.800" }} /> {/* Dark cyan for icon */}
          </ListItemIcon>
          <ListItemText
            primary="Fetch All Events"
            sx={{ color: "cyan.800" }} // Dark cyan for text
          />
        </ListItem>

        {/* Proposed Events */}
        <ListItem button onClick={() => setActiveSection("Proposed Events")}>
          <ListItemIcon>
            <PeopleIcon sx={{ color: "cyan.800" }} /> {/* Dark cyan for icon */}
          </ListItemIcon>
          <ListItemText
            primary="Proposed Events"
            sx={{ color: "cyan.800" }} // Dark cyan for text
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default AdminSidebar;