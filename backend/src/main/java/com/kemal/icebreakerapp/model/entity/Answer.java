package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.AnswerType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private Long sessionId;
    private String token;  // Token from RoomUser
    private String roomCode;
    private AnswerType answer;
}
