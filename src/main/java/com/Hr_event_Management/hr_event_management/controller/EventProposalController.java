package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.EventProposalRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;
import com.Hr_event_Management.hr_event_management.service.EventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class EventProposalController {

    @Autowired
    private EventProposalService eventProposalService;

    @PostMapping("/{userId}/events/propose")
    public ResponseEntity<EventProposalResponseDTO> proposeEvent(
            @PathVariable Long userId,
            @RequestBody EventProposalRequestDTO eventProposalRequestDTO) {
        EventProposalResponseDTO response = eventProposalService.proposeEvent(eventProposalRequestDTO);

        return ResponseEntity.ok(response);
    }
    @GetMapping("/{userId}/proposedEventsAll")
    public ResponseEntity<List<EventProposalResponseDTO>> getProposedEventbyUser(@PathVariable Long userId){
        List<EventProposalResponseDTO> all = eventProposalService.getProposedEvents(userId);
        return ResponseEntity.ok(all);
    }
}