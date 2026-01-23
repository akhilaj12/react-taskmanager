import {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../components/API";
import CommentsSection from "../components/CommentsSection";

export default function TaskDetail(){
    const {taskId} = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);

    const fetchTaskDetail = async () => {
        try {
            const res = await API.get(`/tasks/${taskId}`);
            console.log("📋 Fetched task detail:", res.data);
            setTask(res.data);
        } catch (err) {
            console.error("❌ Error fetching task detail:", err);
            alert("Error fetching task detail: " + err.message);
        }
    };

    useEffect(() => {
        console.log("Fetching task detail for ID:", taskId);
        fetchTaskDetail();
    }, [taskId]);

    if (!task) {
        return <div>Loading task details...</div>;
    }

    return(
        <div className="max-w-3xl mx-auto p-6">
            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back to Tasks</button>
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="card-header">
                    <h3>{task.title}</h3>
                </div>
                <div className="card-body">
                    <p><strong>Description:</strong> {task.description || "No description provided."}</p>
                    <p><strong>Status:</strong> {task.status}</p>
                    <p className="text-sm text-gray-500">Priority</p>
<p className="font-medium">{task.priority}</p>

                    <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
                </div>
                <hr className="my-4" />
                <CommentsSection taskId={taskId} />
            </div>
        </div>
    );
}