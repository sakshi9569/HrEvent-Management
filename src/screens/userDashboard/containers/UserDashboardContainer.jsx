import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useStoreContext } from "../../../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import InvitesSection from "../components/InvitesSection";
import ProposedEventsSection from "../components/ProposedEventsSection";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../shared";
import {
  fetchUserInvites,
  fetchUserPendingInvites,
  fetchProposedEvents,
  proposeEvent,
  respondToInvite,
} from "../../../api/auth"; 

const UserDashboardContainer = () => {
  const { id, token, setToken, setUserId } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [invites, setInvites] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch invites
  useEffect(() => {
    if (activeSection === "Invites" && subSection === "All Invites") {
      const fetchInvitesData = async () => {
        setLoading(true);
        try {
          const response = await fetchUserInvites(id, token); // Use centralized API
          setInvites(response);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchInvitesData();
    }
  }, [id, token, activeSection, subSection]);

  // Fetch pending invites
  useEffect(() => {
    if (activeSection === "Invites" && subSection === "Pending Invites") {
      const fetchPendingInvitesData = async () => {
        setLoading(true);
        try {
          const response = await fetchUserPendingInvites(id, token); // Use centralized API
          setPendingInvites(response);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchPendingInvitesData();
    }
  }, [id, token, activeSection, subSection]);

  // Fetch proposed events
  useEffect(() => {
    if (activeSection === "Proposed Events" && subSection) {
      const fetchProposedEventsData = async () => {
        setLoading(true);
        try {
          const response = await fetchProposedEvents(token); // Use centralized API
          setProposedEvents(response);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchProposedEventsData();
    }
  }, [id, token, activeSection, subSection]);

  // Handle proposing an event
  const handleProposeEvent = async (eventData) => {
    try {
      const formattedEventData = {
        ...eventData,
        createdById: id,
        eventTime: new Date(eventData.eventTime).toISOString(),
        eventDate: new Date(eventData.eventDate).toISOString(),
      };
      await proposeEvent(id, formattedEventData, token); // Use centralized API
      toast.success("Event proposed successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Handle responding to an invite
  const handleRespondToInvite = async (eventId, action, remarks = "") => {
    try {
      const response = await respondToInvite(id, eventId, action, remarks, token); // Use centralized API
      toast.success(response.message);

      if (subSection === "All Invites") {
        const invitesResponse = await fetchUserInvites(id, token); // Use centralized API
        setInvites(invitesResponse);
      } else if (subSection === "Pending Invites") {
        const updatedPendingInvites = pendingInvites.filter(
          (invite) => invite.eventId !== eventId
        );
        setPendingInvites(updatedPendingInvites);
      }
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  // Handle logout
  const handleLogout = async (e) => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("role");
    localStorage.removeItem("USER_DATA");
    localStorage.removeItem("JWT_TOKEN");
    localStorage.removeItem("id");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "grey.50" }}>
      <Navbar handleLogout={handleLogout} />
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setSubSection={setSubSection}
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
            setSubSection={setSubSection}
            invites={invites}
            pendingInvites={pendingInvites}
            loading={loading}
            userId={id}
            handleRespondToInvite={handleRespondToInvite}
          />
        )}
        {activeSection === "Proposed Events" && (
          <ProposedEventsSection
            subSection={subSection}
            setSubSection={setSubSection}
            proposedEvents={proposedEvents}
            loading={loading}
            handleProposeEvent={handleProposeEvent}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserDashboardContainer;