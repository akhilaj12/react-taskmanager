import React, {useEffect, useState} from 'react';
import API from './API';
import Swal from "sweetalert2";
import './cssStyling/AuthStyling.css';


export default function TaskList(){
  const [tasks, setTasks] = useState([]);
  //const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({title: '', description: '', status: ''});

  useEffect(() => {
    API.get('/tasks')
      .then(response => {
        console.log("response data : ", response.data); 
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  function deleteTask(id){
    API.delete(`/tasks/${id}`)
    .then(() => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }).catch((err) => console.error("error deleting task:", err));
  }

  function toggleComplete({id}){
    
  }

  function handleAddTaskClick(){
    Swal.fire({
      input: 'hi',
      confirmButtonText:"Add",
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      cancelButtonText: 'Cancel'
    })
  }

  const startEdit = (task) => {
    //setEditId(task.id);
    setEditForm({title : task.title, description : task.description, status: task.status});
  }

//   const saveEdit = (id) => {
//     API.put(`/tasks/${id}`, editForm)
//       .then((res) => {
//         setTasks((prevTasks) => prevTasks.map((task) => (task.id === id ? res.data : task)));
//         setEditId(null);
//         setEditForm({title: '', description: '', status: ''});
//       })
//       .catch((err) => {
// if (err.response) {
//     console.error("Server responded with:", err.response.status, err.response.data);
//   } else if (err.request) {
//     console.error("No response received:", err.request);
//   } else {
//     console.error("Error setting up request:", err.message);
//   }
// });
  //}

  return(
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Tasks</h3>
        <button className='btn btn-success' onClick={handleAddTaskClick}>+ Add Task</button>
      </div>
      <div className='list-group'>
      {tasks.map((task) => (
        <div key={task.id} className='list-group-item d-flex justify-content-center align-items-center'>
          <div className='d-flex align-items-center'>
            <input type='checkbox'
                   className='form-check-input me-2'
                   checked={editForm.status === 'COMPLETED'}
                   onChange={()=>toggleComplete(task.id)}></input>
            <span style={{textDecoration: task.status === "COMPLETED" ? "line-through" : "none"}}>{task.title}</span>
          </div>
          { (
            //viewMode!
            <div className='d-flex justify-content-center auth-bg vh-50'>
              <b>{task.title}</b> - {task.description} [{task.status === 'COMPLETED' ? "Completed" : "Pending"}]
              <button onClick={() => startEdit(task)}>Edit</button>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          )}
          </div>
      ))}
      </div>
    </div>
  );
}
