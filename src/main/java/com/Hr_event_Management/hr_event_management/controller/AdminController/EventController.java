package com.Hr_event_Management.hr_event_management.controller.AdminController;

import com.Hr_event_Management.hr_event_management.dto.*;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.service.impl.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user/event")  // The URL path for user event creation
//TODO - rename as admin
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {this.eventService = eventService;
    }

    // Create Event with Invites
    @PostMapping("/create")
    public EventResponseDTO createEventWithInvites(@RequestBody EventRequestDTO eventRequestDTO,
                                                   @RequestParam List<Long> invitedUserIds) {
        return eventService.createEventWithInvites(eventRequestDTO, invitedUserIds);
    }


    @PutMapping("/{eventId}/modify")
    public ResponseEntity<ModifyEventResponseDTO> modifyEvent(
            @PathVariable Long eventId,
            @RequestBody ModifyEventRequestDTO modifyEventRequest) {

        // Call the service layer to modify the event
        String result = eventService.modifyEvent(eventId, modifyEventRequest);
        // Return the response with the result
        ModifyEventResponseDTO response = new ModifyEventResponseDTO();
        response.setMessage(result);
        if (result.contains("success")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/{eventId}/add-invitees")
    public ResponseEntity<String> addInvitees(@PathVariable Long eventId, @RequestBody List<InviteRequestDTO> inviteRequestDTOs) {
        String response = eventService.addInvitees(eventId, inviteRequestDTOs);
        return ResponseEntity.ok(response);
    }


}