package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.dto.InviteActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.InviteResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.PendingInviteResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Invite;
import com.Hr_event_Management.hr_event_management.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InviteService {

    private final InviteDao inviteDao;
    private final UserDao userDao; // Inject UserDao

    @Autowired
    public InviteService(InviteDao inviteDao, UserDao userDao) {
        this.inviteDao = inviteDao;
        this.userDao = userDao;  // Assigning the injected UserDao
    }

    // Fetch invites for the given user ID
    public List<InviteResponseDTO> getInvitesForUser(Long userId) {
        List<Invite> invites = inviteDao.findByUserId(userId);

        // Convert Invite entities to InviteResponseDTO
        return invites.stream()
                .map(invite -> new InviteResponseDTO(
                        invite.getEvent().getId().toString(),  // Assuming the event ID is a String or UUID
                        invite.getEvent().getEventName(),
                        invite.getEvent().getDate().toString(),
                        invite.getEvent().getTime().toString(),
                        invite.getEvent().getLocation()
                ))
                .collect(Collectors.toList());
    }


    public List<PendingInviteResponseDTO> getPendingInvites(Long userId) {
        List<Invite> invites = inviteDao.findPendingByUserId(userId); // Fetch pending invites for the user

        // Convert to DTO
        return invites.stream()
                .map(invite -> new PendingInviteResponseDTO(
                        invite.getEvent().getId().toString(),      // Event ID
                        invite.getEvent().getAgenda(),              // Event Name
                        invite.getEvent().getDate().toString(),    // Event Date
                        invite.getEvent().getTime().toString(),    // Event Time
                        invite.getEvent().getLocation(),           // Event Location
                        "PENDING"                                  // Status is always "PENDING"
                ))
                .collect(Collectors.toList());
    }
    public String respondToInvite(Long userId, Long eventId, InviteActionRequestDTO inviteActionRequestDTO) {

        // Fetch invite from DB
        Optional<Invite> inviteOptional = inviteDao.findByEventIdAndUserId(eventId, userId);
        if (!inviteOptional.isPresent()) {
            return "Invite not found or invalid user-event combination.";
        }

        Invite invite = inviteOptional.get();

        // Check if invite is in "PENDING" status
        if (!invite.getStatus().equals(InvitationStatus.PENDING)) {
            return "Invite is no longer in a pending state.";
        }

        // Process the user action
        switch (inviteActionRequestDTO.getUserAction().toUpperCase()) {
            case "ACCEPT":
                invite.setStatus(InvitationStatus.ACCEPTED);
                break;
            case "DENY":
                invite.setStatus(InvitationStatus.REJECTED);
                break;
            case "RESCHEDULE":
                invite.setStatus(InvitationStatus.RESCHEDULED);
                break;
            default:
                return "Invalid action. Allowed actions: 'ACCEPT', 'DENY', 'RESCHEDULE'.";
        }

        // Set user remarks
        invite.setRemarks(inviteActionRequestDTO.getUserRemarks());

        // Save updated invite
        inviteDao.save(invite);

        return "Invite response recorded successfully.";
    }
}

