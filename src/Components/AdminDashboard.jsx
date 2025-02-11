import React, { useState, useEffect } from "react";
import api from "../api/api";
import Modal from "react-modal";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

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
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col items-center py-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-8">Admin Dashboard</h2>
        <button
          className="w-4/5 py-3 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-300"
          onClick={() => openModal("create")}
        >
          Create Event
        </button>
        <button
          className="w-4/5 py-3 mb-4 bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-300"
          onClick={handleFetchAllEvents}
        >
          Fetch All Events
        </button>
        <button
          className="w-4/5 py-3 mb-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
          onClick={() => setActiveSection("Proposed Events")}
        >
          Proposed Events
        </button>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 overflow-auto"
      >
        {/* Proposed Events Section */}
        {activeSection === "Proposed Events" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Proposed Events</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {proposedEvents.map((event) => (
                  <div
                    key={event.eventId}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-blue-600">{event.eventName}</h3>
                    <p className="text-gray-600 mt-2">Date: {event.eventDate}</p>
                    <p className="text-gray-600">Time: {event.eventTime}</p>
                    <p className="text-gray-600">Location: {event.eventLocation}</p>
                    <p className="text-gray-600">Agenda: {event.agenda}</p>
                    <p className="text-gray-600">Status: {event.proposalStatus}</p>
                    <div className="mt-4 space-x-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                        onClick={(e) => handleSuccess(e, event.eventId)}
                        name="ACCEPTED"
                      >
                        Accept
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                        onClick={(e) => handleSuccess(e, event.eventId)}
                        name="REJECTED"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* All Events Section */}
        {activeSection === "All Events" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">All Events</h2>
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {allEvents.map((event) => (
                  <div
                    key={event.eventId}
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <h3 className="text-xl font-bold text-blue-600">{event.agenda}</h3>
                    <p className="text-gray-600 mt-2">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-600">Time: {new Date(event.time).toLocaleTimeString()}</p>
                    <p className="text-gray-600">Location: {event.location}</p>
                    <p className="text-gray-600">Status: {event.status}</p>
                    <div className="mt-4 space-x-2">
                      <button
                        className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                        onClick={() => openModal("modify", event)}
                      >
                        Modify
                      </button>
                      <button
                        className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-lg transition-all duration-300"
                        onClick={() => openModal("addInvitees", event)}
                      >
                        Add Invitees
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold mb-6">
          {modalType === "create"
            ? "Create Event"
            : modalType === "modify"
            ? "Modify Event"
            : "Add Invitees"}
        </h2>
        <form
          onSubmit={
            modalType === "create"
              ? handleCreateEvent
              : modalType === "modify"
              ? handleModifyEvent
              : handleAddInvitees
          }
          className="flex flex-col gap-4"
        >
          {modalType === "create" && (
            <>
              <input
                type="text"
                placeholder="First Name"
                value={eventData.firstName}
                onChange={(e) => setEventData({ ...eventData, firstName: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={eventData.lastName}
                onChange={(e) => setEventData({ ...eventData, lastName: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Agenda"
                value={eventData.agenda}
                onChange={(e) => setEventData({ ...eventData, agenda: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="datetime-local"
                value={eventData.time}
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                value={eventData.date}
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={eventData.location}
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Invited User IDs (comma-separated)"
                value={eventData.invitedUserIds}
                onChange={(e) => setEventData({ ...eventData, invitedUserIds: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}
          {modalType === "modify" && selectedEvent && (
            <>
              <input
                type="text"
                placeholder="Agenda"
                value={selectedEvent.agenda}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, agenda: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="datetime-local"
                value={selectedEvent.time ? new Date(selectedEvent.time).toISOString().slice(0, 16) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="date"
                value={selectedEvent.date ? new Date(selectedEvent.date).toISOString().slice(0, 10) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={selectedEvent.location}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </>
          )}
          {modalType === "addInvitees" && (
            <input
              type="text"
              placeholder="Invitee User IDs (comma-separated)"
              value={invitees}
              onChange={(e) => setInvitees(e.target.value)}
              className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-all duration-300"
          >
            {modalType === "create"
              ? "Create Event"
              : modalType === "modify"
              ? "Modify Event"
              : "Add Invitees"}
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-4 text-red-500 hover:text-red-600 transition-all duration-300"
        >
          Cancel
        </button>
      </Modal>
    </div>
  );
};

export default AdminDashboard;