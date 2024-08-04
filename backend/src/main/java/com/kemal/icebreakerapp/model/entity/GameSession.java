package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.GameSessionStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameSession {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String roomCode;
    private Integer questionCount;

    @Enumerated(EnumType.STRING)
    private GameSessionStatus status;
}
