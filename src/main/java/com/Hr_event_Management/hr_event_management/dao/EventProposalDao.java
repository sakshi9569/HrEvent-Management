package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventProposalDao {

    ProposedEvent save(ProposedEvent proposedEvent);  // Method to save or update an event proposal
    ProposedEvent getById(Long id);
    List<ProposedEvent> findByUserId(Long userId);// Method to find proposed events by user ID
    void deleteById(Long id);
    List<ProposedEvent> findAll();
}

