//import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTodo, removeTodo, editTodo } from '../../actions';
import TodoList from './TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos.filter(t => !t.deleted)
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed && !t.deleted)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed && !t.deleted)
    case 'SHOW_DELETED':
      return todos.filter(t => t.deleted)
    default:
      throw new Error('Unknown filter: ' + filter)
  }
}

const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(toggleTodo(id))
    },
    remove: (id) => {
      dispatch(removeTodo(id))
    },
    editTodo: (id, text) => {
      dispatch(editTodo(id, text))
    }
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoList)

export default VisibleTodoList;
