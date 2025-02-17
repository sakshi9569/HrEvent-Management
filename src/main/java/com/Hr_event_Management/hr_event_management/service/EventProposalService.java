package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.EventProposalRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;

public interface EventProposalService {
    EventProposalResponseDTO proposeEvent(EventProposalRequestDTO eventProposalRequestDTO);
}