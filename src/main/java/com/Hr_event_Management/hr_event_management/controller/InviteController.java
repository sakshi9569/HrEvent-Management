package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.*;
import com.Hr_event_Management.hr_event_management.service.InviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class InviteController {

    private final InviteService inviteService;

    @Autowired
    public InviteController(InviteService inviteService) {
        this.inviteService = inviteService;
    }

    // Endpoint to get invites for the user
    @GetMapping("/{userId}/invites")
    public ResponseEntity<List<InviteResponseDTO>> getInvites(@PathVariable Long userId) {
        List<InviteResponseDTO> invites = inviteService.getInvitesForUser(userId);
        return ResponseEntity.ok(invites);
    }

    @GetMapping("/{userId}/invites/pending")
    public ResponseEntity<List<PendingInviteResponseDTO>> getPendingInvites(@PathVariable Long userId) {
        List<PendingInviteResponseDTO> pendingInvites = inviteService.getPendingInvites(userId);
        return ResponseEntity.ok(pendingInvites);
    }

    @PostMapping("/{userId}/invites/{eventId}/respond")
    public ResponseEntity<InviteActionResponseDTO> respondToInvite(
            @PathVariable Long userId,
            @PathVariable Long eventId,
            @RequestBody InviteActionRequestDTO inviteActionRequestDTO) {

        String responseMessage = inviteService.respondToInvite(userId, eventId, inviteActionRequestDTO);

        InviteActionResponseDTO responseDTO = new InviteActionResponseDTO(
                200, responseMessage
        );

        return ResponseEntity.ok(responseDTO);
    }

    @GetMapping("/{userId}/invites/history")
    public ResponseEntity<List<InviteHistoryResponseDTO>> getInviteHistory(@PathVariable Long userId) {
        List<InviteHistoryResponseDTO> history = inviteService.getInviteHistory(userId);
        return ResponseEntity.ok(history);
    }

    @GetMapping("/{userId}/invites/conflicts")
    public ResponseEntity<List<InviteResponseDTO>> getConflictingInvites(@PathVariable Long userId) {
        List<InviteResponseDTO> conflicts = inviteService.getConflictingInvites(userId);
        return ResponseEntity.ok(conflicts);
    }

}