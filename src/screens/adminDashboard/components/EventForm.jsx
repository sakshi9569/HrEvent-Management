import React from "react";
import { TextField, Button, Box } from "@mui/material";

const EventForm = ({ modalType, eventData, setEventData, selectedEvent, setSelectedEvent, invitees, setInvitees, handleSubmit, closeModal }) => {
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, backgroundColor: "#E2E0C8", padding: 3, borderRadius: 2, boxShadow: 3 }}>
      {modalType === "create" && (
        <>
          <TextField
            fullWidth
            label="First Name"
            value={eventData.firstName}
            onChange={(e) => setEventData({ ...eventData, firstName: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Last Name"
            value={eventData.lastName}
            onChange={(e) => setEventData({ ...eventData, lastName: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Agenda"
            value={eventData.agenda}
            onChange={(e) => setEventData({ ...eventData, agenda: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            value={eventData.time}
            onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="date"
            value={eventData.date}
            onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={eventData.location}
            onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Invited Email IDs (comma-separated)"
            value={eventData.invitedUserIds}
            onChange={(e) => setEventData({ ...eventData, invitedUserIds: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
        </>
      )}
      {modalType === "modify" && selectedEvent && (
        <>
          <TextField
            fullWidth
            label="Agenda"
            value={selectedEvent.agenda}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, agenda: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="datetime-local"
            value={selectedEvent.time ? new Date(selectedEvent.time).toISOString().slice(0, 16) : ""}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, time: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            type="date"
            value={selectedEvent.date ? new Date(selectedEvent.date).toISOString().slice(0, 10) : ""}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, date: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
          <TextField
            fullWidth
            label="Location"
            value={selectedEvent.location}
            onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
            sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
          />
        </>
      )}
      {modalType === "addInvitees" && (
        <TextField
          fullWidth
          label="Invitee Email IDs (comma-separated)"
          value={invitees}
          onChange={(e) => setInvitees(e.target.value)}
          sx={{ mb: 2, backgroundColor: "#A7B49E", borderRadius: 1 }}
        />
      )}
      <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: "#5C7285", color: "#E2E0C8", "&:hover": { backgroundColor: "#818C78" } }}>
        {modalType === "create"
          ? "Create Event"
          : modalType === "modify"
          ? "Modify Event"
          : "Add Invitees"}
      </Button>
      <Button onClick={closeModal} fullWidth sx={{ mt: 1, backgroundColor: "#818C78", color: "#E2E0C8", "&:hover": { backgroundColor: "#5C7285" } }}>
        Cancel
      </Button>
    </Box>
  );
};

export default EventForm;