package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.mapper.AnswerMapper;
import com.kemal.icebreakerapp.model.entity.Answer;
import com.kemal.icebreakerapp.repository.AnswerRepository;
import com.kemal.icebreakerapp.repository.QuestionRepository;
import com.kemal.icebreakerapp.repository.RoomRepository;
import com.kemal.icebreakerapp.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
    public void submitAnswer(List<AnswerDTO> answers) {
        List<Answer> answerList = answerMapper.toEntityList(answers);
        answerRepository.saveAll(answerList);
    }
}
