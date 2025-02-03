package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.Event;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface EventDao {

    Event save(Event event);  // Save a new event

    Optional<Event> findById(UUID eventId);  // Find event by ID

    List<Event> findAll();  // Get all events

    void deleteById(UUID eventId);  // Delete an event by ID
}
