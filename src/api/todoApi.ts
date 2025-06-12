const BASE_URL = import.meta.env.VITE_API_URL
import type { Todo } from '@/types/Todo'

export const getAllTodos = async (): Promise<Todo[]> => {
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