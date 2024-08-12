package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;
import com.kemal.icebreakerapp.model.enums.QuestionType;

@Getter
@Setter
public class StartSessionRequest {
    private String roomCode;
    private Integer questionCount;
    private QuestionType questionType;
}
