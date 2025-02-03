package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Invite;
import java.util.List;

public interface InviteDao {

    List<Invite> findByUserId(Long userId);  // Method to fetch invites for a given user

    void save(Invite invite);
}


