package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoomRepository extends JpaRepository<Room, Long> {
    Optional<Room> findByUuid(String uuid);
}
