package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.RoomUserInformationDTO;

public interface RoomUserService {

    RoomUserInformationDTO getRoomInformation(String roomCode);
}
