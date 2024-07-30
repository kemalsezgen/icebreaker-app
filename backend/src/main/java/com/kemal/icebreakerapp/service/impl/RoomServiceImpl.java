package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.JoinRoomDTO;
import com.kemal.icebreakerapp.model.dto.JoinRoomRequest;
import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.mapper.RoomMapper;
import com.kemal.icebreakerapp.mapper.RoomUserMapper;
import com.kemal.icebreakerapp.model.entity.Room;
import com.kemal.icebreakerapp.model.entity.RoomUser;
import com.kemal.icebreakerapp.model.entity.User;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.repository.RoomUserRepository;
import com.kemal.icebreakerapp.repository.UserRepository;
import com.kemal.icebreakerapp.service.RoomService;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    public RoomDTO createRoom(RoomDTO roomDTO) {
        Room room = roomMapper.toEntity(roomDTO);
        Room savedRoom = roomRepository.save(room);
        return roomMapper.toDTO(savedRoom);
    }

    @Override
    public RoomDTO getRoomByCode(String code) {
        Room room = roomRepository.findByCode(code)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return roomMapper.toDTO(room);
    }

    /*
    @Override
    public JoinRoomDTO joinRoom(JoinRoomRequest request) {
        Optional<Room> room = roomRepository.findByCode(request.getRoomCode());
        /*
        if (room.isPresent()) {
            User user = new User();
            user.setUsername(request.getUsername());
            User createdUser = userRepository.save(user);

            RoomUser roomUser = new RoomUser();
            roomUser.setRoomCode(request.getRoomCode());
            roomUser.setUserId(createdUser.getId());
            roomUser.setStatus(RoomUserStatus.ACTIVE);
            roomUserRepository.save(roomUser);

            JoinRoomDTO joinRoomDTO = new JoinRoomDTO();
            joinRoomDTO.setRoomCode(request.getRoomCode());
            joinRoomDTO.setUsername(request.getUsername());

            return joinRoomDTO;
        } else {
            throw new ResourceNotFoundException("Room Not Found");
        }

    }
     */
    @Override
    public JoinRoomDTO joinRoom(JoinRoomRequest request) {
        // user saying he was there
        if (request.getToken() != null) {
            RoomUser roomUser = roomUserRepository.findByToken(request.getToken());
            //RoomUserDTO roomUserDTO = roomUserMapper.toDTO(roomUser);
            if (roomUser == null) {
                throw new ResourceNotFoundException("User not found, wrong token.");
            }

            JoinRoomDTO joinRoomDTO = new JoinRoomDTO();
            if (roomUser.getRoomCode().equals(request.getRoomCode())) {
                Optional<User> oldUser = userRepository.findById(roomUser.getUserId());
                if (oldUser.isPresent()) {
                    joinRoomDTO.setUsername(oldUser.get().getUsername());
                    joinRoomDTO.setRoomCode(request.getRoomCode());
                    joinRoomDTO.setToken(request.getToken());
                    return joinRoomDTO;
                } else {
                    throw new ResourceNotFoundException("User not found");
                }
            }
        }
        return null;
    }
}
