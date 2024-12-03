import React from "react";
import PropTypes from "prop-types";
import { FaCheck, FaTrash } from "react-icons/fa";

function TaskItem({ task, toggleTask, deleteTask }) {
  const isOverdue =
    task.dueDate &&
    !isNaN(new Date(task.dueDate)) &&
    new Date(task.dueDate) < new Date() &&
    !task.completed;

  return (
    <div
      className={`task-item ${task.completed ? "completed" : ""} ${
        isOverdue ? "overdue" : ""
      }`}
    >
      <div>
        <span>{task.text}</span>
        {task.dueDate && (
          <small> (Due: {new Date(task.dueDate).toLocaleString()})</small>
        )}
      </div>
      <div className="task-actions">
        <button
          onClick={() => toggleTask(task.id)}
          className="icon-check"
          title="Mark as Complete"
          aria-label="Mark task as complete"
        >
          <FaCheck />
        </button>
        <button
          onClick={() => deleteTask(task.id)}
          className="icon-delete"
          title="Delete Task"
          aria-label="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

// Prop-Types Validation
TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    dueDate: PropTypes.string,
  }).isRequired,
  toggleTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

export default TaskItem;
