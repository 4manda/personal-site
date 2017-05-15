import React, { PropTypes } from 'react';

const TodoItem = ({onClick, completed, text, remove, deleted}) => (
  <li 
    onClick={onClick}
    className={ completed ? 'checked' : '' }
    style={{ display: deleted ? 'none' : 'block' }} 
  >
    {text}
    <span className='close' onClick={remove}>x</span>
  </li>
)

TodoItem.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired,
  deleted: PropTypes.bool.isRequired
}

export default TodoItem;
