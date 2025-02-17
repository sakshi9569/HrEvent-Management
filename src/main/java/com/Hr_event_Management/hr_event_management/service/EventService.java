package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.EventRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.EventResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.InviteRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.ModifyEventRequestDTO;

import java.util.List;

public interface EventService {
    EventResponseDTO createEventWithInvites(EventRequestDTO eventRequestDTO, List<Long> invitedUserIds);
    String modifyEvent(Long eventId, ModifyEventRequestDTO modifyEventRequestDTO);
    String addInvitees(Long eventId, List<InviteRequestDTO> inviteRequestDTOs);
    List<EventResponseDTO> getAllEvents();
}