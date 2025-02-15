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

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    // SignUp method for saving the user, using SignupRequest DTO
    @Override
    // TODO - No need to send token and user is singUp response. change please.
    public AuthResponseDTO signUp(SignupRequest signupRequest) {
        // Convert SignupRequest DTO to User entity
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

        // Save the user to the database
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(signupRequest.getEmail());
        log.info("user successfully saved");
        String token=jwtUtil.generateToken(signupRequest.getEmail());

        return new AuthResponseDTO(token, userFromDb.get().getUserId(), Role.USER);
    }

    // TODO - Complete the validation merthod. Add validation wheres required
    private void validateRequest(SignupRequest signupRequestDTO) {
        if(StringUtil.isNullOrEmpty(signupRequestDTO.getEmail())){
            throw new RuntimeException("email is not found");
        }
    }

    public AuthResponseDTO login(LoginRequestDTO loginRequestDTO) {
        // Find user by email
        Optional<User> existingUser = userDao.findByEmail(loginRequestDTO.getEmail());

        if (existingUser.isEmpty()) {
            throw new RuntimeException("Invalid email or password");
        }

        User user = existingUser.get();

        // Verify the password
        if (!BCrypt.checkpw(loginRequestDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        userDao.save(user);
        Optional<User> userFromDb = userDao.findByEmail(loginRequestDTO.getEmail());
        return new AuthResponseDTO(token, userFromDb.get().getUserId(),userFromDb.get().getRole());
    }
}
