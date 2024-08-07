package com.kemal.icebreakerapp.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "GAME_SESSION_QUESTION")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class GameSessionQuestion extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long sessionId;
    private Long questionId;
}