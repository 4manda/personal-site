import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// We'll load our views from the 'src/components' directory
import NavBar from './components/NavBar/NavBar';
import Timeline from './components/Timeline';
import TicTac from './components/TicTac';
import CurrentTime from './components/CurrentTime';
import TodoApp from './components/Todo/TodoApp';
//import TodoJS from './components/TodoJS'
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
//import Footer from './components/Footer';


const App = props => {
  return (
    <Router>
      <div>
        <NavBar />
        <div className="main">
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/timeline" component={Timeline} />
          <Route path="/todo" component={TodoApp} />
          <Route path="/time" component={CurrentTime} />
          <Route path="/tictac" component={TicTac} />
        </div>
        {/* TODO: Add Footer */}
      </div>
    </Router>
  )
}
//        <Route path="/login" component={Login} />
//        <Footer />

export default App;
