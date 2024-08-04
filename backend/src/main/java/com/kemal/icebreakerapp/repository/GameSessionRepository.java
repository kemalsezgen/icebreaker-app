package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.GameSession;
import com.kemal.icebreakerapp.model.enums.GameSessionStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GameSessionRepository extends JpaRepository<GameSession, Long> {
    Optional<GameSession> findByRoomCodeAndStatus(String roomCode, GameSessionStatus gameSessionStatus);
}

