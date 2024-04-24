import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

const TodoTextInput = ({ onSave, text: initialText, placeholder, editing, newTodo }) => {
  const [text, setText] = useState(initialText || "");

  const handleSubmit = (e) => {
    const textValue = e.target.value.trim();
    if (e.which === 13) {
      onSave(textValue);
      if (newTodo) {
        setText("");
      }
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const handleBlur = (e) => {
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

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool,
};

export default TodoTextInput;
