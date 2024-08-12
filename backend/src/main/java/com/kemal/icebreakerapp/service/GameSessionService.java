package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.CreateSessionResponse;
import com.kemal.icebreakerapp.model.dto.GameInformationDTO;
import com.kemal.icebreakerapp.model.dto.GameSessionResultDTO;
import com.kemal.icebreakerapp.model.dto.StartSessionRequest;

public interface GameSessionService {
    CreateSessionResponse createSession(StartSessionRequest request);
    void endSession(String roomCode);
    GameSessionResultDTO getResults(String roomCode);
    GameInformationDTO getGameInformation(String roomCode); // Add this method
}
