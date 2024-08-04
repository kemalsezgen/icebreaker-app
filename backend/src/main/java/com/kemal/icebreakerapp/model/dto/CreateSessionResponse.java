package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CreateSessionResponse {
    private Long sessionId;
    private List<QuestionDTO> questionList;
}
