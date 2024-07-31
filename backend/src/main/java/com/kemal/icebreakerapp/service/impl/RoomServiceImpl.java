package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.JoinRoomDTO;
import com.kemal.icebreakerapp.model.dto.JoinRoomRequest;
import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.mapper.RoomMapper;
import com.kemal.icebreakerapp.mapper.RoomUserMapper;
import com.kemal.icebreakerapp.model.entity.Room;
import com.kemal.icebreakerapp.model.entity.RoomUser;
import com.kemal.icebreakerapp.model.entity.User;
import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.repository.RoomUserRepository;
import com.kemal.icebreakerapp.repository.UserRepository;
import com.kemal.icebreakerapp.service.RoomService;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.UUID;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomUserRepository roomUserRepository;

    @Autowired
    private RoomMapper roomMapper;

    @Autowired
    private RoomUserMapper roomUserMapper;

    @Override
    public List<RoomDTO> getAllRooms() {
        return roomRepository.findAll().stream()
                .map(roomMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public JoinRoomDTO createRoom(RoomDTO request) {
        Room room = roomMapper.toEntity(request);
        Room savedRoom = roomRepository.save(room);

        JoinRoomRequest joinRoomRequest = new JoinRoomRequest();
        joinRoomRequest.setRoomCode(savedRoom.getCode());
        joinRoomRequest.setUsername(savedRoom.getCreatedBy());
        return joinRoom(joinRoomRequest);
    }

    @Override
    public RoomDTO getRoomByCode(String code) {
        Room room = roomRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return roomMapper.toDTO(room);
    }

    @Override
    public JoinRoomDTO joinRoom(JoinRoomRequest request) {
        if (request.getToken() != null) {
            return handleExistingUser(request);
        } else {
            return handleNewUser(request);
        }
    }

    private JoinRoomDTO handleExistingUser(JoinRoomRequest request) {
        RoomUser roomUser = roomUserRepository.findByTokenAndRoomCode(request.getToken(), request.getRoomCode());
        if (roomUser == null) {
            throw new ResourceNotFoundException("User not found, wrong token.");
        }

        if (!roomUser.getRoomCode().equals(request.getRoomCode())) {
            throw new ResourceNotFoundException("Room code does not match.");
        }

        Room room = roomRepository.findByCode(request.getRoomCode())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return getExistingUserDetails(roomUser, request.getToken(), request.getRoomCode(), room.getName());
    }

    private JoinRoomDTO handleNewUser(JoinRoomRequest request) {
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        userRepository.save(newUser);

        RoomUser roomUser = createRoomUser(request.getRoomCode(), newUser.getId());
        roomUserRepository.save(roomUser);

        Room room = roomRepository.findByCode(request.getRoomCode())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return buildJoinRoomDTO(request.getUsername(), request.getRoomCode(), roomUser.getToken(), room.getName());
    }

    private RoomUser createRoomUser(String roomCode, Long userId) {
        RoomUser roomUser = new RoomUser();
        roomUser.setRoomCode(roomCode);
        roomUser.setUserId(userId);
        roomUser.setStatus(RoomUserStatus.ACTIVE);
        roomUser.setToken(UUID.randomUUID().toString());
        return roomUser;
    }

    private JoinRoomDTO getExistingUserDetails(RoomUser roomUser, String token, String roomCode, String roomName) {
        User oldUser = userRepository.findById(roomUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return buildJoinRoomDTO(oldUser.getUsername(), roomCode, token, roomName);
    }

    private JoinRoomDTO buildJoinRoomDTO(String username, String roomCode, String token, String roomName) {
        JoinRoomDTO joinRoomDTO = new JoinRoomDTO();
        joinRoomDTO.setUsername(username);
        joinRoomDTO.setRoomCode(roomCode);
        joinRoomDTO.setToken(token);
        joinRoomDTO.setRoomName(roomName);
        return joinRoomDTO;
    }
}
