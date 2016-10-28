import React, {PropTypes, Component} from 'react'
import classnames from 'classnames'

const FILTER_TITLES = {
  SHOW_ALL: 'All',
  SHOW_ACTIVE: 'Active',
  SHOW_COMPLETED: 'Completed'
}

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    filter: PropTypes.string.isRequired,
    onClearCompleted: PropTypes.func.isRequired,
    onShow: PropTypes.func.isRequired
  }

  renderTodoCount() {
    const {activeCount} = this.props

    const itemWord = activeCount === 1 ? 'item' : 'items'

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong>
        {itemWord} left
      </span>
    )
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter]
    const {filter: selectedFilter, onShow} = this.props

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{cursor: 'pointer' }}
        onClick={() => onShow(filter)}>
        {title}
      </a>
    )
  }

  renderClearButton() {
    const {completedCount, onClearCompleted} = this.props
    if (completedCount > 0) {
      return (
        <button className="clear-completed" onClick={onClearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  renderFilterList() {
    return ['SHOW_ALL', 'SHOW_ACTIVE', 'SHOW_COMPLETED']
      .map(filter =>
        <li key={filter}>
          {this.renderFilterLink(filter)}
        </li>
    )
  }

  render() {
    return (
      <footer className="footer">

        {this.renderTodoCount()}

        <ul className="filters">
          {this.renderFilterList()}
        </ul>

        {this.renderClearButton()}

      </footer>
    )
  }
}
