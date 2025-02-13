import React, { useState, useEffect } from "react";
import { useStoreContext } from "../../../../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import api from "../../../../api/api";
import AdminSidebar from "../components/AdminSidebar";
import EventCard from "../components/EventCard";
import ProposedEventCard from "../components/ProposedEventCard";
import AdminNavbar from "../components/AdminNavbar"
import EventForm from "../components/EventForm";
import { Box, Typography, Grid, CircularProgress, Modal } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";

const AdminDashboardContainer = () => {
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
  const navigate = useNavigate();


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

  const handleLogout = async (e) => {
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");
    navigate("/");
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
    
    <Box sx={{ display: "flex", flexDirection: "column" }} >
      {/* Sidebar and Main Content */}
      {/* Navbar */}
      <AdminNavbar handleLogout={handleLogout} />

      {/* Main Layout */}
      

      {/* Footer */}

      <Box sx={{ display: "flex", flexGrow: 8, height: '100%' }}>
        {/* Sidebar */}
        <AdminSidebar openModal={openModal} handleFetchAllEvents={handleFetchAllEvents} setActiveSection={setActiveSection} />

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
                      <ProposedEventCard event={event} handleSuccess={handleSuccess} />
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
                      <EventCard event={event} openModal={openModal} />
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
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
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