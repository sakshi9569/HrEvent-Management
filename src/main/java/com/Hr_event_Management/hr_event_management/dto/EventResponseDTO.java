package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventResponseDTO {

    private Long eventId;  // Make sure this field exists
    private String firstName;
    private String lastName;
    private String agenda;
    private LocalTime time;
    private LocalDate date;
    private String location;
    private EventStatus status;
    private Long createdById;
    private String message;
}
