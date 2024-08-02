package com.kemal.icebreakerapp.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LogoutRequestDTO {
    private String token;
    private String roomCode;
}