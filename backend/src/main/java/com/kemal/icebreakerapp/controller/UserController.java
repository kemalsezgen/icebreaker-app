package com.kemal.icebreakerapp.controller;

import com.kemal.icebreakerapp.model.dto.UserNameUpdateRequestDTO;
import com.kemal.icebreakerapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/update-username")
    public ResponseEntity<Void> updateUsername(@RequestBody UserNameUpdateRequestDTO request) {
        userService.updateUsername(request);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}