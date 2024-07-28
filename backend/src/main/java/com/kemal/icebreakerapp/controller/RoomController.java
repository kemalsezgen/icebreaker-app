package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.JoinRoomDTO;
import com.kemal.icebreakerapp.model.dto.JoinRoomRequest;
import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.service.RoomService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<RoomDTO>> getAllRooms() {
        List<RoomDTO> rooms = roomService.getAllRooms();
        return new ResponseEntity<>(rooms, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<RoomDTO> createRoom(@RequestBody RoomDTO roomDTO) {
        RoomDTO createdRoom = roomService.createRoom(roomDTO);
        return new ResponseEntity<>(createdRoom, HttpStatus.CREATED);
    }

    @GetMapping("/{code}")
    public ResponseEntity<RoomDTO> getRoomByCode(@PathVariable String code) {
        RoomDTO room = roomService.getRoomByCode(code);
        return new ResponseEntity<>(room, HttpStatus.OK);
    }

    @PostMapping("/join")
    public ResponseEntity<JoinRoomDTO> joinRoom(@RequestBody JoinRoomRequest request) {
        return new ResponseEntity<>(roomService.joinRoom(request), HttpStatus.OK);
    }
}
