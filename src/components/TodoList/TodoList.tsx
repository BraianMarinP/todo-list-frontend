import { useEffect, useState } from 'react'
import AddTask from '../AddTask/AddTask'
import Task from '../Task/Task'
import './TodoList.css'
import { fetchAllTodos, updateTodo } from '@/api/todoApi'
import type { Todo } from '@/types/Todo'

const TodoList = () => {

    const [todos, setTodos] = useState<Todo[]>([])

    const fetchTodos = async () => {
        try {
            const fetchedTodos = await fetchAllTodos()
            setTodos(fetchedTodos)
        } catch (error) {
            console.error('Error while fetching tasks:', error)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])

    const getAllTodos = () => {
        return todos.map(todo => (
            <Task
                key={todo.id}
                content={todo.description}
                completed={todo.completed}
                onComplete={() => updateTodoState(todo)}
                onDelete={() => {}}
            />
        ))
    }

    const updateTodoState = async (todoToUpdate: Todo) => {
        const completed = todoToUpdate.completed ? false : true
        try {
            const updatedTodo = await updateTodo(todoToUpdate.id, { completed: completed })
            setTodos(prevTodos => prevTodos.map(todo =>
                todo.id === todoToUpdate.id ? updatedTodo :todo
            ))
        } catch (error) {
            console.error('Failed to update todo:', error)
        }
    }

    return (
        <div className='todo-list-panel'>
            <AddTask />
            <br />
            <div className='todo-container'>
                {getAllTodos()}                
            </div>
            <button className='delete-all-button'>DELETE ALL</button>
        </div>
    )
}

export default TodoList