import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from './../redux/actionCreators';

const Login = (props) => {
  if (props.loggedIn) {
    return (
      <div className="login main">
        <h1>Please Login</h1>
        <Form onSubmit={props.login}>
          Username: <input
            name={'username'}
            type='text'
            placeholder={'Insert username...'} /> 
        </Form>
      </div>
    );
  } else {
    return (
      <div className='logout main'>
        <h2>{props.user} is currently logged in.</h2>
        <button onClick={props.logout}>
          Click here to LOGOUT
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.user,
    loggedIn: state.loggedIn
  };
}

const mapDispatchToProps = dispatch => ({
  login: (user) => dispatch(login(user)),
  logout: () => dispatch(logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);
