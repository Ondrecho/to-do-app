package com.ondrecho.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "User DTO")
public class UserDto {
    private Long id;
    private String username;
    private String password;

    public UserDto() {}
    public UserDto(Long id, String username, String password) {
        this.id = id; this.username = username; this.password = password;
    }

    @Schema(description = "User id")
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    @Schema(description = "Username")
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
