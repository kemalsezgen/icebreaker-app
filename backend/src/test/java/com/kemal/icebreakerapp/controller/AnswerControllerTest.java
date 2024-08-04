package com.kemal.icebreakerapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.model.enums.AnswerType;
import com.kemal.icebreakerapp.service.AnswerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(AnswerController.class)
class AnswerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AnswerService answerService;

    private List<AnswerDTO> answerList;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        AnswerDTO answer1 = AnswerDTO.builder()
                .id(1L)
                .answer(AnswerType.A)
                .token("123")
                .sessionId(1L)
                .questionId(1L)
                .build();

        AnswerDTO answer2 = AnswerDTO.builder()
                .id(2L)
                .answer(AnswerType.B)
                .token("123")
                .sessionId(2L)
                .questionId(2L)
                .build();

        answerList = Arrays.asList(answer1, answer2);
        mockMvc = MockMvcBuilders.standaloneSetup(new AnswerController(answerService)).build();
    }

}