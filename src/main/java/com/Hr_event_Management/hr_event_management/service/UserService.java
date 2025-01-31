package com.Hr_event_Management.hr_event_management.service;

import com.Hr_event_Management.hr_event_management.dto.AuthResponseDTO;
import com.Hr_event_Management.hr_event_management.dto.SignupRequestDTO;
import com.Hr_event_Management.hr_event_management.model.User;
import com.Hr_event_Management.hr_event_management.dao.UserDao;
import com.Hr_event_Management.hr_event_management.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.mindrot.jbcrypt.BCrypt;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JwtUtil jwtUtil;

//    @Autowired
//    private BCryptPasswordEncoder passwordEncoder;

    // SignUp method for saving the user, using SignupRequest DTO
    public AuthResponseDTO signUp(SignupRequestDTO signupRequestDTO) {
        // Convert SignupRequest DTO to User entity

        Optional<User> existingUser=userDao.findByEmail(signupRequestDTO.getEmail());

        if(existingUser.isPresent())
               throw new RuntimeException("email already exist");

        User user = new User();

        String hashedPassword = BCrypt.hashpw(signupRequestDTO.getPassword(), BCrypt.gensalt());
        user.setPassword(hashedPassword);
//        user.setPassword(signupRequest.getPassword());
        user.setEmail(signupRequestDTO.getEmail());
        user.setEmpId(signupRequestDTO.getEmpId());

        // Encrypt the password before saving
//        String encodedPassword = passwordEncoder.encode(signupRequest.getPassword());
//        user.setPassword(encodedPassword);

        // Save the user to the database
        userDao.save(user);
        String token=jwtUtil.generateToken(signupRequestDTO.getEmail());

        return new AuthResponseDTO(token);
    }
}
