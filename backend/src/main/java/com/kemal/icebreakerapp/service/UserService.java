package com.kemal.icebreakerapp.service;

import com.kemal.icebreakerapp.model.dto.UserNameUpdateRequestDTO;
import org.springframework.transaction.annotation.Transactional;

public interface UserService {
    @Transactional
    void updateUsername(UserNameUpdateRequestDTO request);
}
