package com.ondrecho.todo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.ondrecho.todo.security.JwtAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, JwtAuthenticationFilter jwtFilter) throws Exception {
    http
        .cors().and()
        .csrf().disable()
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers(new AntPathRequestMatcher("/auth/**"), new AntPathRequestMatcher("/h2-console/**")).permitAll()
            .requestMatchers(new AntPathRequestMatcher("/task/**"), new AntPathRequestMatcher("/task")).authenticated()
            .anyRequest().permitAll()
        );

    // Register JWT filter
    http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

    // For H2 console
    http.headers().frameOptions().disable();

    return http.build();
    }
}
