package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.Question;
import com.kemal.icebreakerapp.model.enums.QuestionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByType(QuestionType questionType);
}
