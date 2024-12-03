import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div className={`task-item ${task.completed ? "completed" : ""}`}>
      <span onClick={() => toggleTask(task.id)}>{task.text}</span>
      <div className="task-actions">
        <FaCheck
          onClick={() => toggleTask(task.id)}
          className="icon-check"
          title="Mark as Complete"
        />
        <FaTrash
          onClick={() => deleteTask(task.id)}
          className="icon-delete"
          title="Delete Task"
        />
      </div>
    </div>
  );
}

export default TaskItem;
