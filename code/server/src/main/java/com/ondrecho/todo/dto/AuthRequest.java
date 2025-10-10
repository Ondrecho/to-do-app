package com.ondrecho.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Authentication request")
public class AuthRequest {
    @Schema(description = "Username")
    private String username;
    @Schema(description = "Password")
    private String password;

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
