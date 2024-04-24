import React from "react";
import classnames from "classnames";

type FilterType = 'SHOW_ALL' | 'SHOW_ACTIVE' | 'SHOW_COMPLETED';

const FILTER_TITLES: Record<FilterType, string> = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed",
};

interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: FilterType;
  onClearCompleted: () => void;
  onShow: (filter: FilterType) => void;
}

const Footer = ({ completedCount, activeCount, filter: selectedFilter, onClearCompleted, onShow }: FooterProps) => {
  const renderTodoCount = () => {
    const itemWord = activeCount === 1 ? "item" : "items";
    return (
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
    );
  };

  const renderFilterLink = (filter: FilterType) => {
    const title = FILTER_TITLES[filter];
    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: "pointer" }}
        onClick={() => onShow(filter)}
      >
        {title}
      </a>
    );
  };

  const renderClearButton = () => {
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      );
    }
  };

  const renderFilterList = () => {
    return (["SHOW_ALL", "SHOW_ACTIVE", "SHOW_COMPLETED"] as FilterType[]).map((filter) => (
      <li key={filter}>{renderFilterLink(filter)}</li>
    ));
  };

  return (
    <footer className="footer">
      {renderTodoCount()}
      <ul className="filters">{renderFilterList()}</ul>
      {renderClearButton()}
    </footer>
  );
};

export default Footer;
