package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.EventRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.ModifyEventRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.ModifyEventResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.Enums.Role;

import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;

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
        event.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

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

    // Modify Event method using ModifyEventRequestDTO
    public String modifyEvent(Long eventId, ModifyEventRequestDTO modifyEventRequestDTO) {
        // Convert empId from String to Long
        Long empId;
        try {
            empId = Long.valueOf(modifyEventRequestDTO.getEmpId()); // Convert String empId to Long
        } catch (NumberFormatException e) {
            return "Invalid employee ID format!";
        }

        // Ensure the requester is an admin
        Optional<User> userOptional = userDao.findById(empId); // Now using the Long type for empId
        if (userOptional.isEmpty() || !Role.ADMIN.equals(userOptional.get().getRole())) {
            return "Unauthorized: Only admins can modify events!";
        }

        // Fetch the event by ID (Ensure the eventId is correct type)
        // Assuming modifyEventRequestDTO is an instance of ModifyEventRequestDTO
        Optional<Event> eventOptional = eventDao.findById(modifyEventRequestDTO.getEventId());
        // Assuming eventId is a String and needs conversion to UUID
        if (eventOptional.isEmpty()) {
            return "Event not found!";
        }

        Event event = eventOptional.get();

        // Perform the action (cancel, update, or reschedule)
        switch (modifyEventRequestDTO.getAction().toLowerCase()) {
            case "cancel":
                event.setStatus(EventStatus.CANCELED);
                break;
            case "update":
                event.setAgenda(modifyEventRequestDTO.getEventName());
                event.setTime(Timestamp.valueOf(modifyEventRequestDTO.getEventTime() + ":00"));
                event.setDate(Timestamp.valueOf(modifyEventRequestDTO.getEventDate() + " 00:00:00"));
                event.setLocation(modifyEventRequestDTO.getEventLocation());
                break;
            case "reschedule":
                event.setTime(Timestamp.valueOf(modifyEventRequestDTO.getEventTime() + ":00"));
                event.setDate(Timestamp.valueOf(modifyEventRequestDTO.getEventDate() + " 00:00:00"));
                break;
            default:
                return "Invalid action! Use 'cancel', 'update', or 'reschedule'.";
        }

        // Update the event
        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        eventDao.save(event);

        return "Event modified successfully!";
    }


}
