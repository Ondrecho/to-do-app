package com.ondrecho.todo.service;

import com.ondrecho.todo.dto.TaskDto;

import java.util.List;

public interface ITaskService {
    List<TaskDto> getTasksForUser(Long userId);
    TaskDto createTask(TaskDto dto, Long userId);
    TaskDto updateTask(TaskDto dto, Long userId);
    void deleteTask(Long id, Long userId);
}
