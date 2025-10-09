package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.AuthRequest;
import com.ondrecho.todo.dto.AuthResponse;

public interface IUserService {
    AuthResponse register(AuthRequest request);
    AuthResponse login(AuthRequest request);
}
