import React from 'react';
import AddTodo from './AddTodo';
import VisibleTodoList from './VisibleTodoList';
import Footer from './Footer';

const TodoApp = () => (
  <div className="main">
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default TodoApp;
