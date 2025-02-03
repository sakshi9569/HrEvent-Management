package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Event;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
@Transactional
public class EventDaoImpl implements EventDao {

    private final EntityManager entityManager;

    @Autowired
    public EventDaoImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Event save(Event event) {
        if (event.getId() == null) {
            entityManager.persist(event);
            return event;
        } else {
            return entityManager.merge(event);
        }
    }

    @Override
    public Optional<Event> findById(UUID eventId) {
        return Optional.ofNullable(entityManager.find(Event.class, eventId));
    }

    @Override
    public List<Event> findAll() {
        return entityManager.createQuery("SELECT e FROM Event e", Event.class).getResultList();
    }

    @Override
    public void deleteById(UUID eventId) {
        Event event = entityManager.find(Event.class, eventId);
        if (event != null) {
            entityManager.remove(event);
        }
    }
}
