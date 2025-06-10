import { useEffect, useState } from 'react'
import './AddTask.css'
import { Plus } from 'lucide-react'


const AddTask = () => {
    const [count, setCount] = useState(0)
    const [inputValue, setInputValue] = useState('')

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
            <button className='add-button'>
                <Plus size={36}/>
            </button>
        </div>
    )
}

export default AddTask