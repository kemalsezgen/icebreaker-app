package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.CreateSessionResponse;
import com.kemal.icebreakerapp.model.dto.GameInformationDTO;
import com.kemal.icebreakerapp.model.dto.GameSessionResultDTO;

public interface GameSessionService {
    CreateSessionResponse createSession(String roomCode, Integer questionCount);
    void endSession(String roomCode);
    GameSessionResultDTO getResults(String roomCode);
    GameInformationDTO getGameInformation(String roomCode); // Add this method
}
