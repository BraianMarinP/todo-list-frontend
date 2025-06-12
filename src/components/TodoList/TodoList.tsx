import { useEffect, useState } from 'react'
import AddTask from '../AddTask/AddTask'
import Task from '../Task/Task'
import './TodoList.css'
import { getAllTodos } from '@/api/todoApi'
import type { Todo } from '@/types/Todo'

const TodoList = () => {

    const [tasks, setTasks] = useState<Todo[]>([])

    const fetchTasks = async () => {
        try {
            const todos = await getAllTodos()
            setTasks(todos)
        } catch (error) {
            console.error('Error while fetching tasks:', error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [])

    const getAllTasks = () => {
        return tasks.map(task => (
            <Task
                key={task.id}
                content={task.description}
                onComplete={() => {}}
                onDelete={() => {}}
            />
        ))
    }

    return (
        <div className='todo-list-panel'>
            <AddTask />
            <br />
            <div className='task-container'>
                {getAllTasks()}                
            </div>
            <button className='delete-all-button'>DELETE ALL</button>
        </div>
    )
}

export default TodoList