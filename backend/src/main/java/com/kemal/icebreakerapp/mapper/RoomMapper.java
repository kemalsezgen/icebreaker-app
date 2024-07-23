package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.dto.RoomDTO;
import com.kemal.icebreakerapp.model.Room;
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
        roomDTO.setRoomName(room.getRoomName());
        roomDTO.setUuid(room.getUuid());
        return roomDTO;
    }

    public Room toEntity(RoomDTO roomDTO) {
        if (roomDTO == null) {
            return null;
        }

        Room room = new Room();
        room.setId(roomDTO.getId());
        room.setRoomName(roomDTO.getRoomName());
        if (roomDTO.getUuid() == null) {
            room.setUuid(UUID.randomUUID().toString());
        } else {
            room.setUuid(roomDTO.getUuid());
        }
        return room;
    }
}
