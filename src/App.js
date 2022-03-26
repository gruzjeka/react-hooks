import React, { useState, useEffect, useReducer } from "react";
import TodoList from "./TodoList";
import { Context } from "./context";
import reducer from "./reducer";

export default function App() {
  let todos = JSON.parse(localStorage.getItem("todos"));
  const [state, dispatch] = useReducer(reducer, todos || []);

  const [todoTitle, setTodoTitle] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state));
  }, [state]);

  const addTodo = (e) => {
    if (e.key === "Enter") {
      dispatch({
        type: "add",
        payload: todoTitle,
      });
      setTodoTitle("");
    }
  };

  return (
    <Context.Provider
      value={{
        dispatch,
      }}
    >
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
        <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}
