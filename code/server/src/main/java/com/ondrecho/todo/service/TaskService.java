package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.exception.BadRequestException;
import com.ondrecho.todo.exception.ForbiddenException;
import com.ondrecho.todo.exception.NotFoundException;
import com.ondrecho.todo.model.Task;
import com.ondrecho.todo.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService implements ITaskService {
    private final TaskRepository taskRepository;

    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public List<TaskDto> getTasksForUser(Long userId) {
        return taskRepository.findByUserId(userId).stream().map(this::toDto).collect(Collectors.toList());
    }

    @Override
    public TaskDto createTask(TaskDto dto, Long userId) {
        String trimmedTitle = dto.getTitle().trim();
        String trimmedDescription = dto.getDescription().trim();
        OffsetDateTime dueDate = dto.getDueDate() != null ? dto.getDueDate() : OffsetDateTime.now();

        Task task = new Task();
        task.setTitle(trimmedTitle);
        task.setDescription(trimmedDescription);
        task.setImportant(dto.isImportant());
        task.setCompleted(false);
        task.setDueDate(dueDate);
        task.setCreatedAt(OffsetDateTime.now());
        task.setUserId(userId);

        return toDto(taskRepository.save(task));
    }

    @Override
    public TaskDto updateTask(TaskDto dto, Long userId) {
        if (dto.getId() == null) {
            throw new BadRequestException("Task id is required for update");
        }

        if (dto.getDueDate() == null) {
            throw new BadRequestException("Due date is required for update"); //
        }

        Task task = taskRepository.findById(dto.getId())
                .orElseThrow(() -> new NotFoundException("Task not found with id: " + dto.getId()));

        if (!task.getUserId().equals(userId)) {
            throw new ForbiddenException("You don't have permission to update this task");
        }

        task.setTitle(dto.getTitle().trim());
        task.setDescription(dto.getDescription().trim());
        task.setImportant(dto.isImportant());
        task.setCompleted(dto.isCompleted());
        task.setDueDate(dto.getDueDate());

        Task saved = taskRepository.save(task);
        return toDto(saved);
    }

    @Override
    public void deleteTask(Long id, Long userId) {
        Task task = taskRepository.findById(id).orElseThrow(() -> new NotFoundException("Task not found"));
        if (!task.getUserId().equals(userId)) {
            throw new com.ondrecho.todo.exception.ForbiddenException("Forbidden");
        }
        taskRepository.deleteById(id);
    }

    private TaskDto toDto(Task task) {
        TaskDto d = new TaskDto();
        d.setId(task.getId());
        d.setTitle(task.getTitle());
        d.setDescription(task.getDescription());
        d.setImportant(task.isImportant());
        d.setCompleted(task.isCompleted());
        d.setDueDate(task.getDueDate());
        d.setCreatedAt(task.getCreatedAt());
        d.setUserId(task.getUserId());
        return d;
    }
}
