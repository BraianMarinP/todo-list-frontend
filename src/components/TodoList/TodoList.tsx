import AddTask from '../AddTask/AddTask'
import Task from '../Task/Task'
import './TodoList.css'

const TodoList = () => {

    const getAllTasks = () => {
        const tasks = [
            { id: 1, content: 'Esta es una cadena de máximo 50 carácteres para probar.' },
            { id: 2, content: 'Improve my english level.' },
            { id: 3, content: 'Learn React basics.' },
            { id: 4, content: 'Finish TypeScript project.' }, 
            { id: 5, content: 'Workout 30 minutes.' }
        ]

        return tasks.map(task => (
            <Task
                key={task.id}
                content={task.content}
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