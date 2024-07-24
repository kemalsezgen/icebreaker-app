package com.kemal.icebreakerapp.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AnswerDTO {
    private Long id;
    private String userName;
    private Long questionId;
    private Long roomId;
    private Boolean answer;
}