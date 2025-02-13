import React from "react";
import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { Check as CheckIcon, Close as CloseIcon } from "@mui/icons-material";

const ProposedEventCard = ({ event, handleSuccess }) => {
  return (
    <Card
      sx={{
        bgcolor: "#E2E0C8", // Background color
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
       {/* <Typography sx={{ color: "#5C7285", mt: 1 }}>
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
              </Typography> */}

              {/* <Box mt={2}>
                        <Button
                          variant="contained"
                          startIcon={<EditIcon />}
                          onClick={() => openModal("modify", event)}
                          sx={{
                            mr: 1,
                            bgcolor: "#5C7285", // Button background color
                            color: "#E2E0C8", // Button text color
                            "&:hover": { bgcolor: "#818C78" }, // Hover background color
                          }}
                        >
                          Modify
                        </Button>
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
                      </Box> */}
      <CardContent>
      <Box display="flex" >
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#5C7285" }}>
          {event.eventName}
        </Typography>
        <Typography sx={{ color: "#818C78"}}>
          Date: {event.eventDate}
        </Typography>
        <Typography sx={{ color: "#818C78" }}>
          Time: {event.eventTime}
        </Typography>
        <Typography sx={{ color: "#818C78" }}>
          Location: {event.eventLocation}
        </Typography>
        <Typography sx={{ color: "#818C78" }}>
          Agenda: {event.agenda}
        </Typography>
        <Typography sx={{ fontWeight: "bold", color: "#A7B49E" }}>
          Status: {event.proposalStatus}
        </Typography>
        </Box>
        <Box mt={2} display="flex" >
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={(e) => handleSuccess(e, event.eventId)}
            sx={{
              mr: 1,
              bgcolor: "#5C7285", // Button background color
              color: "#E2E0C8", // Button text color
              "&:hover": { bgcolor: "#818C78" }, // Hover background color
            }}
            
            name="ACCEPTED"
          >
            Accept
          </Button>
          {/* <Button
                      variant="contained"
                      startIcon={<EditIcon />}
                      onClick={() => openModal("modify", event)}
                      sx={{
                        mr: 1,
                        bgcolor: "#5C7285", // Button background color
                        color: "#E2E0C8", // Button text color
                        "&:hover": { bgcolor: "#818C78" }, // Hover background color
                      }}
                    >
                      Modify
                    </Button> */}
          
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