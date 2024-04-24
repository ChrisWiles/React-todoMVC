import React, { useState } from 'react'
import classnames from 'classnames'

interface TodoTextInputProps {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
}

const TodoTextInput: React.FC<TodoTextInputProps> = (props) => {
  const [text, setText] = useState(props.text || '');

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const input = e.target as HTMLInputElement;
    const text = input.value.trim();
    if (e.which === 13) {
      props.onSave(text);
      if (props.newTodo) {
        setText('');
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (!props.newTodo) {
      props.onSave(e.target.value);
    }
  }

  return (
    <input className={
      classnames({
        edit: props.editing,
        'new-todo': props.newTodo
      })}
      type="text"
      placeholder={props.placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit} />
  )
}

export default TodoTextInput;
