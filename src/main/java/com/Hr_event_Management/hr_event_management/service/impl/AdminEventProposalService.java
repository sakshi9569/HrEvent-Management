package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.Enums.EventStatus;
import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
import com.Hr_event_Management.hr_event_management.dao.AdminEventProposalDao;
import com.Hr_event_Management.hr_event_management.dao.EventDao;
import com.Hr_event_Management.hr_event_management.dao.EventProposalDao;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.AdminEventActionResponseDTO;
import com.Hr_event_Management.hr_event_management.model.Event;
import com.Hr_event_Management.hr_event_management.model.ProposedEvent;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminEventProposalService {

    private final AdminEventProposalDao adminEventProposalDao;
    private final EventDao eventDao;
    private final EventProposalDao eventProposalDao;


    @Autowired
    public AdminEventProposalService(AdminEventProposalDao adminEventProposalDao, EventDao eventDao, EventProposalDao eventProposalDao, EventProposalDao eventProposalDao1) {
        this.adminEventProposalDao = adminEventProposalDao;
        this.eventDao = eventDao;

        this.eventProposalDao = eventProposalDao1;
    }

    public AdminEventActionResponseDTO takeAction(Long proposalId, AdminEventActionRequestDTO adminEventActionRequestDTO) {
        Event event = new Event();
        ProposedEvent proposedEvent1 = eventProposalDao.getById(proposalId);
        event.setFirstName(proposedEvent1.getUser().getFirstname());
        event.setLastName(proposedEvent1.getUser().getLastname());
        event.setAgenda(proposedEvent1.getEventName());
        event.setTime(proposedEvent1.getEventTime());
        event.setDate(proposedEvent1.getCreatedAt());
        event.setProposalStatus(ProposalStatus.ACCEPTED);
        event.setLocation(proposedEvent1.getEventLocation());
        event.setInvites(null);
        event.setStatus(EventStatus.SCHEDULED);
        event.setCreatedBy(proposedEvent1.getUser());
        event.setCreatedAt(proposedEvent1.getCreatedAt());
        event.setUpdatedAt(proposedEvent1.getCreatedAt());
        eventProposalDao.deleteById(proposalId);
        eventDao.save(event);
        return new AdminEventActionResponseDTO("success", "Event proposal " + adminEventActionRequestDTO.getAction() + "ed successfully");
    }
}
