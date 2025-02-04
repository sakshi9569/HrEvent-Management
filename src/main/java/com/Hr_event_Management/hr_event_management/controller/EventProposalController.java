package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.EventProposalRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;
import com.Hr_event_Management.hr_event_management.service.impl.EventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class EventProposalController {

    @Autowired
    private EventProposalService eventProposalService;

    @PostMapping("/{userId}/events/propose")
    public ResponseEntity<EventProposalResponseDTO> proposeEvent(
            @PathVariable Long userId,
            @RequestParam String eventName,
            @RequestParam String eventDate,
            @RequestParam String eventTime,
            @RequestParam String eventLocation,
            @RequestParam String agenda) {

        // Construct DTO with request params
        EventProposalRequestDTO eventProposalRequestDTO = new EventProposalRequestDTO(
                eventName,
                eventDate,  // Ensure eventDate is parsed correctly
                eventTime,
                eventLocation,
                agenda,
                userId  // Ensure createdById is set
        );

        // Pass only the DTO to the service (no inviteeIds)
        EventProposalResponseDTO response = eventProposalService.proposeEvent(eventProposalRequestDTO);

        return ResponseEntity.ok(response);
    }
}
