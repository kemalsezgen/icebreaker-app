package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.model.entity.Answer;
import com.kemal.icebreakerapp.model.entity.Question;
import com.kemal.icebreakerapp.model.entity.Room;
import org.springframework.stereotype.Component;

@Component
public class AnswerMapper {

    public AnswerDTO toDTO(Answer answer) {
        if (answer == null) {
            return null;
        }

        AnswerDTO answerDTO = new AnswerDTO();
        answerDTO.setId(answer.getId());
        answerDTO.setUserName(answer.getUserName());
        answerDTO.setQuestionId(answer.getQuestion().getId());
        answerDTO.setRoomId(answer.getRoom().getId());
        answerDTO.setAnswer(answer.getAnswer());
        return answerDTO;
    }

    public Answer toEntity(AnswerDTO answerDTO, Question question, Room room) {
        if (answerDTO == null) {
            return null;
        }

        Answer answer = new Answer();
        answer.setId(answerDTO.getId());
        answer.setUserName(answerDTO.getUserName());
        answer.setQuestion(question);
        answer.setRoom(room);
        answer.setAnswer(answerDTO.getAnswer());
        return answer;
    }
}
