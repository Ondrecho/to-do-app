package com.ondrecho.todo.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.OffsetDateTime;

@Schema(description = "Task DTO")
public class TaskDto {
    private Long id;

    @NotBlank(message = "Title is required")
    @Size(max = 255, message = "Title must not exceed 255 characters")
    private String title;

    @NotBlank(message = "Description is required") // Изменил с @NotNull на @NotBlank
    @Size(max = 2000, message = "Description must not exceed 2000 characters")
    private String description;

    private boolean isImportant;

    private OffsetDateTime createdAt;

    private Long userId;

    @Schema(description = "Task id")
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    @Schema(description = "Task title")
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    @Schema(description = "Task description")
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    @Schema(description = "Is important flag")
    public boolean isImportant() { return isImportant; }
    public void setImportant(boolean important) { isImportant = important; }
    @Schema(description = "Creation date")
    public OffsetDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(OffsetDateTime createdAt) { this.createdAt = createdAt; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}
