
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
    id?: number,
    userId?: number,
    title: string,
    description: string,
    createdAt?: Date,
    isImportant?: boolean
}