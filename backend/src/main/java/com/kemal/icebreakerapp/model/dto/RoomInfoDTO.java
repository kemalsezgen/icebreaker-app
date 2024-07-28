package com.kemal.icebreakerapp.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RoomInfoDTO {
    private String roomUuid;
    private int userCount;
}