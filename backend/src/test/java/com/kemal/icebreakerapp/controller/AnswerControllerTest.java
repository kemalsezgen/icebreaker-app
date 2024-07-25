package com.kemal.icebreakerapp.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kemal.icebreakerapp.model.dto.AnswerDTO;
import com.kemal.icebreakerapp.model.enums.AnswerType;
import com.kemal.icebreakerapp.service.AnswerService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
                .answer(AnswerType.YES)
                .roomId(1L)
                .questionId(1L)
                .userName("UserName1")
                .build();

        AnswerDTO answer2 = AnswerDTO.builder()
                .id(2L)
                .answer(AnswerType.NO)
                .roomId(2L)
                .questionId(2L)
                .userName("UserName2")
                .build();

        answerList = Arrays.asList(answer1, answer2);
        mockMvc = MockMvcBuilders.standaloneSetup(new AnswerController(answerService)).build();
    }

    @Test
    void getAllAnswers() throws Exception {
        when(answerService.getAllAnswers()).thenReturn(answerList);

        mockMvc.perform(get("/answers")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].answer").value(AnswerType.YES))
                .andExpect(jsonPath("$[0].userName").value("UserName1"))
                .andExpect(jsonPath("$[0].roomId").value(1L))
                .andExpect(jsonPath("$[0].questionId").value(1L))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].answer").value(AnswerType.NO))
                .andExpect(jsonPath("$[1].userName").value("UserName2"))
                .andExpect(jsonPath("$[1].roomId").value(2L))
                .andExpect(jsonPath("$[1].questionId").value(2L));
    }

    @Test
    void createAnswer() throws Exception {
        AnswerDTO answerDTO = AnswerDTO.builder()
                .userName("UserNameTest")
                .roomId(3L)
                .questionId(3L)
                .answer(AnswerType.NO)
                .build();

        when(answerService.createAnswer(answerDTO)).thenReturn(answerDTO);

        mockMvc.perform(post("/answers")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(answerDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.userName").value("UserNameTest"))
                .andExpect(jsonPath("$.roomId").value(3L))
                .andExpect(jsonPath("$.questionId").value(3L))
                .andExpect(jsonPath("$.answer").value(AnswerType.NO));
    }

    @Test
    void getAnswerById() throws Exception {
        Long answerId = 1L;
        AnswerDTO answerDTO = AnswerDTO.builder()
                .id(answerId)
                .answer(AnswerType.NO)
                .userName("UserNameTest")
                .roomId(3L)
                .questionId(3L)
                .build();

        when(answerService.getAnswerById(answerId)).thenReturn(answerDTO);

        mockMvc.perform(get("/answers/{id}", answerId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(answerId))
                .andExpect(jsonPath("$.answer").value(AnswerType.NO))
                .andExpect(jsonPath("$.userName").value("UserNameTest"))
                .andExpect(jsonPath("$.roomId").value(3L))
                .andExpect(jsonPath("$.questionId").value(3L));
    }
}