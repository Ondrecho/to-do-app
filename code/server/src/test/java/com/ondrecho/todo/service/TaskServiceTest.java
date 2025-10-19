package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.TaskDto;
import com.ondrecho.todo.exception.BadRequestException;
import com.ondrecho.todo.exception.ForbiddenException;
import com.ondrecho.todo.exception.NotFoundException;
import com.ondrecho.todo.model.Task;
import com.ondrecho.todo.repository.TaskRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    private TaskDto taskDto;
    private Task task;
    private final Long userId = 1L;
    private final Long taskId = 1L;

    @BeforeEach
    void setUp() {
        taskDto = new TaskDto();
        taskDto.setTitle("Test Task");
        taskDto.setDescription("Test Description");
        taskDto.setImportant(false);
        taskDto.setDueDate(OffsetDateTime.now().plusDays(1));

        task = new Task();
        task.setId(taskId);
        task.setTitle("Test Task");
        task.setDescription("Test Description");
        task.setImportant(false);
        task.setCompleted(false);
        task.setDueDate(OffsetDateTime.now().plusDays(1));
        task.setCreatedAt(OffsetDateTime.now());
        task.setUserId(userId);
    }

    @Test
    void createTask_WithValidData_ShouldReturnTaskDto() {
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskDto result = taskService.createTask(taskDto, userId);

        assertNotNull(result);
        assertEquals("Test Task", result.getTitle());
        assertEquals("Test Description", result.getDescription());
        assertFalse(result.isCompleted());
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void getTasksForUser_ShouldReturnTaskList() {
        List<Task> tasks = Collections.singletonList(task);
        when(taskRepository.findByUserId(userId)).thenReturn(tasks);

        List<TaskDto> result = taskService.getTasksForUser(userId);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Test Task", result.get(0).getTitle());
    }

    @Test
    void updateTask_WithValidData_ShouldReturnUpdatedTask() {
        taskDto.setId(taskId);
        taskDto.setCompleted(true);
        taskDto.setDueDate(OffsetDateTime.now().plusDays(2));

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));
        when(taskRepository.save(any(Task.class))).thenReturn(task);

        TaskDto result = taskService.updateTask(taskDto, userId);

        assertNotNull(result);
        verify(taskRepository).save(any(Task.class));
    }

    @Test
    void updateTask_WithoutId_ShouldThrowException() {
        taskDto.setId(null);

        BadRequestException exception = assertThrows(BadRequestException.class, () -> {
            taskService.updateTask(taskDto, userId);
        });
        assertEquals("Task id is required for update", exception.getMessage());
    }

    @Test
    void updateTask_WithDifferentUser_ShouldThrowException() {
        taskDto.setId(taskId);
        task.setUserId(2L);
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        ForbiddenException exception = assertThrows(ForbiddenException.class, () -> {
            taskService.updateTask(taskDto, userId);
        });
        assertEquals("You don't have permission to update this task", exception.getMessage());
    }

    @Test
    void deleteTask_WithValidUser_ShouldDeleteTask() {
        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        taskService.deleteTask(taskId, userId);

        verify(taskRepository).deleteById(taskId);
    }

    @Test
    void deleteTask_WithNonExistingTask_ShouldThrowException() {
        when(taskRepository.findById(taskId)).thenReturn(Optional.empty());

        NotFoundException exception = assertThrows(NotFoundException.class, () -> {
            taskService.deleteTask(taskId, userId);
        });
        assertEquals("Task not found", exception.getMessage());
    }
}