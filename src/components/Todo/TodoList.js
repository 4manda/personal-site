import React, { PropTypes } from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
  //expected props = todos, onTodoClick, remove
  //handleDelete = (event) => {
  //  const id = Number(event.target.)
  //}
  handleEdit = (event, id, text) => {
    let newVal = window.prompt('', text);
    this.props.editTodo(id, newVal);
  }
  render() {
    return (
      <ul className="todoList">
        {this.props.todos.map(todo => 
          <TodoItem
            key={todo.id} 
            {...todo} 
            onClick={() => this.props.onTodoClick(todo.id)} 
            remove={() => this.props.remove(todo.id)}
            edit={(e) => this.handleEdit(e, todo.id, todo.text)}
          />
        )}
      </ul>
    )
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired
}

export default TodoList;
