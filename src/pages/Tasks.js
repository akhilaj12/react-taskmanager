import TaskBoard from "../components/TaskBoard";
import { useEffect, useState } from "react";
import API from "../components/API";

function Tasks(){
    const [tasks, setTasks] = useState([])
    const [searchTitle, setSearchTitle] = useState("");
    const [status, setStatus] = useState("");

     console.log("📊 Current tasks state:", tasks);

     const fetchTasks = async () => {try{
        let url = "/tasks/search";

        const params = [];
        if (searchTitle) params.push(`title=${searchTitle}`);
        if (status) params.push(`status=${status}`);

        if (params.length) {
            url += `?${params.join("&")}`;
        }

        const res = await API.get(url);
      setTasks(res.data);
    } catch (err) {
        console.error("❌ Error fetching tasks with filters:", err);
        alert("Error fetching tasks: " + err.message);
    }
};

    useEffect(() => {
        fetchTasks();
        console.log("fetching tasks..");
    }, [searchTitle, status]);



    return(
        <div className="justify-content-center vh-100 bg-light">
            <h2 className="text-center mb-3 mt-3">View Your Tasks here!</h2>
            <p className="text-center text-muted">Tasks count: {tasks.length}</p>
            <div className="filters text-center mb-3">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTitle}
          onChange={(e) => setSearchTitle(e.target.value)}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="TO_DO">Todo</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Done</option>
        </select>
      </div>

            <div className="d-flex justify-content-center align-items-center">
            <TaskBoard tasks = {tasks} setTasks={setTasks}/>
            </div>
        </div>
    );
}

export default Tasks;
