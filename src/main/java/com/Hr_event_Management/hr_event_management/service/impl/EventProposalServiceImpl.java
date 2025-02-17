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

import java.util.Optional;

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
        // Fetch the user who is proposing the event (creator)
        Optional<User> creatorUserOpt = userDao.findById(eventProposalRequestDTO.getCreatedById());
        if (creatorUserOpt.isEmpty()) {
            throw new RuntimeException("Creator not found");
        }
        User creator = creatorUserOpt.get();

        // Create and populate the ProposedEvent entity
        ProposedEvent proposedEvent = new ProposedEvent();
        proposedEvent.setEventName(eventProposalRequestDTO.getEventName());
        proposedEvent.setEventDate(eventProposalRequestDTO.getEventDate());  // Directly set the String value
        proposedEvent.setEventTime(eventProposalRequestDTO.getEventTime());
        proposedEvent.setEventLocation(eventProposalRequestDTO.getEventLocation());
        proposedEvent.setAgenda(eventProposalRequestDTO.getAgenda());
        proposedEvent.setUser(creator);  // User who proposed the event
        proposedEvent.setCreatedBy(creator);
        proposedEvent.setProposalStatus(ProposalStatus.PENDING);  // Set status to PENDING by default

        proposedEvent = eventProposalDao.save(proposedEvent);  // Save the proposed event to the database

        // Prepare the EventProposalResponseDTO to return
        EventProposalResponseDTO eventProposalResponseDTO = new EventProposalResponseDTO();
        eventProposalResponseDTO.setEventId(proposedEvent.getId());
        eventProposalResponseDTO.setEventName(proposedEvent.getEventName());
        eventProposalResponseDTO.setEventDate(proposedEvent.getEventDate());
        eventProposalResponseDTO.setEventTime(String.valueOf(proposedEvent.getEventTime()));
        eventProposalResponseDTO.setEventLocation(proposedEvent.getEventLocation());
        eventProposalResponseDTO.setAgenda(proposedEvent.getAgenda());
        eventProposalResponseDTO.setProposalStatus(proposedEvent.getProposalStatus().name());
        eventProposalResponseDTO.setCreatedById(creator.getUserId());
        eventProposalResponseDTO.setMessage("Event proposal created successfully");

        return eventProposalResponseDTO;
    }
}