import "./addtask.css";
import React, { useState } from "react";
import axios from "axios";
function AddTask(props) {
  const [task, setTask] = useState("");
  const addTask = () => {
    if (task.trim() === "") {
      alert("Please Enter Task");
      return;
    } else {
      axios
        .post("http://localhost:8000/api/tasks", {
          todo: task,
          isComplete: false,
        })
        .then((res) => {
          setTask("");
          props.addTask(res.data);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="addtask">
      <input
        type="text"
        placeholder="Add Task . . ."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={() => addTask()}>Save Task</button>
    </div>
  );
}

export default AddTask;
