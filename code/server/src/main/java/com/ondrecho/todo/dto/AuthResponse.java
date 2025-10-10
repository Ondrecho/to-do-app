package com.ondrecho.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication response")
public class AuthResponse {
    @Schema(description = "JWT token")
    private String token;
    @Schema(description = "User object")
    private UserDto user;

    public AuthResponse() {}
    public AuthResponse(String token, Long id, String username) {
        this.token = token;
        this.user = new UserDto(id, username, "");
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public UserDto getUser() { return user; }
    public void setUser(UserDto user) { this.user = user; }
}
