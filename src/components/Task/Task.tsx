import './Task.css';
import { Trash2, Check } from 'lucide-react';

interface TaskProps {
    content: string;
    completed: boolean;
    onDelete: () => void;
    onComplete: () => void;
}

const Task = ({content, completed, onDelete, onComplete}: TaskProps) => {
    return (
        <>
            <div className='task-panel'>
                <div className='task-content'>
                    <button className={`circle-btn ${completed ? 'completed' : ''}`} onClick={onComplete}>
                        <Check size={36}/>
                    </button>
                    <p className={`task-text ${completed ? 'completed' : ''}`}>{content}</p>
                </div>
                <button className='delete-btn'onClick={onDelete}>
                    <Trash2 size={36} />
                </button>
            </div>
        </>
    );
}

export default Task;