import React, { useState, useEffect } from "react";
import api from "../api/api";
import Modal from "react-modal";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";

Modal.setAppElement("#root");

const AdminDashboard = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const [eventResponse, setEventResponse] = useState({
    eventId: null,
    firstName: "",
    lastName: "",
    agenda: "",
    time: "",
    date: "",
    location: "",
    status: "",
    createdById: null,
    message: "",
  });
  useEffect(() => {
    if (activeSection === "Proposed Events" && subSection === "View Proposed Events") {
      const fetchProposedEvents = async () => {
        try {
          const response = await api.get(`/admin/proposed-events`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProposedEvents(response.data);
        } catch (error) {
          setError(error.response ? error.response.data : "An error occurred");
        }
      };
      fetchProposedEvents();
    }
  }, [activeSection, subSection, token]);

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
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleFetchAll = async () => {
    console.log(token);
    try {

      const response = await api.get("/user/event/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Fetched Events:", response.data); 
      toast.success("Events fetched successfully");
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
    }
  };
  return (
    <div className="flex h-screen">
      <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center py-8">
        <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
        <button className="w-3/4 py-2 mb-4 bg-gray-700 hover:bg-gray-600 rounded-lg" onClick={() => setActiveSection("Event Management")}>
          Event Management
        </button>
        <button className="w-3/4 py-2 mb-4 bg-gray-700 hover:bg-gray-600 rounded-lg" onClick={() => setActiveSection("Proposed Events")}>
          Proposed Events
        </button>
      </div>

      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {activeSection === "Event Management" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Event Management</h2>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={() => setIsModalOpen(true)}>Create Event</button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg" onClick={handleFetchAll}>Fetch All Event</button>
            
          </div>
        )}

        {activeSection === "Proposed Events" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Proposed Events</h2>
            {proposedEvents.map((event) => (
              <div key={event.id} className="p-4 bg-white shadow-md mb-4">
                <p><strong>{event.eventName}</strong></p>
                <p>{event.eventDateTime}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-xl font-bold mb-4">Create Event</h2>
        <form onSubmit={handleCreateEvent} className="flex flex-col gap-3">
          <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="agenda" placeholder="Agenda" onChange={handleChange} required className="border p-2 rounded" />
          <input type="datetime-local" name="time" onChange={handleChange} required className="border p-2 rounded" />
          <input type="date" name="date" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="location" placeholder="Location" onChange={handleChange} required className="border p-2 rounded" />
          <input type="text" name="invitedUserIds" placeholder="Invited User IDs (comma-separated)" onChange={handleChange} required className="border p-2 rounded" />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">Create Event</button>
          
        </form>
        <button onClick={() => setIsModalOpen(false)} className="mt-4 text-red-500">Cancel</button>
      </Modal>
      
    </div>
  );
};

export default AdminDashboard;
