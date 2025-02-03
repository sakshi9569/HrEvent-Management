package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Invite;
import java.util.List;
import java.util.Optional;

public interface InviteDao {

    List<Invite> findByUserId(Long userId);// Method to fetch invites for a given user
    List<Invite> findPendingByUserId(Long userId);
    // Method to fetch invite by eventId and userId (used for accepting/rejecting/rescheduling)
    Optional<Invite> findByEventIdAndUserId(Long eventId, Long userId);
    List<Invite> findHistoryByUserId(Long userId);

    void save(Invite invite);
}


