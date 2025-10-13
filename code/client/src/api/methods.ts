import axios, { AxiosResponse } from "axios";
import { AuthParams, LoginAnswer, Task, User } from "./types";

export const api = axios.create({
    baseURL: "/api",
});

api.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
        
        return config;
    }
)

const MOCK_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBZG1pbiIsImlkIjoxLCJpYXQiOjE3NjAzNTE0MjYsImV4cCI6MTc2Mzk1MTQyNn0.ONF59JnZrguNCDwrITZU2KYhkQWQT4gMsnvCHFPmD8o"

const MOCK_USER: User = { 
    id: 1,
    username: "Admin",
    password: "",
    isAuthenticated: true,
}

const NOW_ISO = new Date().toISOString();
const YESTERDAY_ISO = new Date(Date.now() - 86400000).toISOString();
const HOUR_AGO_ISO = new Date(Date.now() - 3600000).toISOString();

const MOCK_TASKS: Task[] = [
    {id: 101, userId: 1, title: "Мокирование завершено", description: "Успешно мокировать все обращения к API для обхода проблем с CORS и TS.", isImportant: true, createdAt: NOW_ISO},
    {id: 102, userId: 1, title: "Протестировать роутинг", description: "Проверить, что фронтенд корректно переходит между страницами /login, /register и /.", isImportant: false, createdAt: YESTERDAY_ISO},
    {id: 103, userId: 1, title: "Настроить Nginx", description: "Вернуться к настройке Nginx Reverse Proxy после завершения работы над фронтом.", isImportant: false, createdAt: HOUR_AGO_ISO}
]

const createMockResponse = <T>(data: T): AxiosResponse<T> => ({
    data,
    status: 200, 
    statusText: 'OK', 
    headers: {}, 
    config: {} as any
});

export const method = {
    user: {
        login(data: AuthParams): Promise<AxiosResponse<LoginAnswer>> { 
            console.log(`MOCK: Attempting login for user: ${data.username}`)
            
            const mockResponse: LoginAnswer = {
                token: MOCK_TOKEN,
                user: MOCK_USER,
            }

            return new Promise((resolve) => {
                setTimeout(() => { 
                    resolve(createMockResponse(mockResponse))
                }, 500)
            })
        },

        register(data: AuthParams): Promise<AxiosResponse<LoginAnswer>> {
            console.log(`MOCK: Registering user: ${data.username}`)
            
            const mockResponse: LoginAnswer = {
                token: MOCK_TOKEN,
                user: MOCK_USER,
            }
            
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(createMockResponse(mockResponse))
                }, 500)
            })
        },
    },
    
    task: {
        get(): Promise<AxiosResponse<Task[]>> {
            console.log("MOCK: Getting tasks.")
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(createMockResponse(MOCK_TASKS))
                }, 300)
            })
        },
        delete(id: string): Promise<AxiosResponse<{answer: string}>> {
            console.log(`MOCK: Deleting task ${id}.`)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(createMockResponse({answer: `Task ${id} deleted.`}))
                }, 300)
            })
        },
        create(data: Task): Promise<AxiosResponse<Task>> {
            console.log(`MOCK: Creating task: ${data.title}`)
            const newTask: Task = {...data, id: Date.now(), userId: MOCK_USER.id, createdAt: new Date().toISOString()}
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(createMockResponse(newTask))
                }, 300)
            })
        },
        update(data: Task): Promise<AxiosResponse<Task>> {
            console.log(`MOCK: Updating task: ${data.id}`)
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(createMockResponse(data))
                }, 300)
            })
        },
    }
}