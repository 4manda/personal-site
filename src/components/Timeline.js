import React, { Component } from 'react';
import '../styles/Timeline.css';
import 'whatwg-fetch';
import Panel from './Panel';
const data = require('../data/timeline-data.json');

//class ActivityItem extends Component {
//  render() {
//    const {activity} = this.props;
//    
//    return (
//      <div className="item">
//        <div className="avatar">
//          <img
//            alt='avatar'
//            src={activity.user.avatar} />
//          {activity.user.name}
//        </div>
//
//        <span className="time">
//          {activity.timestamp}
//        </span>
//
//        <p>{activity.text}</p>
//        <div className="commentCount">
//          {activity.comments.length}
//        </div>
//      </div>
//    )
//  }
//}

//class Footer extends React.Component {
//  render() {
//    return (
//      <div className='footer'>
//        {this.props.children}
//      </div>
//    )
//  }
//}

class Timeline extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false, // <~ set loading to false
      searchFilter: '',
      activities: []
    }
//    this.state = {refreshing: false}
  }

//  refresh() {
//    this.setState({refreshing: true});
//  }

  // Update the data when the component mounts
  componentDidMount() {
    this.updateData();
  }
  
  componentWillReceiveProps(nextProps) {
    // Check to see if the requestRefresh prop has changed
    if (nextProps.requestRefresh !== this.props.requestRefresh) {
      this.setState({loading: true}, this.updateData);
    }
  }
  
  handleSearch(val) {
    this.setState({
      searchFilter: val,
      loading: true
    })
  }

  onComponentRefresh() {
    this.setState({loading: false});
  }

  // Call out to github and refresh directory
  updateData() {
    const {activities, searchFilter} = this.state;

    const filter = searchFilter !== '' && (e => e.actor.login.match(new RegExp(searchFilter)));

    const fetchDataOrCache = () => Promise.resolve(activities);

    // Use cached data if we have it
    return fetchDataOrCache()
      .then(json => json || data)
      .then(json => filter ? json.filter(filter) : json)
      .then(json => {
        if (activities.length === 0) {
          this.setState({activities: json})
        }
      })
      //.then(json => json.slice(0, 4))
  }

  render() {
    const {loading} = this.state;

    return (
        <div className='notificationsFrame'>
          <Panel
            requestRefresh={loading}
            onComponentRefresh={this.onComponentRefresh.bind(this)}
            fetchData={this.updateData.bind(this)} />
        </div>
    )
  }
}
//          <Header
//            onSubmit={this.handleSearch.bind(this)}
//            title="Github activity" />
//          <Footer>
//            <button onClick={this.refresh.bind(this)}>
//              <i className="fa fa-refresh" />
//              Refresh
//            </button>
//          </Footer>

export default Timeline;
