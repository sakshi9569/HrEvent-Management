package com.Hr_event_Management.hr_event_management.model;
import com.Hr_event_Management.hr_event_management.Enums.ProposalStatus;

import jakarta.persistence.*;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor


public class ProposedEvent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String eventName;

    @Column(nullable = false)
    private Timestamp eventDate ;

    @Column(nullable = false)
    private Timestamp eventTime;

    @Column(nullable = false)
    private String eventLocation;

    @Column(nullable = false)
    private String agenda;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "created_by", nullable = false)
    private User createdBy;

    @Enumerated(EnumType.STRING)
    private ProposalStatus proposalStatus = ProposalStatus.PENDING;

    @Column(nullable = false)
    private Timestamp createdAt = Timestamp.valueOf(LocalDateTime.now());

    @Column(nullable = false)
    private Timestamp updatedAt = Timestamp.valueOf(LocalDateTime.now());

}
