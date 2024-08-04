package com.kemal.icebreakerapp.model.dto;

import com.kemal.icebreakerapp.model.enums.GameSessionStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GameSessionDTO {
    private Long id;
    private String roomCode;
    private Integer questionCount;
    private GameSessionStatus status;
}
