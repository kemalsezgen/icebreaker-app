package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.*;
import com.kemal.icebreakerapp.service.QuestionService;
import com.kemal.icebreakerapp.service.GameSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/sessions")
public class GameSessionController {
    @Autowired
    private GameSessionService gameSessionService;
    @Autowired
    private QuestionService questionService;

    @PostMapping("/start")
    public ResponseEntity<CreateSessionResponse> startSession(@RequestBody StartSessionRequest request) {
        CreateSessionResponse gameSessionDTO = gameSessionService.createSession(request.getRoomCode(), request.getQuestionCount());
        return ResponseEntity.ok(gameSessionDTO);
    }

    @PostMapping("/end/{roomCode}")
    public ResponseEntity<Void> endSession(@PathVariable String roomCode) {
        gameSessionService.endSession(roomCode);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/result/{roomCode}")
    public ResponseEntity<GameSessionResultDTO> getResults(@PathVariable("roomCode") String roomCode) {
        GameSessionResultDTO gameSessionResultDTO = gameSessionService.getResults(roomCode);
        return new ResponseEntity<>(gameSessionResultDTO, HttpStatus.OK);
    }
}