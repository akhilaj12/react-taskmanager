import {useState} from 'react';
import API from './API';
import "./cssStyling/AuthStyling.css";
import Swal from "sweetalert2";

export default function TaskForm(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
    
        if(!title?.trim()){
            Swal.fire({
                icon: 'warning',
                title: 'Invalid title!',
                text: 'Please enter the title';
            });
            return;
        }
        const newTask = {title, description};
        try{
            console.log("Creating task:", newTask);
            API.post(`/tasks`, newTask);
            setTitle("");
            setDescription("")
            Swal.fire({
                    title: "Created task for you!",
                    text: `${title} - ${description} added!`,
                    icon: 'success',
                    timer: 3000
                });
        }
        catch((error) => {
            console.error('Error creating task:', error);
            Swal.fire({ icon: 'error', title: 'Create failed', text: 'Could not create task. Try again.' });
        });

    }

    return (
        <div className='align-items-center justify-content-center d-flex'>
            <div className="card p-4 auth-card justify-content-center">
                <form onSubmit = {handleSubmit}>
                    <h2 className="text-center mb-4 auth-title">Add Task!</h2>
                    <input
                        type="text"
                        className="form-control auth-input" 
                        placeholder="Task Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        className="form-control auth-input" 
                        placeholder="Task Description"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        required
                    />
                    <button className="btn auth-btn w-100" type="submit">Add Task</button>
                </form>
            </div>
        </div>
    )
}