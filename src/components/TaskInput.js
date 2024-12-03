// TaskInput.js
import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [reminder, setReminder] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      addTask(input, dueDate, reminder);
      setInput("");
      setDueDate("");
      setReminder(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="datetime-local"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          className="reminder-checkbox"
          checked={reminder}
          onChange={(e) => setReminder(e.target.checked)}
        />
        Set Reminder
      </label>
      <button type="submit">Add</button>
    </form>
  );
}

export default TaskInput;
