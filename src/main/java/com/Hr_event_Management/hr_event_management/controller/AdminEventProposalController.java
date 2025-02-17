package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;
import com.Hr_event_Management.hr_event_management.service.AdminEventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")  // TODO - For all the admin APIs use admin0user in the path and put it in respective APiAuth Constant file.
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
    // TODO - Understand he working of this API.
    @PostMapping("/proposal/{proposalId}/action")
    public ResponseEntity<AdminEventActionResponseDTO> takeActionOnProposedEvent(
            @PathVariable Long proposalId,
            @RequestBody AdminEventActionRequestDTO adminEventActionRequestDTO) {


        AdminEventActionResponseDTO responseDTO = adminEventProposalService.takeAction(proposalId, adminEventActionRequestDTO);

        return ResponseEntity.ok(responseDTO);
    }
    @GetMapping("/proposedEvents/all")
    public ResponseEntity<List<EventProposalResponseDTO>> getAll(){
        return ResponseEntity.ok(adminEventProposalService.getAll());
    }
}
