package com.Hr_event_Management.hr_event_management.dto;

import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdminEventActionRequestDTO {
    private ProposalStatus action;
    private String remarks;
}
