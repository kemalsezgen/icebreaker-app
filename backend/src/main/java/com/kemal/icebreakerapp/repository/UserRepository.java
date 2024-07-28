package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
