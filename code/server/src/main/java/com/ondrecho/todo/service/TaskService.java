package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.model.Task;
import com.ondrecho.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<TaskDto> getTasksForUser(Long userId) {
        return taskRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    public TaskDto createTask(TaskDto dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setImportant(dto.isImportant());
        task.setCreatedAt(dto.getCreatedAt() == null ? OffsetDateTime.now() : dto.getCreatedAt());
        task.setUserId(dto.getUserId());

        Task saved = taskRepository.save(task);
        return toDto(saved);
    }

    public TaskDto updateTask(TaskDto dto) {
        Task task = taskRepository.findById(dto.getId()).orElseThrow(() -> new RuntimeException("Task not found"));
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setImportant(dto.isImportant());
        task.setCreatedAt(dto.getCreatedAt());
        Task saved = taskRepository.save(task);
        return toDto(saved);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    private TaskDto toDto(Task task) {
        TaskDto d = new TaskDto();
        d.setId(task.getId());
        d.setTitle(task.getTitle());
        d.setDescription(task.getDescription());
        d.setImportant(task.isImportant());
        d.setCreatedAt(task.getCreatedAt());
        d.setUserId(task.getUserId());
        return d;
    }
}
