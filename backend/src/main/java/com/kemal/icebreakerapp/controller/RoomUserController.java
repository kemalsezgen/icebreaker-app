package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.RoomUserInformationDTO;
import com.kemal.icebreakerapp.service.RoomUserService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@NoArgsConstructor
@AllArgsConstructor
@RequestMapping("/room-user")
public class RoomUserController {

    @Autowired
    private RoomUserService roomUserService;

    @GetMapping("/{roomCode}")
    public ResponseEntity<RoomUserInformationDTO> getRoomUserInformationByRoomCode(@PathVariable("roomCode") String roomCode) {
        return new ResponseEntity<>(roomUserService.getRoomInformation(roomCode), HttpStatus.OK);
    }
}
