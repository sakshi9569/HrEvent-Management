package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.*;

import java.util.List;

public interface EventService {
    EventResponseDTO createEventWithInvites(EventRequestDTO eventRequestDTO, List<String> invitedUserIds);
    String modifyEvent(Long eventId, ModifyEventRequestDTO modifyEventRequestDTO);
    String addInvitees(Long eventId, List<InviteRequestDTOv2> inviteRequestDTOs);
    List<EventResponseDTO> getAllEvents();
    List<String> getInviteesByEventId(Long eventId);
}