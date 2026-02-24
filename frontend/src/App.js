import React, { useState, useEffect } from "react";
import axios from "axios";

// ------------------- Карточка задачи -------------------
const Task = ({ task, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = () => {
    onUpdate(task.id, { title, description });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить эту задачу?")) {
      onDelete(task.id);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.12)";
      }}
    >
      {isEditing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            style={{
              padding: "10px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontWeight: "600",
              fontSize: "16px",
            }}
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            style={{
              padding: "10px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              fontSize: "14px",
              minHeight: "60px",
            }}
          />
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              onClick={handleUpdate}
              style={{
                backgroundColor: "#4CAF50",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background 0.2s",
              }}
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              style={{
                backgroundColor: "#f0f0f0",
                color: "#333",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 style={{ margin: 0, fontSize: "18px", fontWeight: "700", color: "#222" }}>
            {task.title}
          </h3>
          <p style={{ margin: "4px 0", fontSize: "14px", color: "#555" }}>
            {task.description}
          </p>
          <div style={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#2196F3",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              style={{
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                padding: "8px 16px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// ------------------- Главный компонент -------------------
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  // Получаем задачи с retry
  const fetchTasks = async (retry = 5, delay = 500) => {
    for (let attempt = 1; attempt <= retry; attempt++) {
      try {
        const res = await axios.get(`${API_URL}/tasks`);
        setTasks(res.data);
        return;
      } catch (error) {
        if (attempt < retry) {
          console.log(`Попытка ${attempt} неудачная`);
          await new Promise((res) => setTimeout(res, delay));
        } else {
          console.log("Не удалось подгрузить данные");
        }
      }
    }
  };

  // Добавление задачи
  const addTask = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${API_URL}/tasks`, { title, description, type: '11', priority: 5, deadline: 'dasd' });
    setTasks([...tasks, res.data]);
    setTitle("");
    setDescription("");
  };

  // Обновление задачи
  const updateTask = async (id, updatedTask) => {
    const res = await axios.put(`${API_URL}/tasks/${id}`, updatedTask);
    setTasks(tasks.map((t) => (t.id === id ? res.data : t)));
  };

  // Удаление задачи
  const deleteTask = async (id) => {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить эту задачу?");
    if (!isConfirmed) return;
    await axios.delete(`${API_URL}/tasks/${id}`);
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // Удаление всех задач
  const deleteAllTasks = async () => {
    const isConfirmed = window.confirm("Вы уверены, что хотите удалить все задачи? Это действие нельзя отменить.");
    if (!isConfirmed) return;
    await axios.delete(`${API_URL}/tasks`);
    setTasks([]);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px", color: "#333" }}>Task Manager</h1>

      {/* Форма добавления */}
      <form onSubmit={addTask} style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
          style={{
            padding: "12px",
            borderRadius: "12px",
            border: "1px solid #ccc",
            fontSize: "14px",
            minHeight: "60px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            padding: "12px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "background 0.2s",
          }}
        >
          Add Task
        </button>
      </form>

      {/* Удалить все задачи */}
      <button
        onClick={deleteAllTasks}
        style={{
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          padding: "12px",
          borderRadius: "12px",
          cursor: "pointer",
          marginBottom: "20px",
          fontWeight: "bold",
          width: "100%",
          fontSize: "16px",
        }}
      >
        Delete All Tasks
      </button>

      {/* Сетка карточек */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
        {tasks.map((task) => (
          <Task key={task.id} task={task} onDelete={deleteTask} onUpdate={updateTask} />
        ))}
      </div>
    </div>
  );
}

export default App;