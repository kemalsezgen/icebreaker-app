package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}
