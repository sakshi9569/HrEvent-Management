package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.dto.EventRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.InviteRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.ModifyEventRequestDTO;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.model.Invite;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import com.Hr_event_Management.hr_event_management.Enums.Role;
import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventService {

    final static String CANCEL_ACTION = "cancel";

    private final EventDao eventDao;
    private final InviteDao inviteDao;
    private final UserDao userDao;

    @Autowired
    public EventService(EventDao eventDao, InviteDao inviteDao, UserDao userDao) {
        this.eventDao = eventDao;
        this.inviteDao = inviteDao;
        this.userDao = userDao;
    }

    // Method to create an event and send invites to multiple users
    @Transactional
    public EventResponseDTO createEventWithInvites(EventRequestDTO eventRequestDTO, List<Long> invitedUserIds) {
        // Fetch the creator (admin) from the database
        Optional<User> creatorUser = userDao.findById(eventRequestDTO.getCreatedById());
        if (creatorUser.isEmpty()) {
            throw new RuntimeException("Creator not found");
        }

        User creator = creatorUser.get();

        // TODO - check conflicts of event
        // Create and populate the Event entity
        Event event = new Event();
        event.setFirstName(eventRequestDTO.getFirstName());
        event.setLastName(eventRequestDTO.getLastName());
        event.setAgenda(eventRequestDTO.getAgenda());
        event.setTime(eventRequestDTO.getTime());
        event.setDate(eventRequestDTO.getDate());
        event.setLocation(eventRequestDTO.getLocation());

        // Convert String status from DTO to EventStatus enum
        try {
            EventStatus status = EventStatus.valueOf(eventRequestDTO.getStatus().toUpperCase());  // Convert String to Enum
            event.setStatus(status);  // Set status as EventStatus enum
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + eventRequestDTO.getStatus());
        }

        event.setCreatedBy(creator);
        event.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        // Save the event to the database
        event = eventDao.save(event);  // Persist the event and capture the saved entity

        // Create invites for each user in the invitedUserIds list
        //TODO - use streaming
        for (Long userId : invitedUserIds) {
            Optional<User> invitedUserOpt = userDao.findById(userId);
            if (invitedUserOpt.isPresent()) {
                User invitedUser = invitedUserOpt.get();
                Invite invite = new Invite();
                invite.setEvent(event);  // Link the invite to the created event
                invite.setUser(invitedUser);  // Link the invite to the invited user
                invite.setStatus(InvitationStatus.PENDING);  // Set the status of the invitation
                inviteDao.save(invite);  // Save the invite to the database
            } else {
                throw new RuntimeException("User with ID " + userId + " not found");
            }
        }

        // Prepare EventResponseDTO to return
        EventResponseDTO eventResponseDTO = new EventResponseDTO();
        eventResponseDTO.setEventId(event.getId());  // Set the event ID properly
        eventResponseDTO.setFirstName(event.getFirstName());
        eventResponseDTO.setLastName(event.getLastName());
        eventResponseDTO.setAgenda(event.getAgenda());
        eventResponseDTO.setTime(event.getTime());
        eventResponseDTO.setDate(event.getDate());
        eventResponseDTO.setLocation(event.getLocation());
        eventResponseDTO.setStatus(event.getStatus().name());  // Convert enum to String to return in response
        eventResponseDTO.setCreatedById(creator.getUserId());
        eventResponseDTO.setMessage("Event and invitations created successfully");

        return eventResponseDTO;
    }


    // Modify event method (unchanged as per your request)
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
        Optional<Event> eventOptional = eventDao.findById(modifyEventRequestDTO.getEventId());
        // Assuming modifyEventRequestDTO is an instance of ModifyEventRequestDTO
        if (eventOptional.isEmpty()) {
            return "Event not found!";
        }

        Event event = eventOptional.get();

        //TODO - make variable in the class
        // Perform the action (cancel, update, or reschedule)
        switch (modifyEventRequestDTO.getAction().toLowerCase()) {
            case CANCEL_ACTION:
                event.setStatus(EventStatus.CANCELED);
                break;
            case "update":
                if(modifyEventRequestDTO.getEventName() != null){
                    event.setFirstName(modifyEventRequestDTO.getEventName());
                }
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
        }// Update the event
        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        eventDao.save(event);
        return "Event modified successfully!";
    }

    @Transactional
    public String addInvitees(Long eventId, List<InviteRequestDTO> inviteRequestDTOs) {
        Optional<Event> eventOptional = eventDao.findById(eventId);

        if (eventOptional.isEmpty()) {
            return "Event not found.";
        }

        Event event = eventOptional.get();

        List<Invite> newInvites = inviteRequestDTOs.stream().map(dto -> {
            Optional<User> userOptional = userDao.findById(dto.getUserId());
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User with ID " + dto.getUserId() + " not found.");
            }

            User user = userOptional.get();
            Invite invite = new Invite();
            invite.setEvent(event);
            invite.setUser(user);
            invite.setStatus(InvitationStatus.PENDING);
            return invite;
        }).collect(Collectors.toList());

        newInvites.forEach(inviteDao::save);
        return "Invitees added successfully.";
    }
}