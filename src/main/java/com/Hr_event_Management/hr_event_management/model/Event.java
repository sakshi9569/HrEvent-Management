package com.Hr_event_Management.hr_event_management.model;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import jakarta.persistence.*;
import java.sql.Timestamp;
import java.time.LocalDateTime;
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

    public String getEventName() {
        return this.agenda;  // Return agenda as the event's name
    }

    @Column(nullable = false)
    private Timestamp time;

    @Column(nullable = false)
    private Timestamp date;

    @Column(nullable = false, unique = true)
    private String location;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EventStatus status;  // Enum field for status

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProposalStatus proposalStatus = ProposalStatus.PENDING;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Column(nullable = false)
    private Timestamp createdAt = Timestamp.valueOf(LocalDateTime.now());

    @Column(nullable = false)
    private Timestamp updatedAt = Timestamp.valueOf(LocalDateTime.now());

    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Invite> invites;
}
