import TaskBoard from "../components/TaskBoard";
import { useEffect, useState } from "react";
import API from "../components/API";

function Tasks(){
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        console.log("🔍 Fetching tasks...");
        API.get("/tasks")
        .then((res) => {
            console.log("✅ Tasks fetched successfully:", res.data);
            setTasks(res.data);
        })
        .catch((err) => {
            console.error("❌ Error fetching tasks:", err);
            alert("Error fetching tasks: " + err.message);
        });
    }, [])

     console.log("📊 Current tasks state:", tasks);

    return(
        <div className="justify-content-center vh-100 bg-light">
            <h2 className="text-center mb-3 mt-3">View Your Tasks here!</h2>
            <p className="text-center text-muted">Tasks count: {tasks.length}</p>
            <div className="d-flex justify-content-center align-items-center">
            <TaskBoard tasks = {tasks} setTasks={setTasks}/>
            </div>
        </div>
    );
}

export default Tasks;
