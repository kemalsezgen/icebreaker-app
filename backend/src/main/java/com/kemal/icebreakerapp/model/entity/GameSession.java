package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.GameSessionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "GAME_SESSION")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameSession extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private Integer questionCount;

    @Enumerated(EnumType.STRING)
    private GameSessionStatus status;
}
