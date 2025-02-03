package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteActionRequestDTO {
    
    private String userAction;  // Accept, Deny, or Reschedule
    private String userRemarks; // Optional remarks
}
