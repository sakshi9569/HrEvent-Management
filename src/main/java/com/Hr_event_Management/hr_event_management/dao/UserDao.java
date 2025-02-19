package com.Hr_event_Management.hr_event_management.dao;

import com.Hr_event_Management.hr_event_management.model.User;
import java.util.List;
import java.util.Optional;

public interface UserDao {
    User save(User user);
    Optional<User> findById(Long userId);
    List<User> findAll();
    void deleteById(Long userId);
    Optional<User> findByEmail(String email);
}

