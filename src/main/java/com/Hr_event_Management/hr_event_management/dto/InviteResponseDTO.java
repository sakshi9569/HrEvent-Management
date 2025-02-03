package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteResponseDTO {
    private String eventId;     // Event ID (could be a String or UUID)
    private String eventName;   // Name of the event
    private String eventDate;   // Date of the event
    private String eventTime;   // Time of the event
    private String eventLocation; // Location of the event
}
