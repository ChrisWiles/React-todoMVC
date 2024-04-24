import React from 'react';
import classnames from 'classnames';

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
};

interface FooterProps {
  completedCount: number;
  activeCount: number;
  filter: string;
  onClearCompleted: () => void;
  onShow: (filter: string) => void;
}

const Footer: React.FC<FooterProps> = ({ completedCount, activeCount, filter: selectedFilter, onClearCompleted, onShow }) => {
  const renderTodoCount = () => {
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  };

  const renderFilterLink = (filter: string) => {
    const title = FILTER_TITLES[filter];

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
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
    return ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED'].map((filter) => (
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
