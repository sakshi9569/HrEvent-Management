package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Invite;
import java.util.List;
import java.util.Optional;

public interface InviteDao {

    List<Invite> findByUserId(Long userId);// Method to fetch invites for a given user
    List<Invite> findPendingByUserId(Long userId);
    Optional<Invite> findByEventIdAndUserId(Long eventId, Long userId);
    List<Invite> findHistoryByUserId(Long userId);

    List<Invite> findConflictingInvites(Long userId);
    List<Long> findUserIdsByEventId(Long eventId);

    void save(Invite invite);
}


