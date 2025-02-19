package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.dao.EventProposalDao;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.dto.EventProposalRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import com.Hr_event_Management.hr_event_management.service.EventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EventProposalServiceImpl implements EventProposalService {

    private final EventProposalDao eventProposalDao;
    private final UserDao userDao;

    @Autowired
    public EventProposalServiceImpl(EventProposalDao eventProposalDao, UserDao userDao) {
        this.eventProposalDao = eventProposalDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public EventProposalResponseDTO proposeEvent(EventProposalRequestDTO eventProposalRequestDTO) {
        Optional<User> creatorUserOpt = userDao.findById(eventProposalRequestDTO.getCreatedById());
        if (creatorUserOpt.isEmpty()) {
            throw new RuntimeException("Creator not found");
        }
        User creator = creatorUserOpt.get();
        ProposedEvent proposedEvent = new ProposedEvent();
        proposedEvent.setEventName(eventProposalRequestDTO.getEventName());
        proposedEvent.setEventDate(eventProposalRequestDTO.getEventDate());  // Directly set the String value
        proposedEvent.setEventTime(eventProposalRequestDTO.getEventTime());
        proposedEvent.setEventLocation(eventProposalRequestDTO.getEventLocation());
        proposedEvent.setAgenda(eventProposalRequestDTO.getAgenda());
        proposedEvent.setUser(creator);  // User who proposed the event
        proposedEvent.setCreatedBy(creator);
        proposedEvent.setProposalStatus(ProposalStatus.PENDING);
        proposedEvent = eventProposalDao.save(proposedEvent);
        EventProposalResponseDTO eventProposalResponseDTO = new EventProposalResponseDTO();
        eventProposalResponseDTO.setEventId(proposedEvent.getId());
        eventProposalResponseDTO.setEventName(proposedEvent.getEventName());
        eventProposalResponseDTO.setEventDate(proposedEvent.getEventDate());
        eventProposalResponseDTO.setEventTime(proposedEvent.getEventTime());
        eventProposalResponseDTO.setEventLocation(proposedEvent.getEventLocation());
        eventProposalResponseDTO.setAgenda(proposedEvent.getAgenda());
        eventProposalResponseDTO.setProposalStatus(proposedEvent.getProposalStatus());
        eventProposalResponseDTO.setCreatedById(creator.getUserId());
        eventProposalResponseDTO.setMessage("Event proposal created successfully");

        return eventProposalResponseDTO;
    }

    @Override
    public List<EventProposalResponseDTO> getProposedEvents(Long id) {
        List<ProposedEvent> proposedEventsInDb = eventProposalDao.findByUserId(id);

        return proposedEventsInDb.stream()
                .map(event -> new EventProposalResponseDTO(
                        event.getId(),
                        event.getEventName(),
                        event.getEventDate(),
                        event.getEventTime(),
                        event.getEventLocation(),
                        event.getAgenda(),
                        event.getProposalStatus(),
                        event.getCreatedBy().getUserId(),
                        "Event retrieved successfully"
                ))
                .collect(Collectors.toList());
    }
}