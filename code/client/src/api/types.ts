import React from "react"

export type AuthParams = {
    username: string,
    password: string
}

export type LoginAnswer = {
    token: string,
    user: User
}

export type User = {
    id: number,
    username: string,
    password: string,
    isAuthenticated: boolean,
    exit?: () => void
}

export type Task = {
    id: number,
    userId: number,
    title: string,
    description: string,
    isImportant: boolean,
    completed: boolean, 
    createdAt: Date |
string
}

export type UserContextType = {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type TaskFilter = 'all' | 'important' | 'completed';