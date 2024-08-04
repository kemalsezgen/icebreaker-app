package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameInformationDTO {
    private List<QuestionDTO> questionList;
    private Long sessionId;
}
