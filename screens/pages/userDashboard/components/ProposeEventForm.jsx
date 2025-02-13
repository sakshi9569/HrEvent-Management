import React from "react";
import { Button, Grid, Paper, TextField, Typography } from "@mui/material";

const ProposeEventForm = ({ handleProposeEvent }) => {
  return (
    <Paper className="p-6 shadow-lg bg-[#A7B49E] text-white rounded-lg">
      <Typography variant="h5" className="mb-4 text-[#E2E0C8]">
        Propose a New Event
      </Typography>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const eventData = Object.fromEntries(formData.entries());
          handleProposeEvent(eventData);
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Name"
              name="eventName"
              required
              className="bg-white rounded-md"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Date"
              name="eventDate"
              type="date"
              InputLabelProps={{ shrink: true }}
              required
              className="bg-white rounded-md"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Time"
              name="eventTime"
              type="datetime-local"
              InputLabelProps={{ shrink: true }}
              required
              className="bg-white rounded-md"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              name="eventLocation"
              required
              className="bg-white rounded-md"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Agenda"
              name="agenda"
              multiline
              rows={4}
              required
              className="bg-white rounded-md"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              className="bg-[#5C7285] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Propose Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ProposeEventForm;
