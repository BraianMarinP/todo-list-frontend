const BASE_URL = import.meta.env.REACT_APP_API_URL

export const getAllTodos = async () => {
    const response = await fetch(BASE_URL)
    if (!response.ok) throw new Error('Failed to fetch todos.')
    return response.json
}