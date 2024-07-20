package com.kemal.icebreakerapp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class QuestionDTO {
    private Long id;
    private String questionText;
}

