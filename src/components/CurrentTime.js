import React from 'react';
import 'whatwg-fetch';

const timezones = ['PST', 'MST', 'MDT', 'EST', 'UTC']

export class TimeForm extends React.Component {
  constructor(props) {
    super(props);

    const {tz, msg} = this.props;
    this.state = {tz, msg};
  }

  _handleChange(evt) {
    typeof this.props.onFormChange === 'function' && 
      this.props.onFormChange(this.state);
  }

  _changeTimezone(evt) {
    const tz = evt.target.value;
    this.setState({tz}, this._handleChange);
  }

  _changeMsg(evt) {
    const msg = 
      encodeURIComponent(evt.target.value).replace(/%20/, '+');
    this.setState({msg}, this._handleChange);
  }

  _handleFormSubmit(evt) {
    evt.preventDefault();
    typeof this.props.onFormSubmit === 'function' &&
      this.props.onFormSubmit(this.state);
  }

  render() {
    const {tz} = this.state;

    return (
      <form onSubmit={this._handleFormSubmit.bind(this)}>
        <select
          onChange={this._changeTimezone.bind(this)}
          defaultValue={tz}>
          {timezones.map(t => {
            return (<option key={t} value={t}>{t}</option>)
          })}
        </select>
        <input
          type="text"
          placeholder="A chronic string message (such as 7 hours from now)"
          onChange={this._changeMsg.bind(this)}
        />
        <input
          type="submit"
          value="Update request"
        />
      </form>
    )
  }
}

class CurrentTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null, msg: 'now', tz: 'PST'
    }
  }

  // methods we'll fill in shortly
  fetchCurrentTime() {
    fetch(this.getApiUrl())
      .then(resp => resp.json())
      .then(resp => {
        const currentTime = resp.dateString;
        this.setState({currentTime})
      })
  }
  
  getApiUrl() {
    const {tz, msg} = this.state;
    const host = 'https://andthetimeis.com';
    return host + '/' + tz + '/' + msg + '.json';
  }

  handleFormSubmit(evt) {
    this.fetchCurrentTime();
  }

  handleChange(newState) {
    this.setState(newState);
  }

  render() {
    const {currentTime, tz} = this.state;
    const apiUrl = this.getApiUrl();

    return (
      <div className='main'>
        {!currentTime &&
          <button onClick={this.fetchCurrentTime.bind(this)}>
            Get the current time
          </button>}
        {currentTime && <div>The current time is: {currentTime}</div>}
        <TimeForm
          onFormSubmit={this.handleFormSubmit.bind(this)}
          onFormChange={this.handleChange.bind(this)}
          tz={tz}
          msg={'now'}
        />
        <p>We'll be making a request from: <code>{apiUrl}</code></p>
      </div>
    )
  }
}

export default CurrentTime;
