import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Card,
  CardContent,
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
    <Container
      sx={{
        width: "50vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingY: 4,
        maxWidth: "none",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          bgcolor: "#E2E0C8",
          boxShadow: 3,
          borderRadius: 2,
          padding: 2,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: 6,
          },
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#5C7285", fontWeight: "bold", marginBottom: 2 }}
        >
          Proposed Events
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                subSection === "All Proposed Events" ? "#5C7285" : "#E2E0C8",
              color: subSection === "All Proposed Events" ? "white" : "#5C7285",
              "&:hover": { backgroundColor: "#818C78", color: "white" },
            }}
            onClick={() => setSubSection("All Proposed Events")}
          >
            All Proposed Events
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                subSection === "Propose Event" ? "#5C7285" : "#E2E0C8",
              color: subSection === "Propose Event" ? "white" : "#5C7285",
              "&:hover": { backgroundColor: "#818C78", color: "white" },
            }}
            onClick={() => setSubSection("Propose Event")}
          >
            Propose Event
          </Button>
        </Box>
      </Box>

      {/* Scrollable Content */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          marginTop: 2,
          paddingBottom: 2,
          width: "100%",
        }}
      >
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress sx={{ color: "#5C7285" }} />
            <Typography sx={{ color: "#5C7285", ml: 2 }}>
              Loading proposed events...
            </Typography>
          </Box>
        ) : (
          <>
            {subSection === "All Proposed Events" && (
              <>
                {proposedEvents.length === 0 ? (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#5C7285",
                      textAlign: "center",
                      marginTop: 4,
                    }}
                  >
                    No proposed events available.
                  </Typography>
                ) : (
                  proposedEvents.map((event) => (
                    <Card
                      key={event.eventId}
                      sx={{
                        bgcolor: "#E2E0C8",
                        boxShadow: 3,
                        borderRadius: 2,
                        transition: "transform 0.2s, box-shadow 0.2s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          boxShadow: 6,
                        },
                        marginBottom: 2,
                        width: "100%",
                      }}
                    >
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ color: "#5C7285", fontWeight: "bold" }}
                        >
                          {event.eventName}
                        </Typography>
                        <Typography sx={{ color: "#5C7285", mt: 1 }}>
                          Date: {new Date(event.eventDate).toLocaleDateString()}
                        </Typography>
                        <Typography sx={{ color: "#5C7285" }}>
                          Time:{" "}
                          {new Date(event.eventTime).toLocaleTimeString(
                            "en-GB",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: false,
                              timeZone: "Asia/Bangkok", 
                            }
                          )}
                        </Typography>

                        <Typography sx={{ color: "#5C7285" }}>
                          Location: {event.eventLocation}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))
                )}
              </>
            )}

            {subSection === "Propose Event" && (
              <ProposeEventForm handleProposeEvent={handleProposeEvent} />
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default ProposedEventsSection;
