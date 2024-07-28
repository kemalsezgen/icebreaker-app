package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.model.entity.Room;
import org.springframework.stereotype.Component;

import java.util.UUID;

@Component
public class RoomMapper {

    public RoomDTO toDTO(Room room) {
        if (room == null) {
            return null;
        }

        RoomDTO roomDTO = new RoomDTO();
        roomDTO.setId(room.getId());
        roomDTO.setName(room.getName());
        roomDTO.setCreatedBy(room.getCreatedBy());
        roomDTO.setCode(room.getCode());
        return roomDTO;
    }

    public Room toEntity(RoomDTO roomDTO) {
        if (roomDTO == null) {
            return null;
        }

        Room room = new Room();
        room.setId(roomDTO.getId());
        room.setName(roomDTO.getName());
        room.setCreatedBy(roomDTO.getCreatedBy());
        if (roomDTO.getCode() == null) {
            room.setCode(UUID.randomUUID().toString());
        } else {
            room.setCode(roomDTO.getCode());
        }
        return room;
    }
}
