package com.ondrecho.todo.dto;

public class AuthResponse {
    private String token;
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
