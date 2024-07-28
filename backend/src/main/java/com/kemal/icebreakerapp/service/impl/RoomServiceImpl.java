package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.mapper.RoomMapper;
import com.kemal.icebreakerapp.model.dto.RoomInfoDTO;
import com.kemal.icebreakerapp.model.dto.UserDTO;
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
    public RoomDTO getRoomByUuid(String uuid) {
        Room room = roomRepository.findByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return roomMapper.toDTO(room);
    }

    @Override
    public RoomInfoDTO addUserToRoom(UserDTO userDTO) {
        Optional<Room> roomOpt = roomRepository.findByUuid(userDTO.getRoomUuid());
        if (roomOpt.isPresent()) {
            Room room = roomOpt.get();

            User user = new User();
            user.setUsername(userDTO.getUsername());
            userRepository.save(user);

            RoomUser roomUser = new RoomUser();
            roomUser.setRoom(room);
            roomUser.setUser(user);
            roomUserRepository.save(roomUser);

            int userCount = roomUserRepository.countByRoomId(room.getId());

            RoomInfoDTO RoomInfoDTO = new RoomInfoDTO();
            RoomInfoDTO.setRoomUuid(room.getUuid());
            RoomInfoDTO.setUserCount(userCount);

            return RoomInfoDTO;
        }
        return null;
    }
}
