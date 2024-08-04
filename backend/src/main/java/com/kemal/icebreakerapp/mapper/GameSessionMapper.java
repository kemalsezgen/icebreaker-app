package com.kemal.icebreakerapp.mapper;

import com.kemal.icebreakerapp.model.dto.GameSessionDTO;
import com.kemal.icebreakerapp.model.entity.GameSession;
import org.springframework.stereotype.Component;

@Component
public class GameSessionMapper {
    public GameSessionDTO toDTO(GameSession gameSession) {
        if (gameSession == null) {
            return null;
        }

        GameSessionDTO gameSessionDTO = new GameSessionDTO();
        gameSessionDTO.setId(gameSession.getId());
        gameSessionDTO.setStatus(gameSession.getStatus());
        gameSessionDTO.setQuestionCount(gameSession.getQuestionCount());
        gameSessionDTO.setRoomCode(gameSession.getRoomCode());
        return gameSessionDTO;
    }

    public GameSession toEntity(GameSessionDTO gameSessionDTO) {
        if (gameSessionDTO == null) {
            return null;
        }

        GameSession gameSession = new GameSession();
        gameSession.setId(gameSessionDTO.getId());
        gameSession.setStatus(gameSessionDTO.getStatus());
        gameSession.setQuestionCount(gameSessionDTO.getQuestionCount());
        gameSession.setRoomCode(gameSessionDTO.getRoomCode());
        return gameSession;
    }
}
