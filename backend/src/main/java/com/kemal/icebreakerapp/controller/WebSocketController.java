package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.RoomInfoDTO;
import com.kemal.icebreakerapp.model.dto.UserDTO;
import com.kemal.icebreakerapp.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebSocketController {

    @Autowired
    private RoomService roomService;

    @MessageMapping("/join")
    @SendTo("/topic/room")
    public RoomInfoDTO joinRoom(UserDTO userDTO) throws Exception {
        return roomService.addUserToRoom(userDTO);
    }
}