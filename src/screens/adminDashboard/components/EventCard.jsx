import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Modal,
  List,
  ListItem,
} from "@mui/material";
import {
  Edit as EditIcon,
  People as PeopleIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import { useStoreContext } from "../../../contextApi/ContextApi";

const EventCard = ({ event, openModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [invitees, setInvitees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useStoreContext();

  const fetchInvitees = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Sending Token:", token);

      if (!token) {
        setError("No authentication token found. Please log in again.");
        return;
      }

      const response = await axios.get(
        `http://localhost:8090/user/event/${event.eventId}/allInvitees`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInvitees(response.data);
    } catch (err) {
      console.error(
        "Error fetching invitees:",
        err.response?.data || err.message
      );
      setError(err.response?.data?.message || "Failed to fetch invitees.");
    }

    setLoading(false);
    setIsModalOpen(true);
  };

  return (
    <Card
      sx={{
        bgcolor: "#E2E0C8",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ color: "#5C7285", fontWeight: "bold" }}>
          {event.agenda}
        </Typography>
        <Typography sx={{ color: "#5C7285", mt: 1 }}>
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
        </Typography>

        {/* Action Buttons */}
        <Box mt={2}>
          {/* Modify Button */}
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => openModal("modify", event)}
            sx={{
              mr: 1,
              bgcolor: "#5C7285",
              color: "#E2E0C8",
              "&:hover": { bgcolor: "#818C78" },
            }}
          >
            Modify
          </Button>

          {/* Add Invitees Button */}
          <Button
            variant="contained"
            startIcon={<PeopleIcon />}
            onClick={() => openModal("addInvitees", event)}
            sx={{
              mr: 1,
              bgcolor: "#A7B49E",
              color: "#5C7285",
              "&:hover": { bgcolor: "#818C78", color: "#E2E0C8" },
            }}
          >
            Add Invitees
          </Button>

          {/* View Invitees Button */}
          <Button
            variant="contained"
            startIcon={<VisibilityIcon />}
            onClick={fetchInvitees}
            sx={{
              bgcolor: "#6C7A89",
              color: "#E2E0C8",
              "&:hover": { bgcolor: "#4E5D6C" },
            }}
          >
            View Invitees
          </Button>
        </Box>
      </CardContent>

      {/* Modal for Invitees */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          className="modal-box"
          sx={{
            bgcolor: "#6C7A89",
            color: "#E2E0C8",
            width: 400,
            padding: 2,
            borderRadius: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            boxShadow: 24,
            "&:hover": {
              bgcolor: "#4E5D6C",
            },
          }}
        >
          <Typography variant="h6" id="modal-title">
            Invitees List
          </Typography>
          {loading ? (
            <Typography>Loading...</Typography>
          ) : error ? (
            <Typography sx={{ color: "red" }}>{error}</Typography>
          ) : invitees.length > 0 ? (
            <List>
              {invitees.map((invitee, index) => (
                <ListItem key={index}>{invitee}</ListItem>
              ))}
            </List>
          ) : (
            <Typography>No invitees found.</Typography>
          )}
        </Box>
      </Modal>
    </Card>
  );
};

export default EventCard;
