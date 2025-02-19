package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Event;
import java.util.List;
import java.util.Optional;

public interface EventDao {
    Event save(Event event);
    Optional<Event> findById(Long eventId);
    List<Event> findAll();
}
