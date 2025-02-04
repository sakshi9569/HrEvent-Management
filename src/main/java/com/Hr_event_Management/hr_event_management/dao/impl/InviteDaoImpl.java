package com.Hr_event_Management.hr_event_management.dao.impl;

import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.model.Invite;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class InviteDaoImpl implements InviteDao {

    // Use @PersistenceContext instead of @Autowired for EntityManager
    @PersistenceContext
    private EntityManager entityManager;


    // Fetch invites by user ID
    @Override
    public List<Invite> findByUserId(Long userId) {
        String jpql = "SELECT i FROM Invite i WHERE i.user.id = :userId";
        TypedQuery<Invite> query = entityManager.createQuery(jpql, Invite.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    @Override
    public List<Invite> findPendingByUserId(Long userId) {
        String jpql = "SELECT i FROM Invite i WHERE i.user.id = :userId AND i.status = 'PENDING'";
        TypedQuery<Invite> query = entityManager.createQuery(jpql, Invite.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    @Override
    public Optional<Invite> findByEventIdAndUserId(Long eventId, Long userId) {
        String jpql = "SELECT i FROM Invite i WHERE i.event.id = :eventId AND i.user.id = :userId";
        TypedQuery<Invite> query = entityManager.createQuery(jpql, Invite.class);
        query.setParameter("eventId", eventId);
        query.setParameter("userId", userId);
        Invite invite = query.getResultStream().findFirst().orElse(null);
        return Optional.ofNullable(invite);  // Return the invite wrapped in Optional
    }


    public List<Invite> findHistoryByUserId(Long userId) {
        LocalDateTime last24Hours = LocalDateTime.now().minusHours(24);

        String jpql = "SELECT i FROM Invite i WHERE i.user.id = :userId AND i.updatedAt >= :last24Hours";
        TypedQuery<Invite> query = entityManager.createQuery(jpql, Invite.class);
        query.setParameter("userId", userId);
        query.setParameter("last24Hours", java.sql.Timestamp.valueOf(last24Hours));

        return query.getResultList();
    }

    // Save invite
    @Override
    @Transactional
    public void save(Invite invite) {
        entityManager.persist(invite); // Persist invite in the database
    }
}