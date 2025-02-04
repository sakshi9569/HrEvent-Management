package com.Hr_event_Management.hr_event_management.dao.impl;

import com.Hr_event_Management.hr_event_management.dao.EventProposalDao;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EventProposalDaoImpl implements EventProposalDao {

    @PersistenceContext
    private EntityManager entityManager;

    // Save or update a proposed event
    @Override
    public ProposedEvent save(ProposedEvent proposedEvent) {
        if (proposedEvent.getId() == null) {
            entityManager.persist(proposedEvent);  // Persist the proposed event if it's new
            return proposedEvent;
        } else {
            return entityManager.merge(proposedEvent);  // Update the existing proposed event
        }
    }

    // Find all proposed events for a given user by userId
    @Override
    public List<ProposedEvent> findByUserId(Long userId) {
        String queryStr = "SELECT e FROM ProposedEvent e WHERE e.user.id = :userId";
        TypedQuery<ProposedEvent> query = entityManager.createQuery(queryStr, ProposedEvent.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

}

