package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.dto.QuestionDTO;
import com.kemal.icebreakerapp.model.Question;
import org.springframework.stereotype.Component;

@Component
public class QuestionMapper {

    public QuestionDTO toDTO(Question question) {
        if (question == null) {
            return null;
        }

        QuestionDTO questionDTO = new QuestionDTO();
        questionDTO.setId(question.getId());
        questionDTO.setQuestionText(question.getQuestionText());
        return questionDTO;
    }

    public Question toEntity(QuestionDTO questionDTO) {
        if (questionDTO == null) {
            return null;
        }

        Question question = new Question();
        question.setId(questionDTO.getId());
        question.setQuestionText(questionDTO.getQuestionText());
        return question;
    }
}
