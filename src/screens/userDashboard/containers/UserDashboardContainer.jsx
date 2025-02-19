import React, { Component } from "react";
import { Box } from "@mui/material";
import { toast } from "react-hot-toast";
import { withRouter } from "../../../utils/withRouter";
import Sidebar from "../components/Sidebar";
import InvitesSection from "../components/InvitesSection";
import ProposedEventsSection from "../components/ProposedEventsSection";
import Navbar from "../../../shared";
import {
  fetchUserInvites,
  fetchUserPendingInvites,
  fetchProposedEvents,
  proposeEvent,
  respondToInvite,
} from "../../../api/auth";
import { ContextApi } from "../../../contextApi/ContextApi";

class UserDashboardContainer extends Component {
  static contextType = ContextApi;

  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
      subSection: null,
      invites: [],
      pendingInvites: [],
      proposedEvents: [],
      loading: false,
    };
  }

  async componentDidUpdate(prevProps, prevState) {
    const { activeSection, subSection } = this.state;

    if (
      prevState.activeSection !== activeSection ||
      prevState.subSection !== subSection
    ) {
      const { id, token } = this.context;

      if (activeSection === "Invites" && subSection === "All Invites") {
        this.fetchUserInvitesData(id, token);
      }
      if (activeSection === "Invites" && subSection === "Pending Invites") {
        this.fetchUserPendingInvitesData(id, token);
      }
      if (activeSection === "Proposed Events" && subSection) {
        this.fetchProposedEventsData(id, token);
      }
    }
  }

  fetchUserInvitesData = async (id, token) => {
    this.setState({ loading: true });
    try {
      const response = await fetchUserInvites(id, token);
      this.setState({ invites: response });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchUserPendingInvitesData = async (id, token) => {
    this.setState({ loading: true });
    try {
      const response = await fetchUserPendingInvites(id, token);
      this.setState({ pendingInvites: response });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      this.setState({ loading: false });
    }
  };

  fetchProposedEventsData = async (id, token) => {
    this.setState({ loading: true });
    try {
      const response = await fetchProposedEvents(id, token);
      this.setState({ proposedEvents: response });
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleProposeEvent = async (eventData) => {
    const { id, token } = this.context;
    try {
      const formattedEventData = {
        ...eventData,
        createdById: id,
        eventTime: new Date(
          `${new Date().toISOString().split("T")[0]}T${
            eventData.eventTime
          }:00+07:00`
        ).toISOString(),
        eventDate: new Date(eventData.eventDate).toISOString(),
      };
      await proposeEvent(id, formattedEventData, token);
      toast.success("Event proposed successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  handleRespondToInvite = async (eventId, action, remarks = "") => {
    const { id, token } = this.context;
    try {
      const response = await respondToInvite(
        id,
        eventId,
        action,
        remarks,
        token
      );
      toast.success(response.message);

      const { subSection, invites, pendingInvites } = this.state;
      if (subSection === "All Invites") {
        this.fetchUserInvitesData(id, token);
      } else if (subSection === "Pending Invites") {
        const updatedPendingInvites = pendingInvites.filter(
          (invite) => invite.eventId !== eventId
        );
        this.setState({ pendingInvites: updatedPendingInvites });
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  handleLogout = async () => {
    const { setToken, setUserId } = this.context;
    setToken(null);
    setUserId(null);

    localStorage.removeItem("role");
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");

    this.props.navigate("/");
  };

  render() {
    const {
      activeSection,
      subSection,
      invites,
      pendingInvites,
      proposedEvents,
      loading,
    } = this.state;

    return (
      <Box
        sx={{ display: "flex", height: "100vh", backgroundColor: "grey.50" }}
      >
        <Navbar handleLogout={this.handleLogout} />
        <Sidebar
          activeSection={activeSection}
          setActiveSection={(section) =>
            this.setState({ activeSection: section })
          }
          setSubSection={(subSection) => this.setState({ subSection })}
        />
        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            padding: 30,
            marginTop: -25,
            marginLeft: 30,
          }}
        >
          {activeSection === "Invites" && (
            <InvitesSection
              subSection={subSection}
              setSubSection={(section) =>
                this.setState({ subSection: section })
              }
              invites={invites}
              pendingInvites={pendingInvites}
              loading={loading}
              userId={this.context.id}
              handleRespondToInvite={this.handleRespondToInvite}
            />
          )}
          {activeSection === "Proposed Events" && (
            <ProposedEventsSection
              subSection={subSection}
              setSubSection={(section) =>
                this.setState({ subSection: section })
              }
              proposedEvents={proposedEvents}
              loading={loading}
              handleProposeEvent={this.handleProposeEvent}
            />
          )}
        </Box>
      </Box>
    );
  }
}

export default withRouter(UserDashboardContainer);
