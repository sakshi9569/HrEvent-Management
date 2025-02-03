package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.dto.InviteResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Invite;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InviteService {

    private final InviteDao inviteDao;

    @Autowired
    public InviteService(InviteDao inviteDao) {
        this.inviteDao = inviteDao;
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
}

