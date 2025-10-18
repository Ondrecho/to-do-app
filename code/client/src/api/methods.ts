import axios, { AxiosResponse } from "axios";
import { AuthParams, LoginAnswer, Task, User } from "./types";

export const api = axios.create({
    baseURL: "/api",
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const method = {
    user: {
        login(data: AuthParams): Promise<AxiosResponse<LoginAnswer>> {
            return api.post<LoginAnswer>("/auth/login", data);
        },

        register(data: AuthParams): Promise<AxiosResponse<LoginAnswer>> {
            return api.post<LoginAnswer>("/auth/register", data);
        },
    },

    task: {
        get(): Promise<AxiosResponse<Task[]>> {
            return api.get<Task[]>("/task");
        },

        delete(id: string): Promise<AxiosResponse<{ answer: string }>> {
            return api.delete<{ answer: string }>(`/task/${id}`);
        },

        create(data: Task): Promise<AxiosResponse<Task>> {
            return api.post<Task>("/task", {
                ...data,
                completed: false, 
            });
        },

        update(data: Task): Promise<AxiosResponse<Task>> {
            return api.put<Task>(`/task/${data.id}`, data);
        },
    },
};
