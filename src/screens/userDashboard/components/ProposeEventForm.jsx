import React from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const ProposeEventForm = ({ handleProposeEvent }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    handleProposeEvent(data);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: "100%",
        maxWidth: "400px",
        padding: 4,
        boxShadow: 3,
        borderRadius: 2,
        bgcolor: "#E2E0C8",
        margin: "0 auto",
        mt: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", color: "#5C7285", mb: 3 }}
      >
        Propose Event
      </Typography>

      <Box sx={{ mt: 3 }}>
        {/* Event Name Field */}
        <TextField
          fullWidth
          label="Event Name"
          {...register("eventName", { required: "Event Name is required" })}
          error={!!errors.eventName}
          helperText={errors.eventName?.message}
          sx={{
            mb: 2,
            bgcolor: "#A7B49E",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#5C7285" },
            "& .MuiInputLabel-root": { color: "#5C7285" },
          }}
        />

        <TextField
          fullWidth
          label="Event Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          {...register("eventDate", { required: "Event Date is required" })}
          error={!!errors.eventDate}
          helperText={errors.eventDate?.message}
          sx={{
            mb: 2,
            bgcolor: "#A7B49E",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#5C7285" },
            "& .MuiInputLabel-root": { color: "#5C7285" },
          }}
        />

        <TextField
          fullWidth
          label="Event Time"
          type="time"
          InputLabelProps={{ shrink: true }}
          {...register("eventTime", { required: "Event Time is required" })}
          error={!!errors.eventTime}
          helperText={errors.eventTime?.message}
          sx={{
            mb: 2,
            bgcolor: "#A7B49E",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#5C7285" },
            "& .MuiInputLabel-root": { color: "#5C7285" },
          }}
          inputProps={{
            step: 60,
          }}
        />

        <TextField
          fullWidth
          label="Event Location"
          {...register("eventLocation", {
            required: "Event Location is required",
          })}
          error={!!errors.eventLocation}
          helperText={errors.eventLocation?.message}
          sx={{
            mb: 2,
            bgcolor: "#A7B49E",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#5C7285" },
            "& .MuiInputLabel-root": { color: "#5C7285" }, // Label color
          }}
        />

        {/* Agenda Field */}
        <TextField
          fullWidth
          label="Agenda"
          multiline
          rows={4}
          {...register("agenda", { required: "Agenda is required" })}
          error={!!errors.agenda}
          helperText={errors.agenda?.message}
          sx={{
            mb: 2,
            bgcolor: "#A7B49E",
            borderRadius: 1,
            "& .MuiInputBase-input": { color: "#5C7285" }, // Input text color
            "& .MuiInputLabel-root": { color: "#5C7285" }, // Label color
          }}
        />
      </Box>

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          py: 1.5,
          fontWeight: "bold",
          bgcolor: "#5C7285",
          color: "#E2E0C8",
          "&:hover": { bgcolor: "#818C78" },
          borderRadius: 5,
        }}
      >
        Propose Event
      </Button>
    </Box>
  );
};

export default ProposeEventForm;
