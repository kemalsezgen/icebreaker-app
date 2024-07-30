package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.RoomUserDTO;
import com.kemal.icebreakerapp.model.entity.RoomUser;
import org.springframework.stereotype.Component;


@Component
public class RoomUserMapper {
    public RoomUserDTO toDTO(RoomUser roomUser) {
        if (roomUser == null) {
            return null;
        }

        RoomUserDTO roomUserDTO = new RoomUserDTO();
        roomUserDTO.setId(roomUser.getId());
        roomUserDTO.setUserId(roomUser.getUserId());
        roomUserDTO.setRoomCode(roomUser.getRoomCode());
        roomUserDTO.setStatus(roomUser.getStatus());
        roomUserDTO.setToken(roomUser.getToken());
        return roomUserDTO;
    }

    public RoomUser toEntity(RoomUserDTO roomUserDTO) {
        if (roomUserDTO == null) {
            return null;
        }

        RoomUser roomUser = new RoomUser();
        roomUser.setId(roomUserDTO.getId());
        roomUser.setUserId(roomUserDTO.getUserId());
        roomUser.setRoomCode(roomUserDTO.getRoomCode());
        roomUser.setStatus(roomUserDTO.getStatus());
        roomUser.setToken(roomUserDTO.getToken());
        return roomUser;
    }
}
