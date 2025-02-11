import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";


const UserDashboard = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null); 
  const [subSection, setSubSection] = useState(null); 
  const [invites, setInvites] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeSection === "Invites" && subSection === "All Invites") {
      const fetchInvites = async () => {
        try {
          const response = await api.get(`/user/${id}/invites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setInvites(response.data);
        } catch (error) {
          setError(error.response ? error.response.data : "An error occurred");
        }
      };
      fetchInvites();
    }
  }, [id, token, activeSection, subSection]);

  useEffect(() => {
    if (activeSection === "Invites" && subSection === "Pending Invites") {
      const fetchPendingInvites = async () => {
        try {
          const response = await api.get(`/user/${id}/invites/pending`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setPendingInvites(response.data);
        } catch (error) {
          setError(error.response ? error.response.data : "An error occurred");
        }
      };
      fetchPendingInvites();
    }
  }, [id, token, activeSection, subSection]);


  useEffect(() => {
    if (activeSection === "Proposed Events" && subSection) {
      const fetchProposedEvents = async () => {
        try {
          const response = await api.get(`/user/${id}/proposed-events`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProposedEvents(response.data);
        } catch (error) {
          setError(error.response ? error.response.data : "An error occurred");
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
        }
      await api.post(`/user/${id}/events/propose`, formattedEventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Event proposed successfully");
      reset(); // Reset form after successful submission
    } catch (error) {
      toast.error(error.response ? error.response.data : "An error occurred");
      console.log(error); 
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white flex flex-col items-center py-8">
        <h2 className="text-xl font-bold mb-6">User Dashboard</h2>
        <button
          className={`w-3/4 py-2 mb-4 text-left px-4 rounded-lg ${
            activeSection === "Invites" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => {
            setActiveSection("Invites");
            setSubSection(null); // Reset subsection on main section change
          }}
        >
          Invites
        </button>
        <button
          className={`w-3/4 py-2 mb-4 text-left px-4 rounded-lg ${
            activeSection === "Proposed Events" ? "bg-gray-600" : "bg-gray-700 hover:bg-gray-600"
          }`}
          onClick={() => {
            setActiveSection("Proposed Events");
            setSubSection(null); // Reset subsection on main section change
          }}
        >
          Proposed Events
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 overflow-auto">
        {activeSection === "Invites" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Invites</h2>
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  subSection === "All Invites" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setSubSection("All Invites")}
              >
                All Invites
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  subSection === "Pending Invites" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setSubSection("Pending Invites")}
              >
                Pending Invites
              </button>
            </div>

            {subSection === "All Invites" && (
              <ul>
                {invites.map((invite) => (
                  <li key={invite.eventId} className="mb-4">
                    <strong>{invite.eventName}</strong> <br />
                    Date: {invite.eventDate} <br />
                    Time: {invite.eventTime} <br />
                    Location: {invite.eventLocation}
                  </li>
                ))}
              </ul>
            )}

            {subSection === "Pending Invites" && (
              <ul>
                {pendingInvites.map((invite) => (
                  <li key={invite.eventId} className="mb-4 border-b pb-4">
                    <strong>{invite.eventName}</strong> <br />
                    Date: {invite.eventDate} <br />
                    Time: {invite.eventTime} <br />
                    Location: {invite.eventLocation} <br />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeSection === "Proposed Events" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Proposed Events</h2>
            <div className="flex space-x-4 mb-6">
              <button
                className={`px-4 py-2 rounded-lg ${
                  subSection === "All Proposed Events" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setSubSection("All Proposed Events")}
              >
                All Proposed Events
              </button>
              <button
                className={`px-4 py-2 rounded-lg ${
                  subSection === "Propose Event" ? "bg-blue-500 text-white" : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setSubSection("Propose Event")}
              >
                Propose Event
              </button>
            </div>

            {subSection === "All Proposed Events" && (
              <ul>
                {proposedEvents.map((event) => (
                  <li key={event.eventId} className="mb-4">
                    <strong>{event.eventName}</strong> <br />
                    Date: {event.eventDate} <br />
                    Time: {event.eventTime} <br />
                    Location: {event.eventLocation}
                  </li>
                ))}
              </ul>
            )}

            {subSection === "Propose Event" && (
              <form
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const eventData = Object.fromEntries(formData.entries());
                  handleProposeEvent(eventData);
                }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventName">
                    Event Name
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventName"
                    name="eventName"
                    type="text"
                    placeholder="Event Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventDate">
                    Event Date
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventDate"
                    name="eventDate"
                    type="date"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventTime">
                    Event Time
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventTime"
                    name="eventTime"
                    type="datetime-local"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="eventLocation">
                    Event Location
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="eventLocation"
                    name="eventLocation"
                    type="text"
                    placeholder="Event Location"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agenda">
                    Agenda
                  </label>
                  <textarea
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="agenda"
                    name="agenda"
                    placeholder="Agenda"
                    required
                  />
                </div>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Propose Event
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
