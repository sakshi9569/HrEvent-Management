package com.Hr_event_Management.hr_event_management.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.util.List;
import com.Hr_event_Management.hr_event_management.Enums.EventStatus; // Import EventStatus Enum
import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String firstName;

    @Column(nullable = false)
    private String lastName;

    @Column(nullable = false)
    private String agenda;

    @Column(nullable = false)
    private Timestamp time;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false, unique = true)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status=EventStatus.CONFIRMED; // Enum used here

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus proposalStatus = ProposalStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false)
    private Timestamp createdAt;

    @Column(nullable = false)
    private Timestamp updatedAt;

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Invite> invites;
}
