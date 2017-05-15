import React from 'react';
import { connect } from 'react-redux';
import { fetchNewTime } from '../actions';

const Home = (props) => {
  return (
    <div className="home">
      <h1>Welcome!</h1>
      <p>Hello World and welcome to my project playground! Feel free to browse around using the navigation bar above.</p>
      <p>Current time: {props.currentTime}</p>
      <button onClick={props.updateTime}>
        Update time
      </button>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    currentTime: state.currentTime.currentTime
  }
}

const mapDispatchToProps = dispatch => ({
  updateTime: (opts={}) => dispatch(fetchNewTime(opts))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Home);
