package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
