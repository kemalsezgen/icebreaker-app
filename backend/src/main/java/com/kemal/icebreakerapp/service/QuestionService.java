package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.dto.QuestionDTO;
import java.util.List;

public interface QuestionService {
    List<QuestionDTO> getAllQuestions();
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    QuestionDTO getQuestionById(Long id);
}
