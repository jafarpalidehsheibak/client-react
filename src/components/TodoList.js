import React from "react";
import "./TodoList.css";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
const BaseUrl = "https://jafarpalidehsheibak.onrender.com/api/tasks/";
function TodoList(props) {
  const todolist = props.todolist.map((task, index) => {
    const taskComplete = (task) => {
      axios
        .put(`${BaseUrl}${task._id}`, {
          _id: task._id,
          todo: task.todo,
          isComplete: !task.isComplete,
        })
        .then((res) => props.taskComplete(res.data))
        .catch((err) => console.log(err));
    };
    const removeTask = (id) => {
      axios
        .delete(`${BaseUrl}${task.id}`)
        .then((res) => props.removeTask(res.data))
        .catch((err) => console.log(err));
    };
    return (
      <li key={index}>
        <div style={{ display: "flex" }}>
          <CheckIcon className={task.isComplete ? "isComplete" : "checkicon"} />
          <p
            className={task.isComplete ? "taskcomplete" : ""}
            onClick={() => {
              taskComplete(task);
            }}
          >
            {task.todo}
          </p>
        </div>
        <div>
          <EditIcon
            className="edit"
            onClick={() => {
              props.tasktoUpdate(task);
              props.showPopup();
            }}
          />
          <CloseIcon
            className="close"
            onClick={() => {
              removeTask(task._id);
            }}
          />
        </div>
      </li>
    );
  });
  return (
    <div className="tasklist">
      <ul>{todolist}</ul>
    </div>
  );
}

export default TodoList;
