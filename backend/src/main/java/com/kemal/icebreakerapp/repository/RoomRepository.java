package com.kemal.icebreakerapp.repository;

import com.kemal.icebreakerapp.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, Long> {
}
