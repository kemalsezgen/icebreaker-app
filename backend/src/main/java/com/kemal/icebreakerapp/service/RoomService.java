package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.model.dto.RoomInfoDTO;
import com.kemal.icebreakerapp.model.dto.UserDTO;

import java.util.List;

public interface RoomService {
    List<RoomDTO> getAllRooms();
    RoomDTO createRoom(RoomDTO roomDTO);
    RoomDTO getRoomByUuid(String uuid);
    RoomInfoDTO addUserToRoom(UserDTO userDTO);
}
