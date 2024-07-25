package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.mapper.AnswerMapper;
import com.kemal.icebreakerapp.model.entity.Answer;
import com.kemal.icebreakerapp.model.entity.Question;
import com.kemal.icebreakerapp.model.entity.Room;
import com.kemal.icebreakerapp.repository.AnswerRepository;
import com.kemal.icebreakerapp.repository.QuestionRepository;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.service.AnswerService;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private AnswerMapper answerMapper;

    @Override
    public List<AnswerDTO> getAllAnswers() {
        return answerRepository.findAll().stream()
                .map(answerMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public AnswerDTO createAnswer(AnswerDTO answerDTO) {
        Question question = questionRepository.findById(answerDTO.getQuestionId())
                .orElseThrow(() -> new ResourceNotFoundException("Question not found"));
        Room room = roomRepository.findById(answerDTO.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Room not found"));

        Answer answer = answerMapper.toEntity(answerDTO, question, room);
        Answer savedAnswer = answerRepository.save(answer);
        return answerMapper.toDTO(savedAnswer);
    }

    @Override
    public AnswerDTO getAnswerById(Long id) {
        Answer answer = answerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Answer not found"));
        return answerMapper.toDTO(answer);
    }
}
