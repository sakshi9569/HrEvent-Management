package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class EventRequestDTO {
    private String firstName;
    private String lastName;
    private String agenda;
    private Timestamp time;
    private Timestamp date;
    private String location;
    private String status;
    private Long createdById; // ID of the user who is creating the event
}
