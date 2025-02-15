package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;

@Getter
@Setter
// TODO - add validation. Read about @Valid
public class EventRequestDTO {
    private String firstName;
    private String lastName;
    private String agenda;
    private Timestamp time;
    private Timestamp date;
    private String location;
    private String status; // create a enum for all status
    private Long createdById;
    private List<Long> invitedUserIds;
    // ID of the user who is creating the event
}
