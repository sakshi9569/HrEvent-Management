package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.EventRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {

    @Autowired
    private EventDao eventDao;

    @Autowired
    private UserDao userDao;

    // Create Event method, using EventRequestDTO
    public EventResponseDTO createEvent(EventRequestDTO eventRequestDTO) {
        // Fetch the creator (admin) from the database
        Optional<User> creatorUser = userDao.findById(eventRequestDTO.getCreatedById());

        if (creatorUser.isEmpty()) {
            throw new RuntimeException("Creator not found");
        }

        User creator = creatorUser.get();

        // Create and populate the Event entity
        Event event = new Event();
        event.setFirstName(eventRequestDTO.getFirstName());
        event.setLastName(eventRequestDTO.getLastName());
        event.setAgenda(eventRequestDTO.getAgenda());
        event.setTime(eventRequestDTO.getTime());
        event.setDate(eventRequestDTO.getDate());
        event.setLocation(eventRequestDTO.getLocation());
        event.setStatus(eventRequestDTO.getStatus());
        event.setCreatedBy(creator);
        event.setCreatedAt(new java.sql.Timestamp(System.currentTimeMillis()));
        event.setUpdatedAt(new java.sql.Timestamp(System.currentTimeMillis()));

        // Save the event to the database
        eventDao.save(event);

        // Return EventResponseDTO
        EventResponseDTO eventResponseDTO = new EventResponseDTO();
        eventResponseDTO.setEventId(event.getId());
        eventResponseDTO.setFirstName(event.getFirstName());
        eventResponseDTO.setLastName(event.getLastName());
        eventResponseDTO.setAgenda(event.getAgenda());
        eventResponseDTO.setTime(event.getTime());
        eventResponseDTO.setDate(event.getDate());
        eventResponseDTO.setLocation(event.getLocation());
        eventResponseDTO.setStatus(event.getStatus());
        eventResponseDTO.setCreatedById(creator.getUserId());
        eventResponseDTO.setMessage("Event created successfully");

        return eventResponseDTO;
    }
}
