package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EventProposalRequestDTO {

    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String agenda;
    private Long createdById;

}
