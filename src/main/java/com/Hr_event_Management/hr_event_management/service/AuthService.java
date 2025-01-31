package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.SignupRequestDTO;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.util.JwtUtil;
import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private UserDao userDao;

    private BCrypt passwordEncoder;

    private JwtUtil jwtUtil;

    public AuthService(JwtUtil jwtUtil, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.userDao = userDao;
    }

    // SignUp method for saving the user
    public AuthResponseDTO signup(SignupRequestDTO signupRequestDTO) {
        // Check if the user already exists with the given email
        Optional<User> existingUser = userDao.findByEmail(signupRequestDTO.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        // Create new user and set values
        User user = new User();
        user.setEmail(signupRequestDTO.getEmail());// Assuming name is part of the DTO
        user.setPassword(signupRequestDTO.getPassword());
        user.setEmpId(signupRequestDTO.getEmpId()); // Assuming password is part of the DTO
        // Hash the password
        String hashedPassword = BCrypt.hashpw(signupRequestDTO.getEmail() , BCrypt.gensalt());
        user.setPassword(hashedPassword);

        // Save the user to the database
        userDao.save(user);

        // Generate JWT token after successful registration
        String token = jwtUtil.generateToken(signupRequestDTO.getEmail());

        // Return the response with the token
        return new AuthResponseDTO(token);
    }

}
