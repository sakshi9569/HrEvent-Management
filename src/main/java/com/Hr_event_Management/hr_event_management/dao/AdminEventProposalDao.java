package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AdminEventProposalDao {

    Optional<ProposedEvent> findByProposalId(Long proposalId);

    ProposedEvent save(ProposedEvent proposedEvent);

    List<ProposedEvent> findAll();
}
