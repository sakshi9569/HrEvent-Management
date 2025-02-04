package com.Hr_event_Management.hr_event_management.controller;

import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.LoginRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequest;
import com.Hr_event_Management.hr_event_management.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import static com.Hr_event_Management.hr_event_management.config.ApiPathConstants.UserApiPathConstant.USER_SIGN_UP;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserServiceImpl userService;

    // SignUp API (Using DTO - SignupRequest)
    @PostMapping(USER_SIGN_UP)
    public AuthResponseDTO signUp(@RequestBody SignupRequest signupRequest) {
        // Call signUp method with the DTO data and save the user
       // User savedUser = userService.signUp(signupRequest);

        return  userService.signUp(signupRequest);// Return saved user as response
    }

    @PostMapping("/login")
    public AuthResponseDTO signUp(@RequestBody LoginRequestDTO LoginRequest) {
        // Call signUp method with the DTO data and save the user
        // User savedUser = userService.signUp(signupRequest);

        return  userService.login(LoginRequest);// Return saved user as response
    }
}
