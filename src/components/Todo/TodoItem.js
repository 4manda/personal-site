import React, { PropTypes } from 'react';

const TodoItem = ({onClick, completed, text, remove, deleted, edit}) => (
  <li className={ completed ? 'checked' : '' }>
    <span className='todo-item' onClick={onClick}>{text}</span>
    <span className={ deleted ? 'add' : 'close' } onClick={remove}></span>
    <span className='edit' onClick={edit}>EDIT</span>
  </li>
)

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  deleted: PropTypes.bool.isRequired,
  edit: PropTypes.func.isRequired
}

//    style={{ display: deleted ? 'none' : 'block' }} 
export default TodoItem;
