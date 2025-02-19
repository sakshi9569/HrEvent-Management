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

    public AdminEventProposalDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Optional<ProposedEvent> findByProposalId(Long proposalId) {
        ProposedEvent proposedEvent = entityManager.find(ProposedEvent.class, proposalId);
        return Optional.ofNullable(proposedEvent);
    }

    @Override
    public ProposedEvent save(ProposedEvent proposedEvent) {
        if (proposedEvent.getId() == null) {
            entityManager.persist(proposedEvent);
            return proposedEvent;
        } else {
            return entityManager.merge(proposedEvent);
        }
    }

    @Override
    public List<ProposedEvent> findAll() {
        return entityManager.createQuery("SELECT p FROM ProposedEvent p", ProposedEvent.class)
                .getResultList();
    }
}
