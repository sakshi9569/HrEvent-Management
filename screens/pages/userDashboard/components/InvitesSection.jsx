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

const InvitesSection = ({
  subSection,
  setSubSection,
  invites,
  pendingInvites,
  loading,
}) => {
  return (
    <Container>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Invites
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 4 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              subSection === "All Invites" ? blue[600] : grey[200],
            color: subSection === "All Invites" ? "white" : grey[800],
          }}
          onClick={() => setSubSection("All Invites")}
        >
          All Invites
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor:
              subSection === "Pending Invites" ? blue[600] : grey[200],
            color: subSection === "Pending Invites" ? "white" : grey[800],
          }}
          onClick={() => setSubSection("Pending Invites")}
        >
          Pending Invites
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
          {subSection === "All Invites" && (
            <List>
              {invites.map((invite) => (
                <Paper key={invite.eventId} sx={{ mb: 2, p: 3, boxShadow: 3 }}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color={blue[600]}>
                          {invite.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color={grey[600]}>
                            Date: {invite.eventDate}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
                            Time: {invite.eventTime}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
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

          {subSection === "Pending Invites" && (
            <List>
              {pendingInvites.map((invite) => (
                <Paper key={invite.eventId} sx={{ mb: 2, p: 3, boxShadow: 3 }}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography variant="h6" color={blue[600]}>
                          {invite.eventName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" color={grey[600]}>
                            Date: {invite.eventDate}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
                            Time: {invite.eventTime}
                          </Typography>
                          <Typography variant="body2" color={grey[600]}>
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