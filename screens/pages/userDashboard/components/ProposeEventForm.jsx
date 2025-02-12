import React from "react";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";

const ProposeEventForm = ({ handleProposeEvent }) => {
  return (
    <Paper sx={{ p: 4, boxShadow: 3 }}>
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
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Event Location"
              name="eventLocation"
              required
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
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: blue[600] }}
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