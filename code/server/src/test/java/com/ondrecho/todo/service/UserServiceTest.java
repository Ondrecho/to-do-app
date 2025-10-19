package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.AuthRequest;
import com.ondrecho.todo.dto.AuthResponse;
import com.ondrecho.todo.exception.ApiException;
import com.ondrecho.todo.model.User;
import com.ondrecho.todo.repository.UserRepository;
import com.ondrecho.todo.security.JwtProvider;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private JwtProvider jwtProvider;

    @Mock
    private BCryptPasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private AuthRequest validRequest;
    private User existingUser;

    @BeforeEach
    void setUp() {
        validRequest = new AuthRequest();
        validRequest.setUsername("testuser");
        validRequest.setPassword("password123");

        existingUser = new User();
        existingUser.setId(1L);
        existingUser.setUsername("testuser");
        existingUser.setPassword("$2a$10$hashedpassword");
    }

    @Test
    void register_WithNewUser_ShouldReturnAuthResponse() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(existingUser);
        when(jwtProvider.generateToken(1L, "testuser")).thenReturn("jwt-token");

        AuthResponse response = userService.register(validRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(1L, response.getUser().getId());
        assertEquals("testuser", response.getUser().getUsername());
        verify(userRepository).save(any(User.class));
    }

    @Test
    void register_WithExistingUser_ShouldThrowException() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(existingUser));

        ApiException exception = assertThrows(ApiException.class, () -> {
            userService.register(validRequest);
        });
        assertEquals("User already exists", exception.getMessage());
    }

    @Test
    void login_WithValidCredentials_ShouldReturnAuthResponse() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("password123", "$2a$10$hashedpassword")).thenReturn(true);
        when(jwtProvider.generateToken(1L, "testuser")).thenReturn("jwt-token");

        AuthResponse response = userService.login(validRequest);

        assertNotNull(response);
        assertEquals("jwt-token", response.getToken());
        assertEquals(1L, response.getUser().getId());
    }

    @Test
    void login_WithInvalidUsername_ShouldThrowException() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.empty());

        ApiException exception = assertThrows(ApiException.class, () -> {
            userService.login(validRequest);
        });
        assertEquals("Invalid credentials", exception.getMessage());
    }

    @Test
    void login_WithInvalidPassword_ShouldThrowException() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(existingUser));
        when(passwordEncoder.matches("password123", "$2a$10$hashedpassword")).thenReturn(false);

        ApiException exception = assertThrows(ApiException.class, () -> {
            userService.login(validRequest);
        });
        assertEquals("Invalid credentials", exception.getMessage());
    }
}