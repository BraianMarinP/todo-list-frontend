import { useEffect, useState } from 'react'
import AddTask from '@/components/AddTask/AddTask'
import Task from '@/components/Task/Task'
import './TodoList.css'
import { fetchAllTodos, updateTodo, createNewTodo, deleteTodo, deleteAllTodos } from '@/api/todoApi'
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
                onDelete={() => handleDeleteTodo(todo.id)}
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

    const handleDeleteTodo = async (todoID: number) => {
        try {
            const deletedTodoID = await deleteTodo(todoID)
            setTodos(prevTodos => prevTodos.filter(todo => todo.id !== deletedTodoID))
        } catch (error) {
            console.error('Failed to delete todo:', error)
        }
    }

    const handleDeleteAllTodos = async () => {
        try {
            await deleteAllTodos()
            setTodos([])
        } catch (error) {
            console.error('Failed to delete all todos:', error)
        }
    }

    return (
        <div className='todo-list-panel'>
            <AddTask inputValue={inputValue} setInputValue={setInputValue} onAddTask={addTodo}/>
            <br />
            <div className='todo-container'>
                {getAllTodos()}                
            </div>
            <button className='delete-all-button' onClick={handleDeleteAllTodos}>DELETE ALL</button>
        </div>
    )
}

export default TodoList