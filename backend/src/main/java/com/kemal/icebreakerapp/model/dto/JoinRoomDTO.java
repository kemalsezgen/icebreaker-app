package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinRoomDTO {
    private String roomName;
    private String roomCode;
    private String username;
    private String token;
}
