import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'

export default class TodoTextInput extends Component {
  static propTypes = {
    onSave: PropTypes.func.isRequired,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    editing: PropTypes.bool,
    newTodo: PropTypes.bool
  }

  state = {
    text: this.props.text || '',
    newTodoPriority: '1'
  }

  handleSubmit = e => {
    const text = e.target.value.trim()
    const priority = this.state.newTodoPriority;
    if (e.which === 13) {
      this.props.onSave(text, priority)
      if (this.props.newTodo) {
        this.setState({text: '', priority: '1'})
      }
    }
  }

  handleSelect = e => this.setState({ newTodoPriority: e.target.value })

  handleChange = e => this.setState({text: e.target.value})

  handleBlur = e => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value, this.state.newTodoPriority)
    }
  }

  render() {
    return (
      <div>
        <input className={
          classnames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })}
          type="text"
          placeholder={this.props.placeholder}
          autoFocus="true"
          value={this.state.text}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit} />
        <select class="new-todo-priority" onChange={this.handleSelect}>
					<option value="1">1</option>
					<option value="2">2</option>
					<option value="3">3</option>
				</select>
      </div>
    )
  }
}
