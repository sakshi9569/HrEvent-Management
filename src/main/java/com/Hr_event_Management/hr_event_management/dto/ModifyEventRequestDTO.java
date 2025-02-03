package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

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
    private String eventDate;
    private String eventTime;
    private String eventLocation;
}


