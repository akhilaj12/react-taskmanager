import {useState} from 'react';
import API from './API';
import "./cssStyling/AuthStyling.css";
import Swal from "sweetalert2";

export default function TaskForm(){
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');
    const [priority, setPriority] = useState('LOW');
    const [dueDate, setDueDate] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
    
        if(!title?.trim()){
            Swal.fire({
                icon: 'warning',
                title: 'Invalid title!',
                text: 'Please enter the title'
            });
            return;
        }
        const newTask = {title, description, priority, dueDate};
        try{
            console.log("Creating task:", newTask);
            console.log("API baseURL:", API.defaults.baseURL);
            const response = await API.post(`/tasks`, newTask);
            console.log("Task created successfully:", response.data);
            setTitle("");
            setDescription("")
            setPriority("LOW");
            setDueDate("");
            Swal.fire({
                    title: "Created task for you!",
                    text: `${title} - ${description} added!`,
                    icon: 'success',
                    timer: 3000
                });
        }
        catch(error) {
            console.error('Error creating task:', error);
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            if (error.response) {
                console.error('Response status:', error.response.status);
                console.error('Response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received. Request:', error.request);
            }
            Swal.fire({ 
                icon: 'error', 
                title: 'Create failed', 
                text: error.message || 'Could not create task. Try again.' 
            });
        }

    }

    return (
        <div className='w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4 py-12'>
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-2xl p-8">
                <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">Create New Task</h2>
                    <p className="text-center text-gray-500 mb-8">Add a task to your to-do list</p>
                    
                    {/* Title Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Task Title</label>
                        <input
                            type="text"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            placeholder="Enter task title..."
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    {/* Description Input */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Description</label>
                        <textarea
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                            placeholder="Enter task description..."
                            rows="2"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Priority Select */}
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Priority Level</label>
                        <select
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors bg-white cursor-pointer"
                            value={priority}
                            onChange={e => setPriority(e.target.value)}
                        >
                            <option value="LOW">🟢 Low Priority</option>
                            <option value="MEDIUM">🟡 Medium Priority</option>
                            <option value="HIGH">🔴 High Priority</option>
                        </select>
                    </div>

                    {/* Due Date Input */}
                    <div className="mb-8">
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Due Date</label>
                        <input
                            type="date"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <button 
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg"
                        type="submit"
                    >
                        ✨ Create Task
                    </button>
                </form>
            </div>
        </div>
    )
}