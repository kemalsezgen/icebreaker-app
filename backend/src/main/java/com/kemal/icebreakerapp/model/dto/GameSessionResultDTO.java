package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GameSessionResultDTO {
    private List<QuestionDetailResultsDTO> questionDetailResults;
}
