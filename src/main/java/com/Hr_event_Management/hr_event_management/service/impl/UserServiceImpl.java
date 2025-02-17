package com.Hr_event_Management.hr_event_management.service.impl;

import ch.qos.logback.core.util.StringUtil;
import com.Hr_event_Management.hr_event_management.Enums.Role;
import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.LoginRequestDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequest;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.service.UserService;
import com.Hr_event_Management.hr_event_management.util.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

@Service
@Slf4j
public class UserServiceImpl implements UserService {

    private UserDao userDao;
    private JwtUtil jwtUtil;

    @Autowired
    public UserServiceImpl(UserDao userDao, JwtUtil jwtUtil) {
        this.userDao = userDao;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public AuthResponseDTO signUp(SignupRequest signupRequest) {
        validateRequest(signupRequest);
        Optional<User> existingUser=userDao.findByEmail(signupRequest.getEmail());
        if(existingUser.isPresent())
               throw new RuntimeException("email already exist");
        User user = new User();
        String hashedPassword = BCrypt.hashpw(signupRequest.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
        user.setFirstname(signupRequest.getFirstname());
        user.setLastname(signupRequest.getLastname());
        user.setTeam(signupRequest.getTeam());
        user.setEmail(signupRequest.getEmail());
        user.setEmpId(signupRequest.getEmpId());
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(signupRequest.getEmail());
        log.info("user successfully saved");
        String token=jwtUtil.generateToken(signupRequest.getEmail());

        return new AuthResponseDTO(token, userFromDb.get().getUserId(), Role.USER);
    }

    private void validateRequest(SignupRequest signupRequest) {
        if (StringUtil.isNullOrEmpty(signupRequest.getEmail())) {
            throw new RuntimeException("Email is required");
        }
        if (StringUtil.isNullOrEmpty(signupRequest.getPassword())) {
            throw new RuntimeException("Password is required");
        }
        if (StringUtil.isNullOrEmpty(signupRequest.getFirstname())) {
            throw new RuntimeException("First name is required");
        }
        if (StringUtil.isNullOrEmpty(signupRequest.getLastname())) {
            throw new RuntimeException("Last name is required");
        }
        if (StringUtil.isNullOrEmpty(signupRequest.getTeam())) {
            throw new RuntimeException("Team is required");
        }
        if (StringUtil.isNullOrEmpty(signupRequest.getEmpId())) {
            throw new RuntimeException("Employee ID is required");
        }
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        Optional<User> existingUser = userDao.findByEmail(loginRequestDTO.getEmail());
        if (existingUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }
        User user = existingUser.get();
        if (!BCrypt.checkpw(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        String token = jwtUtil.generateToken(user.getEmail());
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(loginRequestDTO.getEmail());
        return new AuthResponseDTO(token, userFromDb.get().getUserId(),userFromDb.get().getRole());
    }
}
