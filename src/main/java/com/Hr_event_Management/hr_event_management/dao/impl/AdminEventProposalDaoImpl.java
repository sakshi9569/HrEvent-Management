package com.Hr_event_Management.hr_event_management.dao.impl;

import com.Hr_event_Management.hr_event_management.dao.AdminEventProposalDao;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class AdminEventProposalDaoImpl implements AdminEventProposalDao {

    private final EntityManager entityManager;

    @Autowired
    public AdminEventProposalDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Optional<ProposedEvent> findByProposalId(Long proposalId) {
        // Fetching proposed event by proposalId
        ProposedEvent proposedEvent = entityManager.find(ProposedEvent.class, proposalId);
        return Optional.ofNullable(proposedEvent);
    }

    @Override
    public ProposedEvent save(ProposedEvent proposedEvent) {
        // Persist or merge the proposed event depending on if it already exists
        if (proposedEvent.getId() == null) {
            entityManager.persist(proposedEvent);
            return proposedEvent;  // Returning the saved entity
        } else {
            return entityManager.merge(proposedEvent);  // Merging if the entity exists
        }
    }

    @Override
    public List<ProposedEvent> findAll() {
        // Fetching all proposed events
        return entityManager.createQuery("SELECT p FROM ProposedEvent p", ProposedEvent.class)
                .getResultList();
    }
}
