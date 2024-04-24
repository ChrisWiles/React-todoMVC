import React, { useState } from "react";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

type Todo = {
  text: string;
  completed: boolean;
  id: number;
};

type TodoFilter = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

const TODO_FILTERS: Record<TodoFilter, (todo: Todo) => boolean> = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

interface MainSectionProps {
  todos: Todo[];
  actions: {
    addTodo: (text: string) => void;
    deleteTodo: (id: number) => void;
    editTodo: (id: number, text: string) => void;
    completeTodo: (id: number) => void;
    completeAll: () => void;
    clearCompleted: () => void;
  };
}

const MainSection = ({ todos, actions }: MainSectionProps) => {
  const [filter, setFilter] = useState<TodoFilter>("SHOW_ALL");

  const handleClearCompleted = () => {
    actions.clearCompleted();
  };

  const handleShow = (newFilter: TodoFilter) => {
    setFilter(newFilter);
  };

  const renderToggleAll = (completedCount: number) => {
    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={actions.completeAll}
        />
      );
    }
  };

  const renderFooter = (completedCount: number) => {
    const activeCount = todos.length - completedCount;

    if (todos.length) {
      return (
        <Footer
          completedCount={completedCount}
          activeCount={activeCount}
          filter={filter}
          onClearCompleted={handleClearCompleted}
          onShow={handleShow}
        />
      );
    }
  };

  const filteredTodos = todos.filter(TODO_FILTERS[filter]);
  const completedCount = todos.reduce((count, todo) => {
    return todo.completed ? count + 1 : count;
  }, 0);

  return (
    <section className="main">
      {renderToggleAll(completedCount)}
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} {...actions} />
        ))}
      </ul>
      {renderFooter(completedCount)}
    </section>
  );
};

export default MainSection;
