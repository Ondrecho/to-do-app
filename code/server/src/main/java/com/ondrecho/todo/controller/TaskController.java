package com.ondrecho.todo.controller;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) { this.taskService = taskService; }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getTasks(@RequestParam(required = false) Long userId) {
        // if userId not provided, return empty list for now
        if (userId == null) {
            return ResponseEntity.ok(List.of());
        }
        return ResponseEntity.ok(taskService.getTasksForUser(userId));
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto dto) {
        return ResponseEntity.ok(taskService.createTask(dto));
    }

    @PutMapping
    public ResponseEntity<TaskDto> updateTask(@RequestBody TaskDto dto) {
        return ResponseEntity.ok(taskService.updateTask(dto));
    }

    @DeleteMapping
    public ResponseEntity<?> deleteTask(@RequestBody DeleteRequest request) {
        taskService.deleteTask(request.getId());
        return ResponseEntity.ok().build();
    }

    public static class DeleteRequest {
        private Long id;
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
}
