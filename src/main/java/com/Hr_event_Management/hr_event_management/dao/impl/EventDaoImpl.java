package com.Hr_event_Management.hr_event_management.dao.impl;

import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.model.Event;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@Transactional
public class EventDaoImpl implements EventDao {

    String Query_getALLEvents = "SELECT e FROM Event e";

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
    //updating

    @Override
    public Optional<Event> findById(Long eventId) {
        return Optional.ofNullable(entityManager.find(Event.class, eventId));
    }

    @Override
    public List<Event> findAll() {
        return entityManager.createQuery(Query_getALLEvents, Event.class).getResultList();
    }


}
