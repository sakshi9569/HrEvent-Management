import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Edit as EditIcon, People as PeopleIcon } from "@mui/icons-material";

const EventCard = ({ event, openModal }) => {
  return (
    <Card sx={{ bgcolor: "cyan.50", boxShadow: 3, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" sx={{ color: "cyan.800", fontWeight: "bold" }}>
          {event.agenda}
        </Typography>
        <Typography sx={{ color: "cyan.700", mt: 1 }}>
          Date: {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography sx={{ color: "cyan.700" }}>
          Time: {new Date(event.time).toLocaleTimeString()}
        </Typography>
        <Typography sx={{ color: "cyan.700" }}>
          Location: {event.location}
        </Typography>
        <Typography sx={{ color: "cyan.700" }}>
          Status: {event.status}
        </Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => openModal("modify", event)}
            sx={{
              mr: 1,
              bgcolor: "cyan",
              color: "white",
              "&:hover": { bgcolor: "cyan.900" },
            }}
          >
            Modify
          </Button>
          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={() => openModal("addInvitees", event)}
            sx={{
              bgcolor: "cyan",
              color: "white",
              "&:hover": { bgcolor: "cyan.50" },
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
