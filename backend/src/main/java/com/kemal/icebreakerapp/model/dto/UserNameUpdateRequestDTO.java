package com.kemal.icebreakerapp.model.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class UserNameUpdateRequestDTO {
    private String token;
    private String newUsername;
}