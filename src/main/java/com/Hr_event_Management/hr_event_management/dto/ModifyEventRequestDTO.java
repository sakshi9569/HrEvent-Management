package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyEventRequestDTO {
    private Long eventId; // Change this to Long to match Event entity
    private String empId;
    private String role;
    private String action;
    private String eventName;
    private Timestamp eventDate;
    private Timestamp eventTime;
    private String eventLocation;
}


