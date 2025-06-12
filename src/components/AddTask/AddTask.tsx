import { useEffect, useState } from 'react'
import './AddTask.css'
import { Plus } from 'lucide-react'

interface AddTaskProps {
    inputValue: string
    setInputValue: (value: string) => void
    onAddTask: () => void
}

const AddTask = ({ inputValue, setInputValue, onAddTask }: AddTaskProps) => {
    const [count, setCount] = useState(0)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        setCount(inputValue.length)
    }, [inputValue])

    return (
        <div className='add-task-panel'>
            <input 
                className='input' 
                placeholder='Add Task..' 
                maxLength={50} 
                onChange={handleInputChange} 
                value={inputValue}
            />
            <span className='char-count'>{count}/50</span>
            <button 
                className='add-button'
                onClick={onAddTask}
            >
                <Plus size={36}/>
            </button>
        </div>
    )
}

export default AddTask