import TaskList from "../components/TaskList";
import TaskBoard from "../components/TaskBoard";
import { useEffect, useState } from "react";
import API from "../components/API";

function Tasks(){
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        API.get("/tasks")
        .then((res) => setTasks(res.data))
        .catch((err)=> console.error("Error fetching tasks =",err));
    },[]
    )

    return(
        <div className="justify-content-center vh-100 bg-light">
            <h2 className="text-center mb-3 mt-3">View Your Tasks here!</h2>
            <div className="d-flex justify-content-center align-items-center">
            <TaskBoard tasks = {tasks} setTasks={setTasks}/>
            </div>
            <TaskList />
        </div>
    );
}

export default Tasks;
