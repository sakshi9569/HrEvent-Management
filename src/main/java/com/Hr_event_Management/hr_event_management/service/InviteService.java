package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.*;
import java.util.List;

public interface InviteService {
    List<InviteResponseDTO> getInvitesForUser(Long userId);
    List<PendingInviteResponseDTO> getPendingInvites(Long userId);
    String respondToInvite(Long userId, Long eventId, InviteActionRequestDTO inviteActionRequestDTO);
    List<InviteHistoryResponseDTO> getInviteHistory(Long userId);
    List<InviteResponseDTO> getConflictingInvites(Long userId);
}