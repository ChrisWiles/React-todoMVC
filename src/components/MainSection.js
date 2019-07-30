import React, {Component, PropTypes} from 'react'
import TodoItem from './TodoItem'
import Footer from './Footer'

 const TODO_FILTERS = {
   SHOW_ALL: () => true,
   SHOW_ACTIVE: todo => !todo.completed,
   SHOW_COMPLETED: todo => todo.completed,
   SHOW_HIGH_PRIORITY: todo => todo.priority === 3,
   SHOW_MID_PRIORITY: todo => todo.priority === 2,
   SHOW_LOW_PRIORITY: todo => todo.priority === 1
 }

 export default class MainSection extends Component {
   static propTypes = {
     todos: PropTypes.array.isRequired,
     actions: PropTypes.object.isRequired
   }

   state = { filter: 'SHOW_ALL' }

   handleClearCompleted = () => {
     this.props.actions.clearCompleted()
   }

   handleShow = filter => {
     this.setState({ filter })
   }

   orderByPriority = (is_descending) => {
     const lambda = x => is_descending * -1 * x.priority
     this.state.todos.sort(lambda)
   }

   renderToggleAll(completedCount) {
     const { todos, actions } = this.props
     if (todos.length > 0) {
       return (
         <input
           className="toggle-all"
           type="checkbox"
           checked={completedCount === todos.length}
           onChange={actions.completeAll}
         />
       )
     }
   }

   renderFooter(completedCount) {
     const { todos } = this.props
     const { filter } = this.state
     const activeCount = todos.length - completedCount

     if (todos.length) {
       return (
         <Footer
           completedCount={completedCount}
           activeCount={activeCount}
           filter={filter}
           onClearCompleted={this.handleClearCompleted.bind(this)}
           onShow={this.handleShow.bind(this)} />
       )
     }
   }

   render() {
     const { todos, actions } = this.props
     const { filter } = this.state

     const filteredTodos = todos.filter(TODO_FILTERS[filter])
     const completedCount = todos.reduce((count, todo) => {
       return todo.completed ? count + 1 : count
     }, 0)

     return (
       <section className="main">
         {this.renderToggleAll(completedCount)}
         <ul className="todo-list">
           {filteredTodos.map(todo =>
            <div>
              <span style="red">Priority: {todo.priority}</span>
              <TodoItem key={todo.id} todo={todo} {...actions} />
            </div>
           )}
         </ul>
         {this.renderFooter(completedCount)}
         <button onClick={this.orderByPriority(true)}>Order by Descending</button>
         <button onClick={this.orderByPriority(false)}>Order by Ascending</button>
       </section>
     )
   }
 }
