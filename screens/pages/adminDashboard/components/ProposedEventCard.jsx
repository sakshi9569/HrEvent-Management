import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

const ProposedEventCard = ({ event, handleSuccess }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{event.eventName}</Typography>
        <Typography>Date: {event.eventDate}</Typography>
        <Typography>Time: {event.eventTime}</Typography>
        <Typography>Location: {event.eventLocation}</Typography>
        <Typography>Agenda: {event.agenda}</Typography>
        <Typography>Status: {event.proposalStatus}</Typography>
        <Box mt={2}>
          <Button
            variant="contained"
            color="success"
            startIcon={<CheckIcon />}
            onClick={(e) => handleSuccess(e, event.eventId)}
            name="ACCEPTED"
            sx={{ mr: 1 }}
          >
            Accept
          </Button>
          <Button
            variant="contained"
            color="error"
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