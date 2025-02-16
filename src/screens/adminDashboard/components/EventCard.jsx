import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Edit as EditIcon, People as PeopleIcon } from "@mui/icons-material";

const EventCard = ({ event, openModal }) => {
  return (
    <Card
      sx={{
        bgcolor: "#E2E0C8", 
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ color: "#5C7285", fontWeight: "bold" }}
        >
          {event.agenda}
        </Typography>
        {/* Event Details */}
        <Typography sx={{ color: "#5C7285", mt: 1 }}>
          Date: {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: "#5C7285" }}>
          Time: {new Date(event.time).toLocaleTimeString()}
        </Typography>
        <Typography sx={{ color: "#5C7285" }}>
          Location: {event.location}
        </Typography>
        <Typography sx={{ color: "#5C7285" }}>
          Status: {event.status}
        </Typography>

        {/* Action Buttons */}
        <Box mt={2}>
          {/* Modify Button */}
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => openModal("modify", event)}
            sx={{
              mr: 1,
              bgcolor: "#5C7285", 
              color: "#E2E0C8", 
              "&:hover": { bgcolor: "#818C78" }, 
            }}
          >
            Modify
          </Button>

          {/* Add Invitees Button */}
          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={() => openModal("addInvitees", event)}
            sx={{
              bgcolor: "#A7B49E", // Button background color
              color: "#5C7285", // Button text color
              "&:hover": { bgcolor: "#818C78", color: "#E2E0C8" }, // Hover styles
            }}
          >
            Add Invitees
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EventCard;