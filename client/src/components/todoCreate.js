import React, { useState } from "react";
import { useNavigate } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function TodoCreate() {
  const todoApiEndpoint = "/api/todo/v1";
  const [form, setForm] = useState({
    title: "",
    content: "",
    level: "",
    dueDate: new Date(),
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newTodo = { ...form };
    await fetch(`http://localhost:5000${todoApiEndpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setForm({ title: "", content: "", level: "", dueDate: new Date() });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create new Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title: </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Content: </label>
          <input
            type="textarea"
            className="form-control"
            id="content"
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="levelOptions"
              id="levelHigh"
              value="High"
              checked={form.level === "High"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelHigh" className="form-check-label">
              High
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="levelOptions"
              id="levelMid"
              value="Mid"
              checked={form.level === "Mid"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelMid" className="form-check-label">
              Mid
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="levelOptions"
              id="levelLow"
              value="Low"
              checked={form.level === "Low"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="levelLow" className="form-check-label">
              Low
            </label>
          </div>

          <div className="form-group">
            <DatePicker
              selected={form.dueDate}
              onChange={(date) => updateForm({ dueDate: date })}
            />
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create todo"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
