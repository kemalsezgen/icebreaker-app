package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.dto.AnswerDTO;
import java.util.List;

public interface AnswerService {
    List<AnswerDTO> getAllAnswers();
    AnswerDTO createAnswer(AnswerDTO answerDTO);
    AnswerDTO getAnswerById(Long id) throws Exception;
}
