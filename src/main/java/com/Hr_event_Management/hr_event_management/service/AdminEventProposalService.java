package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;

import java.util.List;

public interface AdminEventProposalService {
    AdminEventActionResponseDTO takeAction(Long proposalId, AdminEventActionRequestDTO adminEventActionRequestDTO);
    List<EventProposalResponseDTO> getAll();
}