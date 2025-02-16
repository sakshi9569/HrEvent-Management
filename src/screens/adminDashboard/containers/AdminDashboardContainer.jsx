import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import {
  fetchProposedEvents,
  fetchAllEvents,
  createEvent,
  modifyEvent,
  addInviteesToEvent,
  handleProposalAction,
} from "../../../api/auth"; 
import AdminSidebar from "../components/AdminSidebar";
import EventCard from "../components/EventCard";
import ProposedEventCard from "../components/ProposedEventCard";
import Navbar from "../../../shared";
import EventForm from "../components/EventForm";
import { Box, Typography, Grid, CircularProgress, Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AdminDashboardContainer = () => {
  const { id, token, setToken ,setUserId} = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
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
  const navigate = useNavigate();

  // Fetch proposed events
  useEffect(() => {
    if (activeSection === "Proposed Events") {
      const fetchEvents = async () => {
        setLoading(true);
        try {
          const data = await fetchProposedEvents(token);
          setProposedEvents(data);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchEvents();
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
      await createEvent(formattedEventData, token);
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

  const handleFetchAllEvents = async () => {
    setLoading(true);
    try {
      const data = await fetchAllEvents(token);
      setAllEvents(data);
      setActiveSection("All Events");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async (e) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("role");
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");
    navigate("/");
  };

  const handleModifyEvent = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const updatedEvent = {
      eventId: selectedEvent.eventId,
      empId: "7",
      role: "admin",
      action: "update",
      eventName: selectedEvent.agenda,
      eventDate: new Date(selectedEvent.date).toISOString(),
      eventTime: new Date(selectedEvent.time).toISOString(),
      eventLocation: selectedEvent.location,
    };

    try {
      await modifyEvent(selectedEvent.eventId, updatedEvent, token);
      toast.success("Event modified successfully");
      setIsModalOpen(false);
      handleFetchAllEvents();
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  const handleAddInvitees = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    const inviteesList = invitees
      .split(",")
      .map((userId) => ({ userId: parseInt(userId.trim(), 10) }))
      .filter((invitee) => !isNaN(invitee.userId));

    try {
      await addInviteesToEvent(selectedEvent.eventId, inviteesList, token);
      toast.success("Invitees added successfully");
      setIsModalOpen(false);
      setInvitees("");
      handleFetchAllEvents();
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  const handleSuccess = async (e, eventId) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      await handleProposalAction(eventId, action, token);
      toast.success(`Proposal ${action.toLowerCase()} successfully`);
      const data = await fetchProposedEvents(token);
      setProposedEvents(data);
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
      <Navbar handleLogout={handleLogout} />
      <Box sx={{ display: "flex", flexGrow: 8, height: "100%" }}>
        <AdminSidebar
          openModal={openModal}
          handleFetchAllEvents={handleFetchAllEvents}
          setActiveSection={setActiveSection}
        />
        <Box
          component="main"
          sx={{
            flex: 1,
            overflow: "auto",
            padding: 20,
            marginTop: -12,
            marginLeft: 32,
          }}
        >
          {activeSection === "Proposed Events" && (
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: "#5C7285", fontWeight: "bold" }}>
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
                      <ProposedEventCard event={event} handleSuccess={handleSuccess} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}

          {activeSection === "All Events" && (
            <Box>
              <Typography variant="h4" gutterBottom sx={{ color: "#5C7285", fontWeight: "bold" }}>
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
                      <EventCard event={event} openModal={openModal} />
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          )}
        </Box>
      </Box>

      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" gutterBottom>
            {modalType === "create"
              ? "Create Event"
              : modalType === "modify"
              ? "Modify Event"
              : "Add Invitees"}
          </Typography>
          <EventForm
            modalType={modalType}
            eventData={eventData}
            setEventData={setEventData}
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            invitees={invitees}
            setInvitees={setInvitees}
            handleSubmit={
              modalType === "create"
                ? handleCreateEvent
                : modalType === "modify"
                ? handleModifyEvent
                : handleAddInvitees
            }
            closeModal={closeModal}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default AdminDashboardContainer;