package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyEventRequestDTO {
    private Long eventId; // ID of the event to be modified
    private String empId; // Employee ID of the admin
    private String role;  // Role of the user (should be "ADMIN")
    private String action; // "cancel", "update", "reschedule"
    private String eventName;
    private String eventDate; // Required for update or reschedule
    private String eventTime; // Required for update or reschedule
    private String eventLocation; // Required for update or reschedule
}
