import React, { useState } from "react";
import Header from "./Header";
import MainSection from "./MainSection";

type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([
    {
      text: "React ES6 TodoMVC",
      completed: false,
      id: 0,
    },
  ]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
      completed: false,
      text: text,
    };
    setTodos([newTodo, ...todos]);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
  };

  const completeTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const completeAll = () => {
    const areAllMarked = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !areAllMarked })));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const actions = {
    addTodo,
    deleteTodo,
    editTodo,
    completeTodo,
    completeAll,
    clearCompleted,
  };

  return (
    <div>
      <Header addTodo={actions.addTodo} />
      <MainSection todos={todos} actions={actions} />
    </div>
  );
};

export default App;
