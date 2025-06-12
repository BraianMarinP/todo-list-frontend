import { useEffect, useState } from 'react'
import AddTask from '../AddTask/AddTask'
import Task from '../Task/Task'
import './TodoList.css'
import { fetchAllTodos, updateTodo, createNewTodo } from '@/api/todoApi'
import type { Todo } from '@/types/Todo'
const TodoList = () => {

    const [inputValue, setInputValue] = useState('')
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

    const addTodo = async () => {
        if (inputValue.trim() != '')
            try {
                const newTodo = await createNewTodo({
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    description: inputValue.trim(),
                })
                setTodos(prevTodos => [...prevTodos, newTodo])
                setInputValue('')
            } catch (error) {
                console.log('Failed to add a new task.')
            }
    }

    return (
        <div className='todo-list-panel'>
            <AddTask inputValue={inputValue} setInputValue={setInputValue} onAddTask={addTodo}/>
            <br />
            <div className='todo-container'>
                {getAllTodos()}                
            </div>
            <button className='delete-all-button'>DELETE ALL</button>
        </div>
    )
}

export default TodoList