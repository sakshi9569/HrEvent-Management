import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useStoreContext } from "../contextApi/ContextApi";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const UserDashboard = () => {
  const { id, token } = useStoreContext();
  const [activeSection, setActiveSection] = useState(null);
  const [subSection, setSubSection] = useState(null);
  const [invites, setInvites] = useState([]);
  const [pendingInvites, setPendingInvites] = useState([]);
  const [proposedEvents, setProposedEvents] = useState([]);
  const [error, setError] = useState(null);
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
          setError(error.response ? error.response.data : "An error occurred");
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
          setError(error.response ? error.response.data : "An error occurred");
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
          setError(error.response ? error.response.data : "An error occurred");
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
      console.log(error);
    }
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
        <h2 className="text-2xl font-bold mb-8">User Dashboard</h2>
        <button
          className={`w-4/5 py-3 mb-4 text-left px-4 rounded-lg transition-all duration-300 ${
            activeSection === "Invites"
              ? "bg-blue-700 shadow-md"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => {
            setActiveSection("Invites");
            setSubSection(null);
          }}
        >
          Invites
        </button>
        <button
          className={`w-4/5 py-3 mb-4 text-left px-4 rounded-lg transition-all duration-300 ${
            activeSection === "Proposed Events"
              ? "bg-blue-700 shadow-md"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          onClick={() => {
            setActiveSection("Proposed Events");
            setSubSection(null);
          }}
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
        {activeSection === "Invites" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Invites</h2>
            <div className="flex space-x-4 mb-8">
              <button
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  subSection === "All Invites"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSubSection("All Invites")}
              >
                All Invites
              </button>
              <button
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  subSection === "Pending Invites"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSubSection("Pending Invites")}
              >
                Pending Invites
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {subSection === "All Invites" && (
                  <ul className="space-y-4">
                    {invites.map((invite) => (
                      <li
                        key={invite.eventId}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <strong className="text-xl text-blue-600">
                          {invite.eventName}
                        </strong>
                        <p className="text-gray-600 mt-2">
                          Date: {invite.eventDate}
                        </p>
                        <p className="text-gray-600">Time: {invite.eventTime}</p>
                        <p className="text-gray-600">
                          Location: {invite.eventLocation}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {subSection === "Pending Invites" && (
                  <ul className="space-y-4">
                    {pendingInvites.map((invite) => (
                      <li
                        key={invite.eventId}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <strong className="text-xl text-blue-600">
                          {invite.eventName}
                        </strong>
                        <p className="text-gray-600 mt-2">
                          Date: {invite.eventDate}
                        </p>
                        <p className="text-gray-600">Time: {invite.eventTime}</p>
                        <p className="text-gray-600">
                          Location: {invite.eventLocation}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </div>
        )}

        {activeSection === "Proposed Events" && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Proposed Events
            </h2>
            <div className="flex space-x-4 mb-8">
              <button
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  subSection === "All Proposed Events"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSubSection("All Proposed Events")}
              >
                All Proposed Events
              </button>
              <button
                className={`px-6 py-3 rounded-lg transition-all duration-300 ${
                  subSection === "Propose Event"
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => setSubSection("Propose Event")}
              >
                Propose Event
              </button>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-40">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                {subSection === "All Proposed Events" && (
                  <ul className="space-y-4">
                    {proposedEvents.map((event) => (
                      <li
                        key={event.eventId}
                        className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                      >
                        <strong className="text-xl text-blue-600">
                          {event.eventName}
                        </strong>
                        <p className="text-gray-600 mt-2">
                          Date: {event.eventDate}
                        </p>
                        <p className="text-gray-600">Time: {event.eventTime}</p>
                        <p className="text-gray-600">
                          Location: {event.eventLocation}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}

                {subSection === "Propose Event" && (
                  <form
                    className="bg-white p-8 rounded-lg shadow-md"
                    onSubmit={(e) => {
                      e.preventDefault();
                      const formData = new FormData(e.target);
                      const eventData = Object.fromEntries(formData.entries());
                      handleProposeEvent(eventData);
                    }}
                  >
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="eventName"
                      >
                        Event Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="eventName"
                        name="eventName"
                        type="text"
                        placeholder="Event Name"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="eventDate"
                      >
                        Event Date
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="eventDate"
                        name="eventDate"
                        type="date"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="eventTime"
                      >
                        Event Time
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="eventTime"
                        name="eventTime"
                        type="datetime-local"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="eventLocation"
                      >
                        Event Location
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="eventLocation"
                        name="eventLocation"
                        type="text"
                        placeholder="Event Location"
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="agenda"
                      >
                        Agenda
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                        id="agenda"
                        name="agenda"
                        placeholder="Agenda"
                        required
                      />
                    </div>
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                      type="submit"
                    >
                      Propose Event
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default UserDashboard;