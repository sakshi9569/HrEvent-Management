package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventProposalResponseDTO {

    private Long eventId;
    private String eventName;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventLocation;
    private String agenda;
    private ProposalStatus proposalStatus;
    private Long createdById;
    private String message;
}
