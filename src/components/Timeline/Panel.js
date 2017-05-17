import React, { Component } from 'react';
import Header from './Header';
import ActivityItem from './ActivityItem';

const data = require('../../data/timeline-data.json');

class Panel extends Component {
//  static propTypes = {
//    requestRefresh: React.PropTypes.bool,
//    onComponentRefresh: React.PropTypes.func,
//    fetchData: React.PropTypes.func
//  }

  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      activities: data,
      filtered: data,
    }
  }

  componentDidMount() {
    this.updateData();
  }
  
//  componentWillMount() {
//      this.setState({activities: data});
//  }

  componentWillReceiveProps(nextProps) {
    //Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }

  handleSearch = txt => {
    if (txt === '') {
      this.setState({
        filtered: this.state.activities
      })
    } else {
      const { activities } = this.state;
      const filtered = activities.filter(a => a.actor && a.actor.login.match(txt));
      this.setState({
        filtered
      })
    }
  }

  // Call out to github and refresh directory
  updateData() {
    this.setState({
      loading: false,
      activities: data
    }, this.props.onComponentRefresh);
  }

  render() {
    const {loading, filtered} = this.state; //ES6 destructuring

    return (
      <div>
        <Header
          onSubmit={this.handleSearch}
          title="Activity Timeline" />
        <div className="content">
          <div className="line"></div>
          {/* show loading message if loading */}
          {loading && <div>Loading</div>}
          {/* Timeline item */}
          {filtered.map((activity) => (
            <ActivityItem
              key={activity.id}
              activity={activity} />
          ))}

        </div>
      </div>
    )
  }
}

export default Panel;
