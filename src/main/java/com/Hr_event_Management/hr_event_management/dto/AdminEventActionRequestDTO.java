package com.Hr_event_Management.hr_event_management.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminEventActionRequestDTO {
    private String action;  // "accept" or "reject"
    private String remarks; // Reason for action
}
