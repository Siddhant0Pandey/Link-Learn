import { IoTrashBinOutline } from "react-icons/io5";
import "../../styles/todolist.css";
import { useState, useEffect } from "react";
import TodolistItems from "./TodolistItems";
import { MdOutlineLibraryAdd, MdOutlineLibraryAddCheck } from "react-icons/md";

function TodoList() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("todoTasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [todoinput, setTodoInput] = useState(false);

  useEffect(() => {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleTodoInput() {
    setTodoInput((prev) => !prev);
  }

  function addTask(task) {
    setTasks((prevTasks) => [...prevTasks, { text: task, completed: false }]);
    setTodoInput(false);
  }

  function toggleTask(index) {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(index) {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  }

  return (
    <div className={`todolist_container`}>
      <div className="todolist_label">
        <h3>To-Do List</h3>
        <div>
          <span onClick={handleTodoInput}>
            {todoinput ? (
              <MdOutlineLibraryAddCheck className="add_icon" />
            ) : (
              <MdOutlineLibraryAdd className="add_icon" />
            )}
          </span>
        </div>
      </div>
      {todoinput && (
        <div className="input_overlay">
          <TodolistItems addTask={addTask} />
        </div>
      )}
      {tasks.length === 0 ? (
        <div className="empty_message">No tasks here, please add one!</div>
      ) : (
        <ul className={`task_list ${todoinput ? "blurred" : ""}`}>
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`task_item ${task.completed ? "completed" : ""}`}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(index)}
                className="list_checkbox"
              />
              <span className="list_text">{task.text}</span>
              <span onClick={() => deleteTask(index)}>
                <IoTrashBinOutline className="bin" />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
