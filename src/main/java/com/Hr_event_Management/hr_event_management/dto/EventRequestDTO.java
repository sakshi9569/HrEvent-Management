package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.List;

@Getter
@Setter
public class EventRequestDTO {
    private String firstName;
    private String lastName;
    private String agenda;
    private Timestamp time;
    private Timestamp date;
    private String location;
    private EventStatus status;
    private Long createdById;  // Instead of User entity, just store the user ID
    private List<Long> inviteUserIds; // List of user IDs to be invited
}

