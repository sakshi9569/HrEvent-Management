package com.Hr_event_Management.hr_event_management.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventProposalResponseDTO {

    private Long eventId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String agenda;
    private String proposalStatus;  // e.g., "PENDING", "APPROVED", etc.
    private Long createdById;
    private String message;
}
