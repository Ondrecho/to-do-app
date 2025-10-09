package com.ondrecho.todo.exception;

public class ApiException extends RuntimeException {
    public ApiException(String message) { super(message); }
}
