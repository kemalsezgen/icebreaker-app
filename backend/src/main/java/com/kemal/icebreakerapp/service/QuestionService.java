package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.QuestionDTO;
import com.kemal.icebreakerapp.model.enums.QuestionType;

import java.util.List;

public interface QuestionService {
    List<QuestionDTO> getAllQuestions();
    QuestionDTO createQuestion(QuestionDTO questionDTO);
    QuestionDTO getQuestionById(Long id);
    List<QuestionDTO> getQuestionListByType(QuestionType type);
}
