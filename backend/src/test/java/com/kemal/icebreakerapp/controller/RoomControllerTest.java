package com.kemal.icebreakerapp.controller;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.kemal.icebreakerapp.model.dto.RoomDTO;
import com.kemal.icebreakerapp.service.RoomService;
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
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
@WebMvcTest(RoomController.class)
public class RoomControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RoomService roomService;

    private List<RoomDTO> roomList;

    private ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        RoomDTO room1 = RoomDTO.builder()
                .id(1L)
                .name("Room1")
                .createdBy("Host1")
                .code("uuid1")
                .build();

        RoomDTO room2 = RoomDTO.builder()
                .id(2L)
                .name("Room2")
                .createdBy("Host2")
                .code("uuid2")
                .build();

        roomList = Arrays.asList(room1, room2);

        mockMvc = MockMvcBuilders.standaloneSetup(new RoomController(roomService)).build();
    }

    @Test
    public void getAllRooms_ShouldReturnListOfRooms() throws Exception {
        when(roomService.getAllRooms()).thenReturn(roomList);

        mockMvc.perform(get("/rooms")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Room1"))
                .andExpect(jsonPath("$[0].createdBy").value("Host1"))
                .andExpect(jsonPath("$[0].code").value("uuid1"))
                .andExpect(jsonPath("$[1].id").value(2L))
                .andExpect(jsonPath("$[1].name").value("Room2"))
                .andExpect(jsonPath("$[1].createdBy").value("Host2"))
                .andExpect(jsonPath("$[1].code").value("uuid2"));
    }

    @Test
    public void createRoom_ShouldCreateAndReturnRoom() throws Exception {
        RoomDTO roomDTO = RoomDTO.builder()
                .name("New Room")
                .createdBy("New Host")
                .code("new-code")
                .build();

        when(roomService.createRoom(roomDTO)).thenReturn(roomDTO);

        mockMvc.perform(post("/rooms")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(roomDTO)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("New Room"))
                .andExpect(jsonPath("$.createdBy").value("New Host"))
                .andExpect(jsonPath("$.code").value("new-code"));
    }

    @Test
    public void getRoomByUuid_ShouldReturnRoom() throws Exception {
        String code = "uuid1";
        RoomDTO roomDTO = RoomDTO.builder()
                .id(1L)
                .name("Room1")
                .createdBy("Host1")
                .code(code)
                .build();

        when(roomService.getRoomByCode(code)).thenReturn(roomDTO);

        mockMvc.perform(get("/rooms/{code}", code)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("Room1"))
                .andExpect(jsonPath("$.createdBy").value("Host1"))
                .andExpect(jsonPath("$.code").value(code));
    }
}
