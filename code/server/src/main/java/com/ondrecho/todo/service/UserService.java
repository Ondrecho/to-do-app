package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.AuthRequest;
import com.ondrecho.todo.dto.AuthResponse;
import com.ondrecho.todo.model.User;
import com.ondrecho.todo.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService implements IUserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final com.ondrecho.todo.security.JwtProvider jwtProvider;

    public UserService(UserRepository userRepository, com.ondrecho.todo.security.JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    public AuthResponse register(AuthRequest request) {
        Optional<User> exists = userRepository.findByUsername(request.getUsername());
        if (exists.isPresent()) {
            throw new RuntimeException("User already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepository.save(user);

    String token = jwtProvider.generateToken(user.getId(), user.getUsername());
    return new AuthResponse(token, user.getId(), user.getUsername());
    }

    public AuthResponse login(AuthRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

    String token = jwtProvider.generateToken(user.getId(), user.getUsername());
    return new AuthResponse(token, user.getId(), user.getUsername());
    }
}
