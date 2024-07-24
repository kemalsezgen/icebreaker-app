package com.kemal.icebreakerapp.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RoomDTO {
    private Long id;
    private String roomName;
    private String hostUserName;
    private String uuid;
}