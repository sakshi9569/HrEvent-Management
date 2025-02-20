package com.Hr_event_Management.hr_event_management.service.impl;
import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.dto.*;
import com.Hr_event_Management.hr_event_management.model.Invite;
import com.Hr_event_Management.hr_event_management.service.InviteService;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class InviteServiceImpl implements InviteService {

    private final InviteDao inviteDao;
    private final UserDao userDao;
    public InviteServiceImpl(InviteDao inviteDao, UserDao userDao) {
        this.inviteDao = inviteDao;
        this.userDao = userDao;
    }

    @Override
    public List<InviteResponseDTO> getInvitesForUser(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();

        List<Invite> invites = inviteDao.findByUserId(userId).stream()
                .filter(invite -> invite.getStatus() == InvitationStatus.ACCEPTED)
                .filter(invite -> {
                    LocalDate eventDate = invite.getEvent().getDate();
                    LocalTime eventTime = invite.getEvent().getTime();
                    LocalDateTime eventDateTime = LocalDateTime.of(eventDate, eventTime);
                    return eventDate.isAfter(today) || (eventDate.isEqual(today) && eventDateTime.isAfter(now));
                })
                .collect(Collectors.toList());
        return invites.stream()
                .map(invite -> new InviteResponseDTO(
                        invite.getEvent().getId().toString(),
                        invite.getEvent().getEventName(),
                        invite.getEvent().getDate(),
                        invite.getEvent().getTime(),
                        invite.getEvent().getLocation()
                ))
                .collect(Collectors.toList());
    }



    @Override
    public List<PendingInviteResponseDTO> getPendingInvites(Long userId) {
        LocalDateTime now = LocalDateTime.now();
        LocalDate today = now.toLocalDate();

        List<Invite> invites = inviteDao.findPendingByUserId(userId).stream()
                .filter(invite -> {
                    LocalDate eventDate = invite.getEvent().getDate();
                    LocalTime eventTime = invite.getEvent().getTime();
                    LocalDateTime eventDateTime = LocalDateTime.of(eventDate, eventTime);
                    return eventDate.isAfter(today) || (eventDate.isEqual(today) && eventDateTime.isAfter(now));
                })
                .collect(Collectors.toList());
        return invites.stream()
                .map(invite -> new PendingInviteResponseDTO(
                        invite.getEvent().getId().toString(),
                        invite.getEvent().getAgenda(),
                        invite.getEvent().getDate(),
                        invite.getEvent().getTime(),
                        invite.getEvent().getLocation(),
                        "PENDING"
                ))
                .collect(Collectors.toList());
    }



    @Override
    public String respondToInvite(Long userId, Long eventId, InviteActionRequestDTO inviteActionRequestDTO) {
        Optional<Invite> inviteOptional = inviteDao.findByEventIdAndUserId(eventId, userId);
        if (!inviteOptional.isPresent()) {
            return "Invite not found or invalid user-event combination.";
        }

        Invite invite = inviteOptional.get();

        if (!invite.getStatus().equals(InvitationStatus.PENDING)) {
            return "Invite is no longer in a pending state.";
        }

        switch (inviteActionRequestDTO.getUserAction().toUpperCase()) {
            case "ACCEPT":
                invite.setStatus(InvitationStatus.ACCEPTED);
                invite.setRemarks(inviteActionRequestDTO.getUserRemarks());
                inviteDao.save(invite);
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

        return "Invite response recorded successfully.";
    }

    @Override
    public List<InviteHistoryResponseDTO> getInviteHistory(Long userId) {
        List<Invite> invites = inviteDao.findHistoryByUserId(userId);

        return invites.stream()
                .map(invite -> new InviteHistoryResponseDTO(
                        invite.getEvent().getId().toString(),
                        invite.getEvent().getAgenda(),
                        invite.getEvent().getDate().toString(),
                        invite.getEvent().getTime().toString(),
                        invite.getEvent().getLocation(),
                        invite.getStatus()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public List<InviteResponseDTO> getConflictingInvites(Long userId) {
        List<Invite> conflictingInvites = inviteDao.findConflictingInvites(userId);

        return conflictingInvites.stream()
                .map(invite -> new InviteResponseDTO(
                        invite.getEvent().getId().toString(),
                        invite.getEvent().getEventName(),
                        invite.getEvent().getDate(),
                        invite.getEvent().getTime(),
                        invite.getEvent().getLocation()
                ))
                .collect(Collectors.toList());
    }
}