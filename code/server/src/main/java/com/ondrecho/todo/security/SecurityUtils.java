package com.ondrecho.todo.security;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import jakarta.servlet.http.HttpServletRequest;

public final class SecurityUtils {
    private SecurityUtils() {}

    public static Long getCurrentUserId(HttpServletRequest request) {
        Object attr = request.getAttribute("userId");
        if (attr instanceof Long) return (Long) attr;
        if (attr instanceof Integer) return ((Integer) attr).longValue();
        // fallback: try SecurityContext (if username stored can map to user id via repository — not implemented)
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            // no userId available here by default
        }
        return null;
    }
}
