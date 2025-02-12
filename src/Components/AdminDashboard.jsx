import React, { useState, useEffect } from "react";
import api from "../api/api";
import Modal from "react-modal";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import {
  Event as EventIcon,
  Add as AddIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  Edit as EditIcon,
  People as PeopleIcon,
} from "@mui/icons-material";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // "create", "modify", or "addInvitees"
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    firstName: "",
    lastName: "",
    agenda: "",
    time: "",
    date: "",
    location: "",
    status: "SCHEDULED",
    createdById: id,
    invitedUserIds: "",
  });
  const [invitees, setInvitees] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch proposed events
  useEffect(() => {
    if (activeSection === "Proposed Events") {
      const fetchProposedEvents = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/user/proposedEvents/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProposedEvents(response.data);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProposedEvents();
    }
  }, [activeSection, token]);

  // Handle creating a new event
  const handleCreateEvent = async (e) => {
    e.preventDefault();
    const formattedEventData = {
      ...eventData,
      time: new Date(eventData.time).toISOString(),
      date: new Date(eventData.date).toISOString(),
      invitedUserIds: eventData.invitedUserIds.split(",").map(Number),
    };

    try {
      await api.post("/user/event/create", formattedEventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event created successfully");
      setIsModalOpen(false);
      setEventData({
        firstName: "",
        lastName: "",
        agenda: "",
        time: "",
        date: "",
        location: "",
        status: "SCHEDULED",
        createdById: id,
        invitedUserIds: "",
      });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Fetch all events
  const handleFetchAllEvents = async () => {
    setLoading(true);
    try {
      const response = await api.get("/user/event/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllEvents(response.data);
      setActiveSection("All Events");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Handle modifying an event
  const handleModifyEvent = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const updatedEvent = {
      eventId: selectedEvent.eventId,
      empId: "7", // Replace with the actual empId
      role: "admin", // Replace with the actual role
      action: "update",
      eventName: selectedEvent.agenda,
      eventDate: new Date(selectedEvent.date).toISOString(),
      eventTime: new Date(selectedEvent.time).toISOString(),
      eventLocation: selectedEvent.location,
    };

    try {
      await api.put(`/user/event/${selectedEvent.eventId}/modify`, updatedEvent, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Event modified successfully");
      setIsModalOpen(false);
      handleFetchAllEvents();
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Handle adding invitees to an event
  const handleAddInvitees = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const inviteesList = invitees
      .split(",")
      .map((userId) => ({ userId: parseInt(userId.trim(), 10) }))
      .filter((invitee) => !isNaN(invitee.userId));

    try {
      await api.post(`/user/event/${selectedEvent.eventId}/add-invitees`, inviteesList, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Invitees added successfully");
      setIsModalOpen(false);
      setInvitees("");
      handleFetchAllEvents();
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Handle proposal actions (ACCEPTED or REJECTED)
  const handleSuccess = async (e, eventId) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      await api.post(
        `/user/proposal/${eventId}/action`,
        { action, remark: "ok" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(`Proposal ${action.toLowerCase()} successfully`);
      const response = await api.get(`/user/proposedEvents/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProposedEvents(response.data);
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Open modal for create, modify, or add invitees
  const openModal = (type, event = null) => {
    setModalType(type);
    setIsModalOpen(true);
    if (event) setSelectedEvent(event);
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedEvent(null);
    setInvitees("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>

      {/* Sidebar and Main Content */}
      <Box sx={{ display: "flex", flexGrow: 8, mt: 8 }}>
        {/* Sidebar */}
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
              bgcolor: "primary.main",
              color: "white",
              top: 65.5, // Adjust this value to match the height of your AppBar
            },
          }}
        >
          <Box sx={{ overflow: "auto" }}>
            <List>
              <ListItem>
                <ListItemText primary="Admin Dashboard" />
              </ListItem>
              <ListItem button onClick={() => openModal("create")}>
                <ListItemIcon>
                  <AddIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Create Event" />
              </ListItem>
              <ListItem button onClick={handleFetchAllEvents}>
                <ListItemIcon>
                  <EventIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Fetch All Events" />
              </ListItem>
              <ListItem button onClick={() => setActiveSection("Proposed Events")}>
                <ListItemIcon>
                  <PeopleIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Proposed Events" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          {activeSection === "Proposed Events" && (
            <Box>
              <Typography variant="h4" gutterBottom>
                Proposed Events
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {proposedEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.eventId}>
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
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {activeSection === "All Events" && (
            <Box>
              <Typography variant="h4" gutterBottom>
                All Events
              </Typography>
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                  <CircularProgress />
                </Box>
              ) : (
                <Grid container spacing={3}>
                  {allEvents.map((event) => (
                    <Grid item xs={12} sm={6} md={4} key={event.eventId}>
                      <Card>
                        <CardContent>
                          <Typography variant="h6">{event.agenda}</Typography>
                          <Typography>Date: {new Date(event.date).toLocaleDateString()}</Typography>
                          <Typography>Time: {new Date(event.time).toLocaleTimeString()}</Typography>
                          <Typography>Location: {event.location}</Typography>
                          <Typography>Status: {event.status}</Typography>
                          <Box mt={2}>
                            <Button
                              variant="contained"
                              color="warning"
                              startIcon={<EditIcon />}
                              onClick={() => openModal("modify", event)}
                              sx={{ mr: 1 }}
                            >
                              Modify
                            </Button>
                            <Button
                              variant="contained"
                              color="secondary"
                              startIcon={<PeopleIcon />}
                              onClick={() => openModal("addInvitees", event)}
                            >
                              Add Invitees
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <Typography variant="h5" gutterBottom>
          {modalType === "create"
            ? "Create Event"
            : modalType === "modify"
            ? "Modify Event"
            : "Add Invitees"}
        </Typography>
        <Box component="form" onSubmit={modalType === "create" ? handleCreateEvent : modalType === "modify" ? handleModifyEvent : handleAddInvitees} sx={{ mt: 2 }}>
          {modalType === "create" && (
            <>
              <TextField
                fullWidth
                label="First Name"
                value={eventData.firstName}
                onChange={(e) => setEventData({ ...eventData, firstName: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Last Name"
                value={eventData.lastName}
                onChange={(e) => setEventData({ ...eventData, lastName: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Agenda"
                value={eventData.agenda}
                onChange={(e) => setEventData({ ...eventData, agenda: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="datetime-local"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Invited User IDs (comma-separated)"
                value={eventData.invitedUserIds}
                onChange={(e) => setEventData({ ...eventData, invitedUserIds: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {modalType === "modify" && selectedEvent && (
            <>
              <TextField
                fullWidth
                label="Agenda"
                value={selectedEvent.agenda}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, agenda: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="datetime-local"
                value={selectedEvent.time ? new Date(selectedEvent.time).toISOString().slice(0, 16) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="date"
                value={selectedEvent.date ? new Date(selectedEvent.date).toISOString().slice(0, 10) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Location"
                value={selectedEvent.location}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                sx={{ mb: 2 }}
              />
            </>
          )}
          {modalType === "addInvitees" && (
            <TextField
              fullWidth
              label="Invitee User IDs (comma-separated)"
              value={invitees}
              onChange={(e) => setInvitees(e.target.value)}
              sx={{ mb: 2 }}
            />
          )}
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {modalType === "create"
              ? "Create Event"
              : modalType === "modify"
              ? "Modify Event"
              : "Add Invitees"}
          </Button>
          <Button onClick={closeModal} color="error" fullWidth sx={{ mt: 1 }}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboard;