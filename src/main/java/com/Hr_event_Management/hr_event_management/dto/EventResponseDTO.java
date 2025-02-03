package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class EventResponseDTO {
    private Long eventId;           // Event ID
    private String firstName;       // Event's first name (or any relevant detail)
    private String lastName;        // Event's last name (or any relevant detail)
    private String agenda;          // Event agenda
    private Timestamp time;         // Event time
    private Timestamp date;         // Event date
    private String location;        // Event location
    private EventStatus status;     // Event status
    private Long createdById;       // The ID of the creator (admin)
    private String message;         // Message indicating success or failure (e.g. "Event created successfully")
}
