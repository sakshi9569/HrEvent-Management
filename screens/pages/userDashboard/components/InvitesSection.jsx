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

const InvitesSection = ({
  subSection,
  setSubSection,
  invites,
  pendingInvites,
  loading,
}) => {
  return (
    <Container className="p-6">
      <Typography
        variant="h4"
        className="font-bold mb-8"
        sx={{ color: "#5C7285",
          margin: "0.2", 

         }}
      >
        Invites
      </Typography>

      <Box className="flex gap-2 mb-8">
        <Button
          variant="contained"
          className="px-6 py-2 rounded-lg"
          sx={{
            backgroundColor:
              subSection === "All Invites" ? "#5C7285" : "#E2E0C8",
            color: subSection === "All Invites" ? "white" : "#5C7285",
            "&:hover": {
              backgroundColor: "#818C78",
              color: "white",
            },
          }}
          onClick={() => setSubSection("All Invites")}
        >
          All Invites
        </Button>
        <Button
          variant="contained"
          className="px-6 py-2 rounded-lg"
          sx={{
            backgroundColor:
              subSection === "Pending Invites" ? "#5C7285" : "#E2E0C8",
            color: subSection === "Pending Invites" ? "white" : "#5C7285",
            "&:hover": {
              backgroundColor: "#818C78",
              color: "white",
            },
          }}
          onClick={() => setSubSection("Pending Invites")}
        >
          Pending Invites
        </Button>
      </Box>

      {/* Loading State */}
      {loading ? (
        <Box className="flex justify-center items-center h-40">
          <CircularProgress sx={{ color: "#5C7285" }} />
        </Box>
      ) : (
        <>
          {/* All Invites Section */}
          {subSection === "All Invites" && (
            <List className="space-y-4">
              {invites.map((invite) => (
                <Paper
                  key={invite.eventId}
                  className="p-6 shadow-lg"
                  sx={{ backgroundColor: "#E2E0C8" }}
                >
                  <ListItem className="p-0">
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          className="font-bold"
                          sx={{ color: "#5C7285" }}
                        >
                          {invite.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Date: {invite.eventDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Time: {invite.eventTime}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Location: {invite.eventLocation}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}

          {/* Pending Invites Section */}
          {subSection === "Pending Invites" && (
            <List className="space-y-4">
              {pendingInvites.map((invite) => (
                <Paper
                  key={invite.eventId}
                  className="p-6 shadow-lg"
                  sx={{ backgroundColor: "#E2E0C8" }}
                >
                  <ListItem className="p-0">
                    <ListItemText
                      primary={
                        <Typography
                          variant="h6"
                          className="font-bold"
                          sx={{ color: "#5C7285" }}
                        >
                          {invite.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Date: {invite.eventDate}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Time: {invite.eventTime}
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-600"
                          >
                            Location: {invite.eventLocation}
                          </Typography>
                        </>
                      }
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>
          )}
        </>
      )}
    </Container>
  );
};

export default InvitesSection;