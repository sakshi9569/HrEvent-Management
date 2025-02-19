package com.Hr_event_Management.hr_event_management.dto;

import lombok.*;
import org.springframework.cglib.core.Local;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ModifyEventRequestDTO {
    private Long eventId;
    private String empId;
    private String role;
    private String action;
    private String eventName;
    private LocalDate eventDate;
    private LocalTime eventTime;
    private String eventLocation;
}


