package com.kemal.icebreakerapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class PassiveUserTokenException extends RuntimeException {
    public PassiveUserTokenException(String message) {
        super(message);
    }
}
