package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.ProposedEvent;

import java.util.List;

public interface EventProposalDao {

    ProposedEvent save(ProposedEvent proposedEvent);  // Method to save or update an event proposal

    List<ProposedEvent> findByUserId(Long userId);    // Method to find proposed events by user ID

}

