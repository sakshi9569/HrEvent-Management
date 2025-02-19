import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

const ProposedEventCard = ({ event, handleSuccess }) => {
  return (
    <Card
      sx={{
        bgcolor: "#E2E0C8",
        boxShadow: 10,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#5C7285" }}
          >
            {event.eventName}
          </Typography>
          <Typography sx={{ color: "#5C7285", mt: 1 }}>
            Date: {new Date(event.eventDate).toLocaleDateString()}
          </Typography>
          <Typography sx={{ color: "#5C7285", mt: 1 }}>
            Time:{" "}
            {new Date(event.eventTime).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
              timeZone: "Asia/Bangkok", 
            })}
          </Typography>

          <Typography sx={{ color: "#5C7285", mt: 1 }}>
            Location: {event.eventLocation}
          </Typography>
          <Typography sx={{ fontWeight: "#5C7285", color: "#5C7285" }}>
            Status: {event.proposalStatus}
          </Typography>
        </Box>
        <Box mt={2} display="flex">
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={(e) => handleSuccess(e, event.eventId)}
            sx={{
              mr: 1,
              bgcolor: "#5C7285",
              color: "#E2E0C8",
              "&:hover": { bgcolor: "#818C78" },
            }}
            name="ACCEPTED"
          >
            Accept
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#A7B49E",
              color: "#E2E0C8",
              "&:hover": { backgroundColor: "#818C78" },
            }}
            startIcon={<CloseIcon />}
            onClick={(e) => handleSuccess(e, event.eventId)}
            name="REJECTED"
          >
            Reject
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProposedEventCard;
