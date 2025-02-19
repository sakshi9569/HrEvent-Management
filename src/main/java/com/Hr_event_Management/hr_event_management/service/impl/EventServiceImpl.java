package com.Hr_event_Management.hr_event_management.service.impl;
import com.Hr_event_Management.hr_event_management.dao.InviteDao;
import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.dto.*;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.model.Invite;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.Enums.InvitationStatus;
import com.Hr_event_Management.hr_event_management.Enums.Role;
import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import com.Hr_event_Management.hr_event_management.service.EventService;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class EventServiceImpl implements EventService {

    private final EventDao eventDao;
    private final InviteDao inviteDao;
    private final UserDao userDao;
    public EventServiceImpl(EventDao eventDao, InviteDao inviteDao, UserDao userDao) {
        this.eventDao = eventDao;
        this.inviteDao = inviteDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public EventResponseDTO createEventWithInvites(EventRequestDTO eventRequestDTO, List<String> invitedUserIds) {
        Optional<User> creatorUser = userDao.findById(eventRequestDTO.getCreatedById());
        if (creatorUser.isEmpty()) {
            throw new RuntimeException("Creator not found");
        }

        User creator = creatorUser.get();

        Event event = new Event();
        event.setFirstName(eventRequestDTO.getFirstName());
        event.setLastName(eventRequestDTO.getLastName());
        event.setAgenda(eventRequestDTO.getAgenda());
        event.setTime(eventRequestDTO.getTime());
        event.setDate(eventRequestDTO.getDate());
        event.setLocation(eventRequestDTO.getLocation());

        try {
            EventStatus status = eventRequestDTO.getStatus();
            event.setStatus(status);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status value: " + eventRequestDTO.getStatus());
        }

        event.setCreatedBy(creator);
        event.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));

        event = eventDao.save(event);

        for (String email : invitedUserIds) {
            Optional<User> invitedUserOpt = userDao.findByEmail(email);
            if (invitedUserOpt.isPresent()) {
                User invitedUser = invitedUserOpt.get();
                Invite invite = new Invite();
                invite.setEvent(event);
                invite.setUser(invitedUser);
                invite.setStatus(InvitationStatus.PENDING);
                inviteDao.save(invite);
            } else {
                log.error("User with ID {} not found", email);
            }
        }

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
        eventResponseDTO.setMessage("Event and invitations created successfully");

        return eventResponseDTO;
    }

    @Override
    public String modifyEvent(Long eventId, ModifyEventRequestDTO modifyEventRequestDTO) {
        Long empId;
        try {
            empId = Long.valueOf(modifyEventRequestDTO.getEmpId());
        } catch (NumberFormatException e) {
            return "Invalid employee ID format!";
        }

        Optional<User> userOptional = userDao.findById(empId);
        if (userOptional.isEmpty() || !Role.ADMIN.equals(userOptional.get().getRole())) {
            return "Unauthorized: Only admins can modify events!";
        }

        Optional<Event> eventOptional = eventDao.findById(modifyEventRequestDTO.getEventId());
        if (eventOptional.isEmpty()) {
            return "Event not found!";
        }

        Event event = eventOptional.get();

        switch (modifyEventRequestDTO.getAction().toLowerCase()) {
            case "cancel":
                event.setStatus(EventStatus.CANCELED);
                break;
            case "update":
                event.setAgenda(modifyEventRequestDTO.getEventName());
                event.setTime(Timestamp.valueOf(modifyEventRequestDTO.getEventTime().toLocalDateTime()));
                event.setDate(Timestamp.valueOf(modifyEventRequestDTO.getEventDate().toLocalDateTime()));
                event.setLocation(modifyEventRequestDTO.getEventLocation());
                break;
            case "reschedule":
                event.setTime(Timestamp.valueOf(modifyEventRequestDTO.getEventTime() + ":00"));
                event.setDate(Timestamp.valueOf(modifyEventRequestDTO.getEventDate() + " 00:00:00"));
                break;
            default:
                return "Invalid action! Use 'cancel', 'update', or 'reschedule'.";
        }

        event.setUpdatedAt(new Timestamp(System.currentTimeMillis()));
        eventDao.save(event);
        return "Event modified successfully!";
    }

    @Override
    @Transactional
    public String addInvitees(Long eventId, List<InviteRequestDTOv2> inviteRequestDTOs) {
        Optional<Event> eventOptional = eventDao.findById(eventId);
        if (eventOptional.isEmpty()) {
            return "Event not found.";
        }

        Event event = eventOptional.get();

        List<Invite> newInvites = inviteRequestDTOs.stream().map(dto -> {
            Optional<User> userOptional = userDao.findByEmail(dto.getEmail());
            if (userOptional.isEmpty()) {
                throw new RuntimeException("User with ID " + dto.getEmail() + " not found.");
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

    @Override
    public List<EventResponseDTO> getAllEvents() {
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        LocalDateTime now = currentTimestamp.toLocalDateTime();
        LocalDate today = now.toLocalDate();
        List<Event> events = eventDao.findAll()
                .stream()
                .filter(event -> {
                    LocalDate eventDate = event.getDate().toLocalDateTime().toLocalDate();
                    LocalTime eventTime = event.getTime().toLocalDateTime().toLocalTime();
                    LocalDateTime eventDateTime = LocalDateTime.of(eventDate, eventTime);
                    return eventDate.isAfter(today) || (eventDate.isEqual(today) && eventDateTime.isAfter(now));
                })
                .collect(Collectors.toList());
        return events.stream()
                .map(event -> {
                    EventResponseDTO dto = new EventResponseDTO();
                    dto.setEventId(event.getId());
                    dto.setFirstName(event.getFirstName());
                    dto.setLastName(event.getLastName());
                    dto.setAgenda(event.getAgenda());
                    dto.setTime(event.getTime());
                    dto.setDate(event.getDate());
                    dto.setLocation(event.getLocation());
                    dto.setStatus(event.getStatus());
                    dto.setCreatedById(event.getCreatedBy().getUserId());
                    dto.setMessage(event.getAgenda());
                    return dto;
                })
                .collect(Collectors.toList());
    }



    @Override
    public List<String> getInviteesByEventId(Long eventId) {
        List<Long> userIds = inviteDao.findUserIdsByEventId(eventId);
        return userIds.stream()
                .map(userId -> userDao.findById(userId)
                        .map(User::getEmail)
                        .orElse(null))
                .filter(email -> email != null)
                .collect(Collectors.toList());
    }

}