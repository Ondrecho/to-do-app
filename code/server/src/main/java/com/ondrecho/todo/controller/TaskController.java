package com.ondrecho.todo.controller;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.service.ITaskService;
import com.ondrecho.todo.security.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final ITaskService taskService;
    private final SecurityUtils securityUtils;

    public TaskController(ITaskService taskService, SecurityUtils securityUtils) {
        this.taskService = taskService;
        this.securityUtils = securityUtils;
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks() {
        Long userId = securityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.getTasksForUser(userId));
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody TaskDto dto) {
        Long userId = securityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    @PutMapping
    public ResponseEntity<TaskDto> updateTask(@Valid @RequestBody TaskDto dto) {
        Long userId = securityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.updateTask(dto, userId));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        Long userId = securityUtils.getCurrentUserId();
        if (userId == null) return ResponseEntity.status(401).build();
        taskService.deleteTask(id, userId);
        return ResponseEntity.ok().build();
    }
}