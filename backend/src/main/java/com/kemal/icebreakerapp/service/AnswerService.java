package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.AnswerDTO;

import java.util.List;

public interface AnswerService {
    void submitAnswer(List<AnswerDTO> request);
}
