package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.JoinRoomDTO;
import com.kemal.icebreakerapp.model.dto.JoinRoomRequest;
import com.kemal.icebreakerapp.model.dto.RoomDTO;

import java.util.List;

public interface RoomService {
    /**
     * Fetchs all rooms
     * @return List<RoomDTO>
     */
    List<RoomDTO> getAllRooms();

    /**
     * Creates room
     * @param roomDTO
     * @return
     */
    RoomDTO createRoom(RoomDTO roomDTO);

    /**
     * Fetchs room by room code
     * @param code
     * @return
     */
    RoomDTO getRoomByCode(String code);

    /**
     * takes user into the room
     * @param request
     * @return
     */
    JoinRoomDTO joinRoom(JoinRoomRequest request);
}
