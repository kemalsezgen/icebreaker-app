package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.QuestionDTO;
import com.kemal.icebreakerapp.mapper.QuestionMapper;
import com.kemal.icebreakerapp.model.entity.Question;
import com.kemal.icebreakerapp.model.enums.QuestionType;
import com.kemal.icebreakerapp.repository.QuestionRepository;
import com.kemal.icebreakerapp.service.QuestionService;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionMapper questionMapper;

    @Override
    public List<QuestionDTO> getAllQuestions() {
        return questionRepository.findAll().stream()
                .map(questionMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public QuestionDTO createQuestion(QuestionDTO questionDTO) {
        Question question = questionMapper.toEntity(questionDTO);
        Question savedQuestion = questionRepository.save(question);
        return questionMapper.toDTO(savedQuestion);
    }

    @Override
    public QuestionDTO getQuestionById(Long id) {
        Question question = questionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        return questionMapper.toDTO(question);
    }

    @Override
    public List<QuestionDTO> getQuestionListByType(QuestionType questionType) {
        List<Question> questionList = questionRepository.findByType(questionType);
        return questionMapper.toDTOList(questionList);
    }
}
