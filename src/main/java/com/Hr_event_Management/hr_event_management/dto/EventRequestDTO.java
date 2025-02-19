package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
public class EventRequestDTO {
    private String firstName;
    private String lastName;
    private String agenda;
    private LocalTime time;
    private LocalDate date;
    private String location;
    private EventStatus status;
    private Long createdById;
    private List<String> invitedUserIds;
}
