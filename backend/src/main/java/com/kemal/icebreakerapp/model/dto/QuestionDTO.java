package com.kemal.icebreakerapp.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import com.kemal.icebreakerapp.model.enums.QuestionType;

@Data
@Getter
@Setter
public class QuestionDTO {
    private Long id;
    private String questionText;
    private String optionA;
    private String optionB;
    private QuestionType type;
}

