package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.*;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")  // The URL path for user event creation
public class EventController {

    @Autowired
    private EventService eventService;

    // Create Event API (Admin/User)
    @PostMapping("/event")
    public ResponseEntity<EventResponseDTO> createEvent(@RequestBody EventRequestDTO eventRequestDTO) {
        // Call EventService to create an event
        EventResponseDTO response = eventService.createEvent(eventRequestDTO);

        // Return response with status 200 (OK)
        return ResponseEntity.ok(response);
    }
    // Modify event (cancel, update, or reschedule)
    @PutMapping("/event/{eventId}/modify")
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

}
