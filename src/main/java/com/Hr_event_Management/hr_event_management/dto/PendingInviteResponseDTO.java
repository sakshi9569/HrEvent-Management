package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PendingInviteResponseDTO {

    private String eventId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private String status;
}

