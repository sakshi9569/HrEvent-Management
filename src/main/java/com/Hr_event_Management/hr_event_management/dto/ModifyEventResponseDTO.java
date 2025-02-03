package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyEventResponseDTO {
    private String status;  // "success" or "error"
    private String message; // Message describing the result
}
