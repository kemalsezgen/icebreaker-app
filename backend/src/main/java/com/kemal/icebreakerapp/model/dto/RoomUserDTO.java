package com.kemal.icebreakerapp.model.dto;

import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RoomUserDTO {
    private Long id;
    private String roomCode;
    private Long userId;
    private RoomUserStatus status;
    private String token;
}
