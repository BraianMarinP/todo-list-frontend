const BASE_URL = import.meta.env.VITE_API_URL
import type { Todo, UpdateTodoState, CreateTodoInput } from '@/types/Todo'

export const fetchAllTodos = async (): Promise<Todo[]> => {
    const response = await fetch(BASE_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    if (!response.ok) throw new Error('Failed to fetch todos.')
    const data = (await response.json()) as Todo[]
    return data
}

export const updateTodo = async (id: number, updateTodoState: UpdateTodoState): Promise<Todo> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodoState)
    })
    if (!response.ok) throw new Error('Failed to update task.')
    const data = (await response.json()) as Todo
    return data
}

export const createNewTodo = async (todo: CreateTodoInput): Promise<Todo> =>{
    const response = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo)
    })
    if (!response.ok) throw new Error('Failed to create task.')
    const data = (await response.json()) as Todo
    return data
}

export const deleteTodo = async (id: number): Promise<number> => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE'
    })
    if (response.status !== 204) throw new Error('Failed to delete task.')
    return id
}

export const deleteAllTodos = async () => {
    const response = await fetch(`${BASE_URL}/all`, {
        method: 'DELETE'
    })
    if (response.status !== 204) throw new Error('Failed to delete all tasks.')
}