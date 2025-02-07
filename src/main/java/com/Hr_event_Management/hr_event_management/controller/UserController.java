package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.LoginRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequest;
import com.Hr_event_Management.hr_event_management.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    // SignUp API (Using DTO - SignupRequest)
    @PostMapping("/signup")
    public AuthResponseDTO signUp(@RequestBody SignupRequest signupRequest) {
        return userService.signUp(signupRequest);
    }

    // Login API
    @PostMapping("/login")
    public AuthResponseDTO login(@RequestBody LoginRequestDTO loginRequest) {
        return userService.login(loginRequest);
    }
}
