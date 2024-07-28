package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.RoomUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    int countByRoomId(Long roomId);
    List<RoomUser> findByRoomId(Long roomId);
}
