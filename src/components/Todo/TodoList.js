import React, { PropTypes } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, onTodoClick, remove }) => (
  <ul className="todoList">
    {todos.map(todo => 
      <TodoItem
        key={todo.id} 
        {...todo} 
        onClick={() => onTodoClick(todo.id)} 
        remove={() => remove(todo.id)}
      />
    )}
  </ul>
)

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    text: PropTypes.string.isRequired,
    deleted: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTodoClick: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
}

export default TodoList;
