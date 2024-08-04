package com.kemal.icebreakerapp.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Getter
@Setter
public class RoomUserInformationDTO {
    private String roomName;
    private List<String> usernameList;
    private String ownerUserCode;
}
