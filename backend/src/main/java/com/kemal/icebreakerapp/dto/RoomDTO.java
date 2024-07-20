package com.kemal.icebreakerapp.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class RoomDTO {
    private Long id;
    private String roomName;
    private String hostUserName;
}