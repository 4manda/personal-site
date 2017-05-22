import React from 'react';
import { connect } from 'react-redux';
import { login, logout } from './../actions';

//class Input extends React.Component {
//
//  render() {
//    return (
//      <input />
//    )
//  }
//}
const Login = (props) => {
  let input1, input2

  if (!props.currentUser.loggedIn) {
    return (
      <div className="login main">
        <h1>Please Login</h1>
        <form onSubmit={e => {
          e.preventDefault()
          if (!input1.value.trim() || !input2.value.trim()) {
            return
          }
          {props.login(input1.value, input2.value)}
          input1.value=''
          input2.value=''
        }}>
          <p>Username: <input
            ref={node => {
              input1 = node
            }}
            name={'username'}
            type='text'
            placeholder='Insert username...' /> 
          </p>
          <p>Password: <input
            ref={node => {
              input2 = node
            }}
            name={'password'}
            type='password'
            placeholder='Insert password...' />
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className='logout main'>
        <h2>{props.currentUser.user} is currently logged in.</h2>
        <button onClick={props.logout}>
          Click here to LOGOUT
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser,
  };
}

const mapDispatchToProps = dispatch => ({
  login: (user, pwd) => dispatch(login(user, pwd)),
  logout: () => dispatch(logout())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Login);
