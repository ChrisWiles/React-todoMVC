import React from "react";
import TodoTextInput from "./TodoTextInput";

interface HeaderProps {
  addTodo: (text: string) => void;
}

const Header = ({ addTodo }: HeaderProps) => {
  const handleSave = (text: string) => {
    if (text.length !== 0) {
      addTodo(text);
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={handleSave}
        placeholder="What needs to be done?"
      />
    </header>
  );
};

export default Header;
