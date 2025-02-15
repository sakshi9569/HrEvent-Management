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
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
        }
        else{
            eventProposalDao.deleteById(proposalId);
        }

        return new AdminEventActionResponseDTO("success", "Event proposal " + adminEventActionRequestDTO.getAction() + "ed successfully");
    }

    //get all proposl invites
    public List<EventProposalResponseDTO> getAll() {  // Fix return type
        List<ProposedEvent> proposedEventList = eventProposalDao.findAll();

        return proposedEventList.stream().map(event -> new EventProposalResponseDTO(
                event.getId(),
                event.getEventName(),
                event.getEventDate(),
                event.getEventTime().toString(), // Convert Timestamp to String
                event.getEventLocation(),
                event.getAgenda(),
                event.getProposalStatus().toString(), // Convert Enum to String
                event.getCreatedBy().getUserId(), // Correct extraction of createdById
                "Event retrieved successfully"
        )).collect(Collectors.toList()); // Returns List<EventProposalResponseDTO>
    }
}
