import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import ProposeEventForm from "./ProposeEventForm";

const ProposedEventsSection = ({
  subSection,
  setSubSection,
  proposedEvents,
  loading,
  handleProposeEvent,
}) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Proposed Events
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              subSection === "All Proposed Events" ? blue[600] : grey[200],
            color:
              subSection === "All Proposed Events" ? "white" : grey[800],
          }}
          onClick={() => setSubSection("All Proposed Events")}
        >
          All Proposed Events
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              subSection === "Propose Event" ? blue[600] : grey[200],
            color: subSection === "Propose Event" ? "white" : grey[800],
          }}
          onClick={() => setSubSection("Propose Event")}
        >
          Propose Event
        </Button>
      </Box>

      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 160,
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <>
          {subSection === "All Proposed Events" && (
            <List>
              {proposedEvents.map((event) => (
                <Paper key={event.eventId} sx={{ mb: 2, p: 3, boxShadow: 3 }}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color={blue[600]}>
                          {event.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color={grey[600]}>
                            Date: {event.eventDate}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
                            Time: {event.eventTime}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
                            Location: {event.eventLocation}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}

          {subSection === "Propose Event" && (
            <ProposeEventForm handleProposeEvent={handleProposeEvent} />
          )}
        </>
      )}
    </Container>
  );
};

export default ProposedEventsSection;