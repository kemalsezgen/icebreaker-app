package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.service.AnswerService;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
@NoArgsConstructor
@AllArgsConstructor
public class AnswerController {
    @Autowired
    private AnswerService answerService;

    @PostMapping("/submit")
    public ResponseEntity<Void> submitAnswer(@RequestBody List<AnswerDTO> request) {
        answerService.submitAnswer(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}