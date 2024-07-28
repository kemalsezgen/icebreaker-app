package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
}
