import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import './Todo.css';

function Desc() {
  return (
    <div className='docs-header'>
      <h1>React, JS, CSS, HTML Todo List</h1>
      <p>This app was created with the help of the following blogs:</p>
      <ul>
        <li><a href="https://scotch.io/tutorials/create-a-simple-to-do-app-with-react">Create a Simple To-Do App With React</a></li>
        <li><a href="https://www.w3schools.com/howto/howto_js_todolist.asp">w3school's How TO - The To Do List</a></li>
      </ul>
    </div>
  )
}
// can either just say props or declare the props that will come in.
// function InputTodo(props) {
// const InputTodo = (props) => {
// const InputTodo = ({addTodo}) => {
function InputTodo({addTodo}) {
  let input;
  return (
    <div id="todoDiv">
      <input ref={node => { 
        input = node; 
      }} type="text" id="todoInput" placeholder="add something todo..." onKeyPress={(event) => {
        if (event.key == 'Enter') {
          addTodo(input.value);
          input.value = '';
        }
      }}/>
      <button onClick={() => {
        addTodo(input.value);
        input.value = '';
      }} className="addBtn">
        +
      </button>
    </div>
  );
}

// a different way of declaring a function - could have done this with above function
const TodoItem = ({todo, toggleComplete, remove}) => {
  //Each Todo
  var complete;
  if (todo.isComplete) {
    complete = "Completed"
  } else {
    complete = "Pending"
  };
  return (<li onClick={() => {toggleComplete()}}>{todo.text}<span className='close' onClick={() => {remove()}}>x</span></li>)
}

const TodoList = ({todoList, toggleComplete, remove}) => {
  // map through the todos
  const todos = todoList.map((todo) => {
      var index = todoList.indexOf(todo);
      return (
        <TodoItem todo={todo} key={index} index={index} toggleComplete={() => toggleComplete(index)} remove={() => remove(index)} />);
  })
  return (<ul className="todoList">{todos}</ul>);
}

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { text: 'default', isComplete: false, isVisible: true },
        { text: 'add some more todos', isComplete: false, isVisible: true }
      ]
    };
  }
  addTodo(todo, event) {
    const todoList = this.state.todoList.slice();
    todoList.push({
      text: todo,
      isComplete: false,
      isVisible: true
    })
    this.setState({
      todoList: todoList
    });
  }
  remove(i) {
    const todoList = this.state.todoList.slice();
    todoList[i].isVisible = false;
    const rm = document.getElementsByClassName("close");
    rm[i].parentElement.style.display = "none";
    this.setState({
      todoList: todoList
    });
  }
  toggleComplete(i) {
    const todoList = this.state.todoList.slice();
    todoList[i].isComplete = !todoList[i].isComplete;
    const ullist = document.getElementsByClassName('todoList')[0];
    ullist.getElementsByTagName('LI')[i].classList.toggle('checked');
    this.setState({
      todoList: todoList
    });
  }
  render() {
    if (this.props.deleted === true) {
      return (
        <TodoList todoList={this.state.todoList} deleted={true} />
      );
    }
    return (
      <div>
        <InputTodo addTodo={this.addTodo.bind(this)} />
        <TodoList todoList={this.state.todoList} toggleComplete={(i) => this.toggleComplete(i)} remove={(i) => this.remove(i)} />
      </div>
    );
  }
}

class Deleted extends Component {
  render() {
    return (
      <div>
        <Todo deleted={true} />
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Router>
        <div className='main'>
        <Desc />
        <Route exact path="/todo" component={Todo} />
        <Route path="/todo/deleted" component={Deleted} />
        </div>
      </Router>
    );
  }
}


export default App;
