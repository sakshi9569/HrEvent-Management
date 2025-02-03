package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Invite;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import java.util.List;

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

    // Save invite
    @Override
    @Transactional
    public void save(Invite invite) {
        entityManager.persist(invite); // Persist invite in the database
    }
}