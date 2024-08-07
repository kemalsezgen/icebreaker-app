package com.kemal.icebreakerapp.model.entity;

import com.kemal.icebreakerapp.model.enums.AnswerType;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Answer extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private Long sessionId;
    private String token;
    private String roomCode;
    private AnswerType answer;
}
