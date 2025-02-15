package com.Hr_event_Management.hr_event_management.Enums;

public enum InvitationStatus {
    PENDING,  // Invitation has been sent, but the user has not responded yet.
    ACCEPTED, // User has accepted the invitation.
    REJECTED, // User has rejected the invitation.
    RESCHEDULED; // The invitation has been canceled.
    public String getStatus() {
        return this.name();
    }
}
