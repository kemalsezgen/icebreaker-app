package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.entity.RoomUser;
import com.kemal.icebreakerapp.model.enums.RoomUserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoomUserRepository extends JpaRepository<RoomUser, Long> {
    RoomUser findByToken(String token);
    RoomUser findByTokenAndRoomCode(String token, String roomCode);
    RoomUser findByTokenAndRoomCodeAndStatus(String token, String roomCode, RoomUserStatus status);
    List<RoomUser> findByRoomCodeAndStatus(String roomCode, RoomUserStatus status);
}
