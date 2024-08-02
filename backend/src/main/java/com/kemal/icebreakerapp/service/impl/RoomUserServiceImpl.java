package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import com.kemal.icebreakerapp.mapper.RoomUserMapper;
import com.kemal.icebreakerapp.model.dto.RoomUserDTO;
import com.kemal.icebreakerapp.model.dto.RoomUserInformationDTO;
import com.kemal.icebreakerapp.model.entity.Room;
import com.kemal.icebreakerapp.model.entity.User;
import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.repository.RoomUserRepository;
import com.kemal.icebreakerapp.repository.UserRepository;
import com.kemal.icebreakerapp.service.RoomUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoomUserServiceImpl implements RoomUserService {

    @Autowired
    private RoomUserRepository roomUserRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomUserMapper roomUserMapper;

    @Override
    public RoomUserInformationDTO getRoomInformation(String roomCode) {
        RoomUserInformationDTO roomUserInformationDTO = new RoomUserInformationDTO();

        List<String> usernameList = roomUserRepository.findByRoomCode(roomCode).stream()
                .map(roomUser -> {
                    Long userId = roomUser.getUserId();
                    return userRepository.findById(userId);
                })
                .flatMap(Optional::stream)
                .map(User::getUsername)
                .toList();

        roomUserInformationDTO.setUsernameList(usernameList);

        Room room = roomRepository.findByCode(roomCode)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found with code: " + roomCode));
        roomUserInformationDTO.setRoomName(room.getName());

        return roomUserInformationDTO;
    }

    @Override
    public RoomUserDTO getRoomUserByTokenAndRoomCode(String token, String roomCode) {
        return roomUserMapper.toDTO(roomUserRepository.findByTokenAndRoomCodeAndStatus(token, roomCode, RoomUserStatus.ACTIVE));
    }
}
