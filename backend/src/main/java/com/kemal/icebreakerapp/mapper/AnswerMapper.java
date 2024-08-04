package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.model.entity.Answer;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AnswerMapper {

    public AnswerDTO toDTO(Answer answer) {
        if (answer == null) {
            return null;
        }

        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setId(answer.getId());
        answerDTO.setAnswer(answer.getAnswer());
        answerDTO.setToken(answer.getToken());
        answerDTO.setRoomCode(answer.getRoomCode());
        answerDTO.setQuestionId(answer.getQuestionId());
        answerDTO.setSessionId(answer.getSessionId());
        return answerDTO;
    }

    public Answer toEntity(AnswerDTO answerDTO) {
        if (answerDTO == null) {
            return null;
        }

        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        answer.setAnswer(answerDTO.getAnswer());
        answer.setToken(answerDTO.getToken());
        answer.setRoomCode(answerDTO.getRoomCode());
        answer.setQuestionId(answerDTO.getQuestionId());
        answer.setSessionId(answerDTO.getSessionId());
        return answer;
    }

    public List<AnswerDTO> toDTOList(List<Answer> answers) {
        return answers.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public List<Answer> toEntityList(List<AnswerDTO> answerDTOs) {
        return answerDTOs.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}

