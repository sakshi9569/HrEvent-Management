package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingInviteResponseDTO {

    private String eventId;
    private String eventName;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventLocation;
    private String status;
}

