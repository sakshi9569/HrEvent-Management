package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteHistoryResponseDTO {
    private String eventId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private String eventLocation;
    private InvitationStatus eventAction;
}

