package com.kemal.icebreakerapp.model.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDTO {
    private Long id;
    private String name;
    private String createdBy;
    private String creatorToken;
    private String code;
}