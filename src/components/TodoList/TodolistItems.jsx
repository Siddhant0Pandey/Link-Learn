/* eslint-disable react/prop-types */
import "../../styles/todolist.css";
import { useState } from "react";

function TodolistItems({ addTask }) {
  const [task, setTask] = useState("");

  function handleAdd() {
    if (task.trim()) {
      addTask(task);
      setTask("");
    }
  }

  return (
    <div className="todoInput">
      <input
        type="text"
        placeholder="Enter your task"
        className="textinput"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        autoFocus
      />
      <button onClick={handleAdd} className="submit">
        Add
      </button>
    </div>
  );
}

export default TodolistItems;
