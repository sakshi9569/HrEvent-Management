package com.Hr_event_Management.hr_event_management.Enums;

public enum EventStatus {
    CREATED,      // Event has been created// Event has been cancelled
    UPDATED,
    PENDING,    // Event is pending approval or confirmation
    ACTIVE,     // Event is scheduled and active
    CANCELED,   // Event has been canceled
    COMPLETED,
    SCHEDULED,
    CONFIRMED;// Event details have been updated
}
