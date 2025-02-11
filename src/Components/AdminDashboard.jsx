import React, { useState, useEffect } from "react";
import api from "../api/api";
import Modal from "react-modal";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Single modal for all actions
  const [modalType, setModalType] = useState(null); // Type of modal: "create", "modify", or "addInvitees"
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
  const [invitees, setInvitees] = useState(""); // State for invitees input

  // Fetch proposed events when the active section changes
  useEffect(() => {
    if (activeSection === "Proposed Events") {
      const fetchProposedEvents = async () => {
        try {
          const response = await api.get(`/user/proposedEvents/all`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProposedEvents(response.data);
        } catch (error) {
          toast.error(error.response ? error.response.data : "An error occurred");
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
      setIsModalOpen(false); // Close the modal
      setEventData({ // Reset form data
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
    try {
      const response = await api.get("/user/event/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllEvents(response.data);
      setActiveSection("All Events"); // Set active section to display all events
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
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
      setIsModalOpen(false); // Close the modal
      handleFetchAllEvents(); // Refresh the events list
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
      .filter((invitee) => !isNaN(invitee.userId)); // Filter out invalid user IDs

    try {
      await api.post(`/user/event/${selectedEvent.eventId}/add-invitees`, inviteesList, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Invitees added successfully");
      setIsModalOpen(false); // Close the modal
      setInvitees(""); // Reset invitees input
      handleFetchAllEvents(); // Refresh the events list
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };
  const handleSuccess = async (e, eventId) => {
    e.preventDefault();
    const action = e.target.name; // "ACCEPTED" or "REJECTED"
  
    try {
      await api.post(
        `/user/proposal/${eventId}/action`,
        {
          action: action,
          remark: "ok", // You can customize the remark if needed
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(`Proposal ${action.toLowerCase()} successfully`);
      // Refresh the proposed events list
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
    if (event) {
      setSelectedEvent(event);
    }
  };

  // Close modal and reset state
  const closeModal = () => {
    setIsModalOpen(false);
    setModalType(null);
    setSelectedEvent(null);
    setInvitees(""); // Reset invitees input
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center py-8">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

        {/* Create Event Button */}
        <button
          className="w-3/4 py-2 mb-4 bg-blue-500 hover:bg-blue-600 rounded-lg"
          onClick={() => openModal("create")}
        >
          Create Event
        </button>

        {/* Fetch All Events Button */}
        <button
          className="w-3/4 py-2 mb-4 bg-green-500 hover:bg-green-600 rounded-lg"
          onClick={handleFetchAllEvents}
        >
          Fetch All Events
        </button>

        {/* Proposed Events Button */}
        <button
          className="w-3/4 py-2 mb-4 bg-gray-700 hover:bg-gray-600 rounded-lg"
          onClick={() => setActiveSection("Proposed Events")}
        >
          Proposed Events
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {/* Proposed Events Section */}
        {activeSection === "Proposed Events" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Proposed Events</h2>
            {proposedEvents.map((event) => (
              <div key={event.id} className="p-4 bg-white shadow-md mb-4 rounded-lg">
                <p><strong>{event.eventName}</strong></p>
                <p>{event.eventDate}</p>
                <p>{event.eventTime}</p>
                <p>{event.eventLocation}</p>
                <p>{event.agenda}</p>
                <p>{event.proposalStatus}</p>
                <p>{event.createdById}</p>
                <button className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded" onClick={(e) => handleSuccess(e, event.eventId)} name="ACCEPTED">ACCEPTED</button>
                <button className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded" onClick={(e) => handleSuccess(e, event.eventId)} name="REJECTED">REJECTED</button>
              </div>
            ))}
          </div>
        )}

        {/* All Events Section */}
        {activeSection === "All Events" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">All Events</h2>
            {allEvents.map((event, index) => (
              <div key={event.id || index} className="p-4 bg-white shadow-md mb-4 rounded-lg">
                <p><strong>Event ID:</strong> {event.eventId}</p>
                <p><strong>Event Name:</strong> {event.agenda}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {new Date(event.time).toLocaleTimeString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Status:</strong> {event.status}</p>
                <button
                  onClick={() => openModal("modify", event)}
                  className="mt-2 bg-yellow-500 text-white py-1 px-3 rounded"
                >
                  Modify Event
                </button>
                <button
                  onClick={() => openModal("addInvitees", event)}
                  className="mt-2 bg-purple-500 text-white py-1 px-3 rounded"
                >
                  Add Invitees
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Single Modal for All Actions */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">
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
          className="flex flex-col gap-3"
        >
          {modalType === "create" && (
            <>
              <input type="text" name="firstName" placeholder="First Name" onChange={(e) => setEventData({ ...eventData, firstName: e.target.value })} required className="border p-2 rounded" />
              <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setEventData({ ...eventData, lastName: e.target.value })} required className="border p-2 rounded" />
              <input type="text" name="agenda" placeholder="Agenda" onChange={(e) => setEventData({ ...eventData, agenda: e.target.value })} required className="border p-2 rounded" />
              <input type="datetime-local" name="time" onChange={(e) => setEventData({ ...eventData, time: e.target.value })} required className="border p-2 rounded" />
              <input type="date" name="date" onChange={(e) => setEventData({ ...eventData, date: e.target.value })} required className="border p-2 rounded" />
              <input type="text" name="location" placeholder="Location" onChange={(e) => setEventData({ ...eventData, location: e.target.value })} required className="border p-2 rounded" />
              <input type="text" name="invitedUserIds" placeholder="Invited User IDs (comma-separated)" onChange={(e) => setEventData({ ...eventData, invitedUserIds: e.target.value })} required className="border p-2 rounded" />
            </>
          )}
          {modalType === "modify" && selectedEvent && (
            <>
              <input
                type="text"
                name="agenda"
                placeholder="Agenda"
                value={selectedEvent.agenda || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, agenda: e.target.value })}
                required
                className="border p-2 rounded"
              />
              <input
                type="datetime-local"
                name="time"
                value={selectedEvent.time ? new Date(selectedEvent.time).toISOString().slice(0, 16) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
                required
                className="border p-2 rounded"
              />
              <input
                type="date"
                name="date"
                value={selectedEvent.date ? new Date(selectedEvent.date).toISOString().slice(0, 10) : ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
                required
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={selectedEvent.location || ""}
                onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                required
                className="border p-2 rounded"
              />
            </>
          )}
          {modalType === "addInvitees" && (
            <>
              <input
                type="text"
                name="invitees"
                placeholder="Invitee User IDs (comma-separated)"
                value={invitees}
                onChange={(e) => setInvitees(e.target.value)}
                required
                className="border p-2 rounded"
              />
            </>
          )}
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            {modalType === "create"
              ? "Create Event"
              : modalType === "modify"
              ? "Modify Event"
              : "Add Invitees"}
          </button>
        </form>
        <button onClick={closeModal} className="mt-4 text-red-500">Cancel</button>
      </Modal>
    </div>
  );
};

export default AdminDashboard;