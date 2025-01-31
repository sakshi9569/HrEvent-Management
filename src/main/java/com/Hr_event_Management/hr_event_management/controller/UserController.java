package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequestDTO;
import com.Hr_event_Management.hr_event_management.service.UserService;
import com.Hr_event_Management.hr_event_management.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    // SignUp API (Using DTO - SignupRequest)
    @PostMapping("/signup")
    public AuthResponseDTO signUp(@RequestBody SignupRequestDTO signupRequest) {
        // Call signUp method with the DTO data and save the user
       // User savedUser = userService.signUp(signupRequest);

        return  userService.signUp(signupRequest);// Return saved user as response
    }
}
