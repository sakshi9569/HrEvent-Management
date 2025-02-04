package com.Hr_event_Management.hr_event_management.dto;


import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequest {
    @NotNull(message = "Email is required")
    private String email;
    private String password;
    private String empId;
}
