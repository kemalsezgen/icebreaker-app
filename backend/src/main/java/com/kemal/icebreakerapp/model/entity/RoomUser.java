package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private Long userId;

    @Enumerated(EnumType.STRING)
    private RoomUserStatus status;
}