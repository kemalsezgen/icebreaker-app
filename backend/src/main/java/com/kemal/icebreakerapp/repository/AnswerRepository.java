package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    List<Answer> findBySessionId(Long sessionId);
    List<Answer> findBySessionIdAndTokenAndRoomCode(Long sessionId, String token, String roomCode);
}
