import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import API from "../components/API";
import CommentsSection from "../components/CommentsSection";

export default function TaskDetail() {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editTask, setEditTask] = useState(null);

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

    const handleSave = async () => {
        try {
            const res = await API.put(`/tasks/${taskId}`, editTask);
            setTask(res.data);     // update main task
            setIsEditing(false);
        } catch (err) {
            console.error("Failed to update task", err);
            alert("Failed to save changes");
        }
    };

    useEffect(() => {
        console.log("Fetching task detail for ID:", taskId);
        fetchTaskDetail();
    }, [taskId]);

    useEffect(() => {
        if (task) {
            setEditTask(task);
        }
    }, [task]);


    if (!task) {
        return <div>Loading task details...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Task Details</h3>

                {!isEditing ? (
                    <button
                        className="bg-blue-600 text-white px-4 py-1 rounded"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                ) : (
                    <div className="space-x-2">
                        <button
                            className="bg-green-600 text-white px-4 py-1 rounded"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="bg-gray-400 text-white px-4 py-1 rounded"
                            onClick={() => {
                                setEditTask(task); // reset
                                setIsEditing(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                )}
            </div>

            <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>Back to Tasks</button>
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="card-header">
                    {!isEditing ? (
                        <h3 className="font-bold">{task.title}</h3>
                    ) : (
                        <input
                            className="border rounded p-2 w-full"
                            value={editTask.title}
                            onChange={(e) =>
                                setEditTask({ ...editTask, title: e.target.value })
                            }
                        />
                    )}

                </div>
                <hr />
                <div className="card-body">
                    {!isEditing ? (
                        <p>{task.description || "No description provided."}</p>
                    ) : (
                        <textarea
                            className="border rounded p-2 w-full"
                            value={editTask.description || ""}
                            onChange={(e) =>
                                setEditTask({ ...editTask, description: e.target.value })
                            }
                        />
                    )}

                    {!isEditing ? (
                        <p><strong>Status:</strong> {task.status}</p>
                    ) : (
                        <select
                            className="border rounded p-2 px-4"
                            value={editTask.status}
                            onChange={(e) =>
                                setEditTask({ ...editTask, status: e.target.value })
                            }
                        >
                            <option value="TO_DO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    )}

                    {!isEditing ? (
                        <p><strong>Priority:</strong> {task.priority}</p>
                    ) : (
                        <select
                            className="border rounded p-2 px-4 ml-2"
                            value={editTask.priority}
                            onChange={(e) =>
                                setEditTask({ ...editTask, priority: e.target.value })
                            }
                        >
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                        </select>
                    )}


                    {!isEditing ? (
                        <p><strong>Due Date:</strong> {task.dueDate || "No due date"}</p>
                    ) : (
                        <input
                            type="date"
                            className="border rounded p-2 px-4 ml-2"
                            value={editTask.dueDate || ""}
                            onChange={(e) =>
                                setEditTask({ ...editTask, dueDate: e.target.value })
                            }
                        />
                    )}

                </div>
                <hr className="my-4" />
                <CommentsSection taskId={taskId} />
            </div>
        </div>
    );
}