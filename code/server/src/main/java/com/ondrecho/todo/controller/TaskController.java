package com.ondrecho.todo.controller;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.service.ITaskService;
import com.ondrecho.todo.security.SecurityUtils;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final ITaskService taskService;

    public TaskController(ITaskService taskService) { this.taskService = taskService; }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks(HttpServletRequest request) {
        Long userId = SecurityUtils.getCurrentUserId(request);
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.getTasksForUser(userId));
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(HttpServletRequest request,
                                              @Valid @RequestBody TaskDto dto) {
        Long userId = SecurityUtils.getCurrentUserId(request);
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.createTask(dto, userId));
    }

    @PutMapping
    public ResponseEntity<TaskDto> updateTask(HttpServletRequest request,
                                              @Valid @RequestBody TaskDto dto) {
        Long userId = SecurityUtils.getCurrentUserId(request);
        if (userId == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(taskService.updateTask(dto, userId));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTask(HttpServletRequest request, @RequestBody DeleteRequest requestBody) {
        Long userId = SecurityUtils.getCurrentUserId(request);
        if (userId == null) return ResponseEntity.status(401).build();
        taskService.deleteTask(requestBody.getId(), userId);
        return ResponseEntity.ok().build();
    }

    public static class DeleteRequest {
        private Long id;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
}
