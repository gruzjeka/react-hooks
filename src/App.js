import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");
  const handleClick = () => {
    console.log('click');
  };
  
  useEffect(() => {
    const raw = localStorage.getItem("todos") || [];
    setTodos(JSON.parse(raw));
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClick);
    localStorage.setItem("todos", JSON.stringify(todos));
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [todos]);

  const addTodo = (e) => {
    if (e.key === "Enter") {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: todoTitle,
          completed: false,
        },
      ]);
      setTodoTitle("");
    }
  };

  return (
    <div className="container">
      <h1>Todo App</h1>
      <div className="input-field">
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          onKeyPress={addTodo}
        />
        <label>Todo name</label>
      </div>
      <TodoList todos={todos} />
    </div>
  );
}
