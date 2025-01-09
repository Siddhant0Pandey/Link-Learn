import { IoTrashBinOutline } from "react-icons/io5";
import "../../styles/todolist.css";
import { useState, useEffect } from "react";
import TodolistItems from "./TodolistItems";
import { MdOutlineLibraryAdd, MdOutlineLibraryAddCheck } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

// import { useNavigate } from "react-router-dom";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [todoinput, setTodoInput] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [updatedTask, setUpdatedTask] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);

  // const navigate = useNavigate();

  const handleCancelLinkForm = () => {
    setUpdatedTask("");
    setToggleUpdate(false);
  };

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const token = getAuthToken();
      if (!token) {
        alert("You need to log in to view your tasks.");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        const mappedTasks = data.tasks.map((task) => ({
          id: task._id,
          text: task.title,
          completed: task.isCompleted,
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // const handleToggleUpdate = () => {
  //   setToggleUpdate(!toggleUpdate);
  // };

  const handleTodoInput = () => {
    setTodoInput((prev) => !prev);
    // navigate("/todo");
  };

  const addTask = (task) => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to add tasks.");
      return;
    }

    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: task, isCompleted: false }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.task) {
          setTasks((prevTasks) => [
            ...prevTasks,
            {
              id: data.task._id,
              text: data.task.title,
              completed: data.task.isCompleted,
            },
          ]);
          setTodoInput(false);
        }
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const toggleTask = async (index) => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to update tasks.");
      return;
    }

    const taskToToggle = tasks[index];
    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    try {
      await fetch(`http://localhost:3000/tasks/${taskToToggle.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isCompleted: updatedTask.completed }),
      });

      setTasks((prevTasks) =>
        prevTasks.map((task, i) => (i === index ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = (index) => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to delete tasks.");
      return;
    }

    const taskToDelete = tasks[index];
    fetch(`http://localhost:3000/tasks/${taskToDelete.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
        }
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  const updateTask = async () => {
    const token = getAuthToken();
    if (!token) {
      alert("You need to log in to update tasks.");
      return;
    }

    if (editingTaskIndex === null) {
      alert("No task is selected for update.");
      return;
    }

    const taskToUpdate = tasks[editingTaskIndex];

    if (!updatedTask.trim()) {
      alert("Please provide a new title for the task.");
      return;
    }

    try {
      const updatedTaskData = {
        title: updatedTask,
        isCompleted: taskToUpdate.completed,
      };

      console.log("Updating task with ID:", taskToUpdate.id);

      const response = await fetch(
        `http://localhost:3000/tasks/${taskToUpdate.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedTaskData),
        }
      );

      if (response.ok) {
        const updatedResponse = await response.json();

        console.log("Updated task:", updatedResponse.task);

        console.log("Before update:", tasks);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task.id === updatedResponse.task._id ? updatedResponse.task : task
          )
        );
        console.log("After update:", tasks);

        setToggleUpdate(false);
        setUpdatedTask("");
      } else {
        console.error("Failed to update task");
        alert("Failed to update task. Please try again.");
      }
    } catch (err) {
      console.error("Error updating task:", err);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="todolist_container">
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
      {toggleUpdate && (
        <div className={`todoInput`}>
          <input
            type="text"
            placeholder="Enter the updated task"
            className="textinput"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
            autoFocus
          />
          <button onClick={() => updateTask()} className="submit">
            Save
          </button>
          <button
            type="button"
            className="cancel_button"
            onClick={() => handleCancelLinkForm()}
          >
            Cancel
          </button>
        </div>
      )}
      {tasks.length === 0 ? (
        <div className="empty_message">No tasks here, please add one!</div>
      ) : (
        <ul
          className={`task_list ${todoinput || toggleUpdate ? "blurred" : ""}`}
          key={tasks}
        >
          {tasks.map((task, index) => (
            <>
              <li
                key={task.id}
                className={`task_item ${task.completed ? "completed" : ""}`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(index)}
                  className="list_checkbox"
                />
                <span className="list_text">{task.text}</span>
                <div className="todo_icon_box">
                  <span
                    onClick={() => {
                      setEditingTaskIndex(index);
                      setUpdatedTask(task.text);
                      setToggleUpdate(true);
                    }}
                  >
                    <FaRegEdit className="edit_icon" />
                  </span>
                  <span onClick={() => deleteTask(index)}>
                    <IoTrashBinOutline className="bin" />
                  </span>
                </div>
              </li>
              {/* update component */}
            </>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
