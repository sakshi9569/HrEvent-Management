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
import api from "../../../api/api";
import { toast } from "react-hot-toast";

const InvitesSection = ({
  subSection,
  setSubSection,
  invites,
  pendingInvites,
  loading,
  userId, 
}) => {
  const handleRespondToInvite = async (eventId, action, remarks = "") => {
    try {
      const response = await api.post(
        `/user/${userId}/invites/${eventId}/respond`,
        {
          userAction: action,
          userRemarks: remarks,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

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
          Invites
        </Typography>

        <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                subSection === "All Invites" ? "#5C7285" : "#E2E0C8",
              color: subSection === "All Invites" ? "white" : "#5C7285",
              "&:hover": { backgroundColor: "#818C78", color: "white" },
            }}
            onClick={() => setSubSection("All Invites")}
          >
            All Invites
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor:
                subSection === "Pending Invites" ? "#5C7285" : "#E2E0C8",
              color: subSection === "Pending Invites" ? "white" : "#5C7285",
              "&:hover": { backgroundColor: "#818C78", color: "white" },
            }}
            onClick={() => setSubSection("Pending Invites")}
          >
            Pending Invites
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
          width: "100%", // Full width
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
          </Box>
        ) : (
          <>
            {(subSection === "All Invites" ? invites : pendingInvites).map(
              (invite) => (
                <Card
                  key={invite.eventId}
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
                    <Typography variant="h6" sx={{ color: "#5C7285", fontWeight: "bold" }}>
                      {invite.eventName}
                    </Typography>
                    <Typography sx={{ color: "#5C7285", mt: 1 }}>
                      Date: {invite.eventDate}
                    </Typography>
                    <Typography sx={{ color: "#5C7285" }}>
                      Time: {invite.eventTime}
                    </Typography>
                    <Typography sx={{ color: "#5C7285" }}>
                      Location: {invite.eventLocation}
                    </Typography>
                    <Typography sx={{ color: "#5C7285" }}>
                      Status: {invite.status}
                    </Typography>
                    {subSection === "Pending Invites" && (
                      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#5C7285", color: "white" }}
                          onClick={() => handleRespondToInvite(invite.eventId, "ACCEPT")}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#5C7285", color: "white" }}
                          onClick={() => handleRespondToInvite(invite.eventId, "DENY")}
                        >
                          Deny
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#5C7285", color: "white" }}
                          onClick={() => handleRespondToInvite(invite.eventId, "RESCHEDULE")}
                        >
                          Reschedule
                        </Button>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              )
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default InvitesSection;