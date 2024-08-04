package com.kemal.icebreakerapp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_ACCEPTABLE)
public class SessionExistException extends RuntimeException {
    public SessionExistException(String message) {
        super(message);
    }
}
