package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.QuestionDTO;
import com.kemal.icebreakerapp.model.entity.Question;
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
        questionDTO.setOptionA(question.getOptionA());
        questionDTO.setOptionB(question.getOptionB());
        return questionDTO;
    }

    public Question toEntity(QuestionDTO questionDTO) {
        if (questionDTO == null) {
            return null;
        }

        Question question = new Question();
        question.setId(questionDTO.getId());
        question.setQuestionText(questionDTO.getQuestionText());
        question.setOptionA(questionDTO.getOptionA());
        question.setOptionB(questionDTO.getOptionB());
        return question;
    }
}
