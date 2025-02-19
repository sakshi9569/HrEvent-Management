import React, { Component } from "react";
import { toast } from "react-hot-toast";
import {
  fetchProposedEvents,
  fetchProposedEventsForAdmin,
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
import { withRouter } from "../../../utils/withRouter";
import { ContextApi } from "../../../contextApi/ContextApi";

class AdminDashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      proposedEvents: [],
      allEvents: [],
      isModalOpen: false,
      modalType: null,
      selectedEvent: null,
      eventData: {
        firstName: "",
        lastName: "",
        agenda: "",
        time: "",
        date: "",
        location: "",
        status: "SCHEDULED",
        createdById: "",  
        invitedUserIds: "",
      },
      invitees: "",
      loading: false,
      token: "", // Set in context
    };
  }

  static contextType = ContextApi; 

  componentDidMount() {
    const { id, token } = this.context; 
    this.setState({
      token: token,
      eventData: { ...this.state.eventData, createdById: id },
    });
  }

  // Fetch proposed events when active section changes
  async componentDidUpdate(prevProps, prevState) {
    if (prevState.activeSection !== this.state.activeSection && this.state.activeSection === "Proposed Events") {
      this.fetchProposedEvents();
    }
  }

  fetchProposedEvents = async () => {
    this.setState({ loading: true });
    try {
      const data = await fetchProposedEventsForAdmin(this.state.token);
      this.setState({ proposedEvents: data });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleCreateEvent = async (e) => {
    e.preventDefault();
    const formattedEventData = {
      ...this.state.eventData,
      time: new Date(this.state.eventData.time).toISOString(),
      date: new Date(this.state.eventData.date).toISOString(),
      invitedUserIds: this.state.eventData.invitedUserIds.split(","),
    };

    try {
      await createEvent(formattedEventData, this.state.token);
      toast.success("Event created successfully");
      this.setState({ isModalOpen: false, eventData: {
        firstName: "",
        lastName: "",
        agenda: "",
        time: "",
        date: "",
        location: "",
        status: "SCHEDULED",
        createdById: this.context.id,  
        invitedUserIds: "",
      } });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  handleFetchAllEvents = async () => {
    this.setState({ loading: true });
    try {
      const data = await fetchAllEvents(this.state.token);
      this.setState({ allEvents: data, activeSection: "All Events" });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleLogout = async (e) => {
    this.context.setToken(null);
    this.context.setUserId(null);
    localStorage.removeItem("role");
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");
    this.props.navigate("/");
  };

  handleModifyEvent = async (e) => {
    e.preventDefault();
    if (!this.state.selectedEvent) return;

    const updatedEvent = {
      eventId: this.state.selectedEvent.eventId,
      empId: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
      action: "update",
      eventName: this.state.selectedEvent.agenda,
      eventDate: new Date(this.state.selectedEvent.date).toISOString(),
      eventTime: new Date(this.state.selectedEvent.time).toISOString(),
      eventLocation: this.state.selectedEvent.location,
    };

    console.log("This is the updatedEvent" , updatedEvent);

    try {
      await modifyEvent(this.state.selectedEvent.eventId, updatedEvent, this.state.token);
      toast.success("Event modified successfully");
      this.setState({ isModalOpen: false });
      this.handleFetchAllEvents();
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  handleAddInvitees = async (e) => {
    e.preventDefault();
    if (!this.state.selectedEvent) return;
  
    // Split the invitees string by comma and trim whitespace
    const inviteesList = this.state.invitees
      .split(",")
      .map((email) => ({ email: email.trim() })) // Map to an array of objects with email
      .filter((invitee) => invitee.email); // Filter out empty or invalid emails
  
    try {
      // Call the API to add invitees by email
      await addInviteesToEvent(this.state.selectedEvent.eventId, inviteesList, this.state.token);
      toast.success("Invitees added successfully");
      this.setState({ isModalOpen: false, invitees: "" }); // Reset the modal and input
      this.handleFetchAllEvents(); // Refresh the event list
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  handleSuccess = async (e, eventId) => {
    e.preventDefault();
    const action = e.target.name;

    try {
      await handleProposalAction(eventId, action, this.state.token);
      toast.success(`Proposal ${action.toLowerCase()} successfully`);
      const data = await fetchProposedEventsForAdmin(this.state.token);
      this.setState({ proposedEvents: data });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  openModal = (type, event = null) => {
    this.setState({ modalType: type, isModalOpen: true, selectedEvent: event });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, modalType: null, selectedEvent: null, invitees: "" });
  };

  render() {
    const { activeSection, proposedEvents, allEvents, isModalOpen, modalType, selectedEvent, eventData, invitees, loading } = this.state;

    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Navbar handleLogout={this.handleLogout} />
        <Box sx={{ display: "flex", flexGrow: 8, height: "100%" }}>
          <AdminSidebar
            openModal={this.openModal}
            handleFetchAllEvents={this.handleFetchAllEvents}
            setActiveSection={(section) => this.setState({ activeSection: section })}
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
                        <ProposedEventCard event={event} handleSuccess={this.handleSuccess} />
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
                        <EventCard event={event} openModal={this.openModal} />
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </Box>

        <Modal open={isModalOpen} onClose={this.closeModal}>
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
              setEventData={(data) => this.setState({ eventData: data })}
              selectedEvent={selectedEvent}
              setSelectedEvent={(event) => this.setState({ selectedEvent: event })}
              invitees={invitees}
              setInvitees={(invitees) => this.setState({ invitees })}
              handleSubmit={
                modalType === "create"
                  ? this.handleCreateEvent
                  : modalType === "modify"
                  ? this.handleModifyEvent
                  : this.handleAddInvitees
              }
              closeModal={this.closeModal}
            />
          </Box>
        </Modal>
      </Box>
    );
  }
}

export default withRouter(AdminDashboardContainer);
