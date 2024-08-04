package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.GameSessionQuestion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameSessionQuestionRepository extends JpaRepository<GameSessionQuestion, Long> {
    List<GameSessionQuestion> findBySessionId(Long sessionId);
}