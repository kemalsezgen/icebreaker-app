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
    private String userName;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;
    private AnswerType answer;
}
