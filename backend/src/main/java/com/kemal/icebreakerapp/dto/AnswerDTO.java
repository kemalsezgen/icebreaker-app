package com.kemal.icebreakerapp.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDTO {
    private Long id;
    private String userName;
    private Long questionId;
    private Long roomId;
    private Boolean answer;
}