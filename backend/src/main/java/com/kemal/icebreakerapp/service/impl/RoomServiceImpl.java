package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.dto.RoomDTO;
import com.kemal.icebreakerapp.mapper.RoomMapper;
import com.kemal.icebreakerapp.model.Room;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.service.RoomService;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RoomRepository roomRepository;

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
    public RoomDTO getRoomById(Long id) {
        Room room = roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));
        return roomMapper.toDTO(room);
    }
}
