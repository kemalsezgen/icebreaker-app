package com.kemal.icebreakerapp.service.impl;

import com.kemal.icebreakerapp.exception.InvalidUsernameException;
import com.kemal.icebreakerapp.exception.ResourceNotFoundException;
import com.kemal.icebreakerapp.model.dto.UserNameUpdateRequestDTO;
import com.kemal.icebreakerapp.model.entity.RoomUser;
import com.kemal.icebreakerapp.model.entity.User;
import com.kemal.icebreakerapp.repository.RoomUserRepository;
import com.kemal.icebreakerapp.repository.UserRepository;
import com.kemal.icebreakerapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoomUserRepository roomUserRepository;

    @Transactional
    @Override
    public void updateUsername(UserNameUpdateRequestDTO request) {
        if (request.getNewUsername().length() > 20) {
            throw new InvalidUsernameException("Username must be less than 20 characters");
        }

        RoomUser roomUser = roomUserRepository.findByToken(request.getToken());
        if (roomUser == null) {
            throw new ResourceNotFoundException("Invalid token: user not found");
        }

        User user = userRepository.findById(roomUser.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        user.setUsername(request.getNewUsername());
        userRepository.save(user);
    }
}
