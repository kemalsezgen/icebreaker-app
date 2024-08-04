package com.kemal.icebreakerapp.model.dto;

import com.kemal.icebreakerapp.model.enums.AnswerType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubmitAnswerRequest {
    private Long sessionId;
    private String userCode;
    private Long questionId;
    private AnswerType answer;
}
