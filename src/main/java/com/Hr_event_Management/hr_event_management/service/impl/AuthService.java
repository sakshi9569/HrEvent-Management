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
    public AuthResponseDTO signup(SignupRequest signupRequestDTO) {
        Optional<User> existingUser = userDao.findByEmail(signupRequestDTO.getEmail());

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        User user = new User();
        user.setEmail(signupRequestDTO.getEmail());
        user.setPassword(signupRequestDTO.getPassword());
        user.setEmpId(signupRequestDTO.getEmpId());
        String hashedPassword = BCrypt.hashpw(signupRequestDTO.getPassword() , BCrypt.gensalt());
        user.setPassword(hashedPassword);
        userDao.save(user);
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(signupRequestDTO.getEmail());
        String token=jwtUtil.generateToken(signupRequestDTO.getEmail());

        return new AuthResponseDTO(token, userFromDb.get().getUserId(),userFromDb.get().getRole());
    }

}
