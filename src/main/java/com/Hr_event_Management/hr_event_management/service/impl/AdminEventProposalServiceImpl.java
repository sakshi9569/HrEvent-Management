package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import com.Hr_event_Management.hr_event_management.dao.AdminEventProposalDao;
import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.EventProposalDao;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.EventProposalResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import com.Hr_event_Management.hr_event_management.service.AdminEventProposalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminEventProposalServiceImpl implements AdminEventProposalService {

    private final AdminEventProposalDao adminEventProposalDao;
    private final EventDao eventDao;
    private final EventProposalDao eventProposalDao;

    @Autowired
    public AdminEventProposalServiceImpl(AdminEventProposalDao adminEventProposalDao, EventDao eventDao, EventProposalDao eventProposalDao) {
        this.adminEventProposalDao = adminEventProposalDao;
        this.eventDao = eventDao;
        this.eventProposalDao = eventProposalDao;
    }

    @Override
    public AdminEventActionResponseDTO takeAction(Long proposalId, AdminEventActionRequestDTO adminEventActionRequestDTO) {
        ProposedEvent proposedEvent = eventProposalDao.getById(proposalId);

        if (ProposalStatus.ACCEPTED.equals(adminEventActionRequestDTO.getAction())) {
            Event event = new Event();
            event.setFirstName(proposedEvent.getUser().getFirstname());
            event.setLastName(proposedEvent.getUser().getLastname());
            event.setAgenda(proposedEvent.getEventName());
            event.setTime(proposedEvent.getEventTime());
            event.setDate(proposedEvent.getCreatedAt());
            event.setProposalStatus(ProposalStatus.ACCEPTED);
            event.setLocation(proposedEvent.getEventLocation());
            event.setInvites(null);
            event.setStatus(EventStatus.SCHEDULED);
            event.setCreatedBy(proposedEvent.getUser());
            event.setCreatedAt(proposedEvent.getCreatedAt());
            event.setUpdatedAt(proposedEvent.getCreatedAt());
            eventDao.save(event);
            eventProposalDao.deleteById(proposalId);
        } else {
            eventProposalDao.deleteById(proposalId);
        }

        return new AdminEventActionResponseDTO("success", "Event proposal " + adminEventActionRequestDTO.getAction() + "ed successfully");
    }

    @Override
    public List<EventProposalResponseDTO> getAll() {
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());

        List<ProposedEvent> proposedEventList = eventProposalDao.findAll().stream()
                .filter(event -> event.getEventTime().after(currentTimestamp)) // Filter future events
                .collect(Collectors.toList());

        return proposedEventList.stream().map(event -> new EventProposalResponseDTO(
                event.getId(),
                event.getEventName(),
                event.getEventDate(),
                event.getEventTime(),
                event.getEventLocation(),
                event.getAgenda(),
                event.getProposalStatus(),
                event.getCreatedBy().getUserId(),
                "Event retrieved successfully"
        )).collect(Collectors.toList());
    }
}