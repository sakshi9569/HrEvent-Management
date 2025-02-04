package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import com.Hr_event_Management.hr_event_management.dao.AdminEventProposalDao;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminEventProposalService {

    private final AdminEventProposalDao adminEventProposalDao;

    @Autowired
    public AdminEventProposalService(AdminEventProposalDao adminEventProposalDao) {
        this.adminEventProposalDao = adminEventProposalDao;
    }

    public AdminEventActionResponseDTO takeAction(Long proposalId, AdminEventActionRequestDTO adminEventActionRequestDTO) {
        // Fetch the proposed event by proposalId
        ProposedEvent proposedEvent = adminEventProposalDao.findByProposalId(proposalId)
                .orElseThrow(() -> new RuntimeException("Proposal not found"));

        // Take action on the proposed event
        proposedEvent.setProposalStatus(ProposalStatus.valueOf(adminEventActionRequestDTO.getAction()));  // Set action (accept/reject)
        proposedEvent.setRemarks(adminEventActionRequestDTO.getRemarks());  // Set remarks

        // Save the updated proposal status and remarks
        adminEventProposalDao.save(proposedEvent);

        // Return success response
        return new AdminEventActionResponseDTO("success", "Event proposal " + adminEventActionRequestDTO.getAction() + "ed successfully");
    }
}
