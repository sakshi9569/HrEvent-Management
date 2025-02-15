package com.Hr_event_Management.hr_event_management.Enums;

public enum EventStatus {
    // TODO - Refactor
    CREATED,
    UPDATED,
    PENDING,    // Event is pending approval or confirmation
    ACTIVE,     // Event is scheduled and active
    CANCELED,   // Event has been canceled
    COMPLETED,
    SCHEDULED,
    CONFIRMED;// Event details have been updated
}
