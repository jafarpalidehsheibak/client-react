import React, { useState, useEffect } from "react";
import axios from "axios";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";
import UpdateTask from "./components/UpdateTask";
function App() {
  const [todolist, setTodolist] = useState([]);
  const [tasktoUpdate, setTasktoUpdate] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    axios
      .get("https://jafarpalidehsheibak.onrender.com/api/tasks")
      .then((res) => setTodolist(res.data))
      .catch((err) => console.log(err));
  }, []);
  const addTask = (newTask) => {
    setTodolist([...todolist, newTask]);
  };
  const taskComplete = (task) => {
    const newList = [...todolist];
    newList.forEach((item) => {
      if (item._id === task._id) {
        item.isComplete = task.isComplete;
      }
    });
    setTodolist(newList);
  };
  const removeTask = (task) => {
    const newList = todolist.filter((item) => !(item._id === task._id));
    setTodolist(newList);
  };
  const updatetask = (task) => {
    const newList = [...todolist];
    newList.forEach((item) => {
      if (item._id === task._id) {
        item.todo = task.todo;
      }
    });
    setTodolist(newList);
  };
  return (
    <div>
      <AddTask addTask={addTask} />
      <TodoList
        todolist={todolist}
        taskComplete={taskComplete}
        removeTask={removeTask}
        tasktoUpdate={(task) => setTasktoUpdate(task)}
        showPopup={() => setShowPopup(!showPopup)}
      />
      {showPopup && (
        <UpdateTask
          task={tasktoUpdate}
          updatetask={updatetask}
          removePopup={() => setShowPopup(!showPopup)}
        />
      )}
    </div>
  );
}

export default App;
