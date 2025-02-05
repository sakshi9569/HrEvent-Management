package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.service.impl.AdminEventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class AdminEventProposalController {

    private final AdminEventProposalService adminEventProposalService;

    @Autowired
    public AdminEventProposalController(AdminEventProposalService adminEventProposalService) {
        this.adminEventProposalService = adminEventProposalService;
    }

    /**
     * Endpoint for Admin to take action on a proposed event
     *
     * @param proposalId Proposal ID
     * @param adminEventActionRequestDTO Event action details (accept/reject)
     * @return ResponseEntity with success message
     */
    @PostMapping("/proposal/{proposalId}/action")
    public ResponseEntity<AdminEventActionResponseDTO> takeActionOnProposedEvent(
            @PathVariable Long proposalId,
            @RequestBody AdminEventActionRequestDTO adminEventActionRequestDTO) {


        AdminEventActionResponseDTO responseDTO = adminEventProposalService.takeAction(proposalId, adminEventActionRequestDTO);

        return ResponseEntity.ok(responseDTO);
    }
}
