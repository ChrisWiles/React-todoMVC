import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import classnames from "classnames";

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
}

const TodoTextInput = ({ onSave, text: initialText, placeholder, editing, newTodo }: TodoTextInputProps) => {
  const [text, setText] = useState(initialText || "");

  const handleSubmit = (e: KeyboardEvent<HTMLInputElement>) => {
    const textValue = e.currentTarget.value.trim();
    if (e.key === 'Enter') {
      onSave(textValue);
      if (newTodo) {
        setText("");
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  return (
    <input
      className={classnames({
        edit: editing,
        "new-todo": newTodo,
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
