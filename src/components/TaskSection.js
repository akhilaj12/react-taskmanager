import { useState } from "react";
import TaskForm from "./TaskForm";

export default function TaskSection() {
    const [taskForm, setTaskForm] = useState(false);
    
    return (
        <div className="d-flex justify-content-center">
            {!taskForm && (
                <button 
                    onClick={() => setTaskForm(true)} 
                    className="btn btn-primary align-items-center mt-5"
                >
                    Add task
                </button>
            )}
            {taskForm && <TaskForm />}
        </div>
    );
}
