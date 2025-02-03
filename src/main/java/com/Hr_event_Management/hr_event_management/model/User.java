package com.Hr_event_Management.hr_event_management.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;
import com.Hr_event_Management.hr_event_management.Enums.Role; // Import Role Enum

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;


    @Column(name = "first_name")
    private String first_name= "xyz";

    @Column(name = "last_name")
    private String last_name= "xyz";

    @Column(name = "name")
    private String name =first_name+last_name;

    @Column(unique = true, nullable = false)
    private String empId;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String team = "ABC";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role = Role.ADMIN;

    @OneToMany(mappedBy = "createdBy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Event> createdEvents;

    @Column(nullable = false)
    private Timestamp createdAt = Timestamp.valueOf(LocalDateTime.now());

    @Column(nullable = false)
    private Timestamp updatedAt = Timestamp.valueOf(LocalDateTime.now());
}
