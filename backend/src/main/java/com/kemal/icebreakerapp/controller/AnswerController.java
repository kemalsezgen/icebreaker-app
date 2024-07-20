package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.dto.AnswerDTO;
import com.kemal.icebreakerapp.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    private AnswerService answerService;

    @GetMapping
    public ResponseEntity<List<AnswerDTO>> getAllAnswers() {
        List<AnswerDTO> answers = answerService.getAllAnswers();
        return new ResponseEntity<>(answers, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AnswerDTO> createAnswer(@RequestBody AnswerDTO answerDTO) {
        AnswerDTO createdAnswer = answerService.createAnswer(answerDTO);
        return new ResponseEntity<>(createdAnswer, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AnswerDTO> getAnswerById(@PathVariable Long id) throws Exception {
        AnswerDTO answer = answerService.getAnswerById(id);
        return new ResponseEntity<>(answer, HttpStatus.OK);
    }
}
