package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ROOM_USER")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RoomUser extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private Long userId;

    @Enumerated(EnumType.STRING)
    private RoomUserStatus status;

    private String token;
}