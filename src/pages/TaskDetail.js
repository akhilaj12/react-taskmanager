import {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../components/API";

export default function TaskDetail(){
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    const fetchTaskDetail = async () => {
        try {
            const res = await API.get(`/tasks/${taskId}`);
            setTask(res.data);
        } catch (err) {
            console.error("❌ Error fetching task detail:", err);
            alert("Error fetching task detail: " + err.message);
        }
    };

    useEffect(() => {
        fetchTaskDetail();
    }, [taskId]);

    if (!task) {
        return <div>Loading task details...</div>;
    }

    return(
        <div className="container mt-4">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back to Tasks</button>
            <div className="card">
                <div className="card-header">
                    <h3>{task.title}</h3>
                </div>
                <div className="card-body">
                    <p><strong>Description:</strong> {task.description || "No description provided."}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p><strong>Priority:</strong> {task.priority}</p>
                    <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
                </div>
            </div>
        </div>
    );
}