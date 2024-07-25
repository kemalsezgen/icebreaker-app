package com.kemal.icebreakerapp.model.dto;

import com.kemal.icebreakerapp.model.enums.AnswerType;
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
    private AnswerType answer;
}