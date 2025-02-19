package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequest;

public interface UserService {
    public AuthResponseDTO signUp(SignupRequest signupRequestDTO);
}
