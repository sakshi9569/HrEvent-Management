package com.Hr_event_Management.hr_event_management.service.impl;

import com.Hr_event_Management.hr_event_management.dto.SignupRequest;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.util.JwtUtil;
import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserDao userDao;

    private BCrypt passwordEncoder;

    private final JwtUtil jwtUtil;

    public AuthService(JwtUtil jwtUtil, UserDao userDao) {
        this.jwtUtil = jwtUtil;
        this.userDao = userDao;
    }

    // SignUp method for saving the user
    public AuthResponseDTO signup(SignupRequest signupRequestDTO) {
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
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(signupRequestDTO.getEmail());
        String token=jwtUtil.generateToken(signupRequestDTO.getEmail());

        return new AuthResponseDTO(token, userFromDb.get().getUserId(),userFromDb.get().getRole());
    }

}
