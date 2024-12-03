import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add Task
  const addTask = (task, dueDate, reminder) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        text: task,
        completed: false,
        dueDate: dueDate || null,
        reminder: reminder || false,
      },
    ]);
  };

  // Check reminders
  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task) => {
        if (
          task.reminder &&
          task.dueDate &&
          new Date(task.dueDate) <= new Date()
        ) {
          toast.info(`Reminder: ${task.text}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          task.reminder = false; // Disable reminder after showing
          setTasks([...tasks]);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval); // Cleanup
  }, [tasks]);

  // Toggle Task Completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="App">
      <h1>Task Tracker</h1>
      <TaskInput addTask={addTask} />
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />
      <ToastContainer />
    </div>
  );
}

export default App;
