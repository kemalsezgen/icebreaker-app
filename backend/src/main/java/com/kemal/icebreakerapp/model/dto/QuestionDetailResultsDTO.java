package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class QuestionDetailResultsDTO {
    private QuestionDTO question;
    private List<String> optionAChoosers;
    private List<String> optionBChoosers;
}
