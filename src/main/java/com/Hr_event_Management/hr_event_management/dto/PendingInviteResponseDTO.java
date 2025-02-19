package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

import java.sql.Timestamp;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingInviteResponseDTO {

    private String eventId;
    private String eventName;
    private Timestamp eventDate;
    private Timestamp eventTime;
    private String eventLocation;
    private String status;
}

