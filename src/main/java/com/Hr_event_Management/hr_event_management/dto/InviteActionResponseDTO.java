package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class InviteActionResponseDTO {

    private int status;   // HTTP status code
    private String message; // Response message
}

