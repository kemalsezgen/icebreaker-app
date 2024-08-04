package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StartSessionRequest {
    private String roomCode;
    private Integer questionCount;
}
