package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventProposalDao {

    ProposedEvent save(ProposedEvent proposedEvent);
    ProposedEvent getById(Long id);
    List<ProposedEvent> findByUserId(Long userId);
    void deleteById(Long id);
    List<ProposedEvent> findAll();
}

