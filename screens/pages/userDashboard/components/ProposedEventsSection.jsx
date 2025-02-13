import React from "react";
import {
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import ProposeEventForm from "./ProposeEventForm";

const ProposedEventsSection = ({
  subSection,
  setSubSection,
  proposedEvents,
  loading,
  handleProposeEvent,
}) => {
  return (
    <div className="container mx-auto p-6">
      <Typography variant="h4" className="font-bold mb-6 text-[#5C7285]">
        Proposed Events
      </Typography>
      <div className="flex gap-4 mb-6">
        <Button
          variant="contained"
          className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
            subSection === "All Proposed Events"
              ? "bg-[#5C7285] text-white"
              : "bg-[#E2E0C8] text-[#818C78]"
          }`}
          onClick={() => setSubSection("All Proposed Events")}
        >
          All Proposed Events
        </Button>
        <Button
          variant="contained"
          className={`px-4 py-2 rounded-lg shadow-md transition-colors ${
            subSection === "Propose Event"
              ? "bg-[#5C7285] text-white"
              : "bg-[#E2E0C8] text-[#818C78]"
          }`}
          onClick={() => setSubSection("Propose Event")}
        >
          Propose Event
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <>
          {subSection === "All Proposed Events" && (
            <List>
              {proposedEvents.map((event) => (
                <Paper
                  key={event.eventId}
                  className="mb-4 p-4 shadow-lg bg-[#A7B49E] text-white rounded-lg"
                >
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6" className="text-[#E2E0C8]">
                          {event.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" className="text-[#E2E0C8]">
                            Date: {event.eventDate}
                          </Typography>
                          <Typography variant="body2" className="text-[#E2E0C8]">
                            Time: {event.eventTime}
                          </Typography>
                          <Typography variant="body2" className="text-[#E2E0C8]">
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
    </div>
  );
};

export default ProposedEventsSection;