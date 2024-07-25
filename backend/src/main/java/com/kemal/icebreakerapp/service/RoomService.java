package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.RoomDTO;
import java.util.List;

public interface RoomService {
    List<RoomDTO> getAllRooms();
    RoomDTO createRoom(RoomDTO roomDTO);
    RoomDTO getRoomById(Long id);
    RoomDTO getRoomByUuid(String uuid);
}
