package com.Hr_event_Management.hr_event_management.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AdminNotificationResponseDTO {
    private String notificationId;
    private String type;
    private String message;
    private LocalDateTime timestamp;
}
