import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskSection() {
    const [taskForm, setTaskForm] = useState(false);
    
    return (
        <div className="flex items-center justify-center">
            {!taskForm && (
                <button 
                    onClick={() => setTaskForm(true)} 
                    className="btn btn-primary align-items-center mt-5 block-mx-auto"
                >
                    Add task
                </button>
            )}
            {taskForm && <TaskForm />}
        </div>
    );
}
