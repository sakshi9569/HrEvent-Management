import React, { useState, useEffect } from "react";
import { Box } from "@mui/material"; // Import the Box component
import api from "../../../../api/api";
import { useStoreContext } from "../../../../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import Sidebar from "../components/Sidebar";
import InvitesSection from "../components/InvitesSection";
import ProposedEventsSection from "../components/ProposedEventsSection";

const UserDashboardContainer = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [invites, setInvites] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeSection === "Invites" && subSection === "All Invites") {
      const fetchInvites = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/user/${id}/invites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInvites(response.data);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchInvites();
    }
  }, [id, token, activeSection, subSection]);

  useEffect(() => {
    if (activeSection === "Invites" && subSection === "Pending Invites") {
      const fetchPendingInvites = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/user/${id}/invites/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPendingInvites(response.data);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
        } finally {
          setLoading(false);
        }
      };
      fetchPendingInvites();
    }
  }, [id, token, activeSection, subSection]);

  useEffect(() => {
    if (activeSection === "Proposed Events" && subSection) {
      const fetchProposedEvents = async () => {
        setLoading(true);
        try {
          const response = await api.get(`/user/proposedEvents/all`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
  }, [id, token, activeSection, subSection]);

  const handleProposeEvent = async (eventData) => {
    try {
      const formattedEventData = {
        ...eventData,
        createdById: id,
        eventTime: new Date(eventData.eventTime).toISOString(),
        eventDate: new Date(eventData.eventDate).toISOString(),
      };
      await api.post(`/user/${id}/events/propose`, formattedEventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Event proposed successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "grey.50" }}>
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setSubSection={setSubSection}
      />
      <Box sx={{ flex: 1, overflow: "auto", padding: 24 }}>
        {activeSection === "Invites" && (
          <InvitesSection
            subSection={subSection}
            setSubSection={setSubSection}
            invites={invites}
            pendingInvites={pendingInvites}
            loading={loading}
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