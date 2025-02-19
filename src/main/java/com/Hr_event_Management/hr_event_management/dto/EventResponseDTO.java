package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDTO {

    private Long eventId;  // Make sure this field exists
    private String firstName;
    private String lastName;
    private String agenda;
    private Timestamp time;
    private Timestamp date;
    private String location;
    private EventStatus status;
    private Long createdById;
    private String message;
}
