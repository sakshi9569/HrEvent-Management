package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteHistoryResponseDTO {
    private String eventId;           // Event ID
    private String eventName;         // Name of the event
    private String eventDate;         // Date of the event
    private String eventTime;         // Time of the event
    private String eventLocation;     // Location of the event
    private InvitationStatus eventAction; // Action taken (ACCEPTED, REJECTED, PENDING,RESCHEDULED)
}

