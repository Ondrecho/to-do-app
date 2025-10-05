
import axios from "axios";

export const api = axios.create({
    baseURL: process.env.API_URL,
});


api.interceptors.request.use(
    config => {
        config.headers["Authorization"] = `Bearer ${localStorage.getItem("token")}`
        
        return config;
    }
)

export const method = {
    user: {
        login(data: AuthParams) {
            return api.post<LoginAnswer>("auth/login", data)
        },
        register(data: AuthParams) {
            return api.post("auth/register", data)
        },
    },
    task: {
        get() {
            return api.get<Task[]>("/task")
        },
        delete(id: string) {
            return api.delete<{answer: string}>("/task", {data: {id}})
        },
        create(data: Task) {
            return api.post<Task>("/task", {...data})
        },
        update(data: Task) {
            return api.put<Task>("/task", {...data})
        },
    }
}