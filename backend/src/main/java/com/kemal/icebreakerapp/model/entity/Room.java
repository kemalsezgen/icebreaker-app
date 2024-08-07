package com.kemal.icebreakerapp.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ROOM")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Room extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String createdBy;
    private String creatorToken;
    private String code;
}