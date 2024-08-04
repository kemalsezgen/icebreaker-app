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
    private Long questionId;
    private Long sessionId;
    private String token;  // Token from RoomUser
    private String roomCode;
    private AnswerType answer;
}