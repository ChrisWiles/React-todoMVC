import React, { useState } from "react";
import PropTypes from "prop-types";
import TodoItem from "./TodoItem";
import Footer from "./Footer";

const TODO_FILTERS = {
  SHOW_ALL: () => true,
  SHOW_ACTIVE: (todo) => !todo.completed,
  SHOW_COMPLETED: (todo) => todo.completed,
};

const MainSection = ({ todos, actions }) => {
  const [filter, setFilter] = useState("SHOW_ALL");

  const handleClearCompleted = () => {
    actions.clearCompleted();
  };

  const handleShow = (newFilter) => {
    setFilter(newFilter);
  };

  const renderToggleAll = (completedCount) => {
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

  const renderFooter = (completedCount) => {
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

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

export default MainSection;
