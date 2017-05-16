import React, { Component } from 'react';
import '../styles/Timeline.css';
import moment from 'moment';
import 'whatwg-fetch';
const data = require('../data/timeline-data.json');

class SearchForm extends React.Component {
  // Holds on to the value of the search input (tracks it as it changes)
  
  static propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    searchVisible: React.PropTypes.bool
  }
  
  static defaultProps = {
    onSubmit: () => {},
    searchVisible: false
  }

  constructor(props) {
    super(props);

    this.state = {
      searchText: ''
    }
  }

  // when user types in search box, this captures the value of the search field
  updateSearchInput(e) {
    const val = e.target.value;
    this.setState({
      searchText: val
    });
  }

  // 
  submitForm(e) {
    // immediately call preventDefault to stop browser from bubbling the event up
    // which cause the defualt behavior of the entire page to reload
    e.preventDefault();

    const {searchText} = this.state;
    // call the callback with the search value
    this.props.onSubmit(searchText);
  }

  render() {
    const { searchVisible } = this.props;
    let searchClasses = ['searchInput'];
    if (searchVisible) {
      searchClasses.push('active')
    }

    return (
      <form onSubmit={this.submitForm.bind(this)}>
        <input
          type="search"
          className={searchClasses.join(' ')}
          onChange={this.updateSearchInput.bind(this)}
          placeholder="Search..." />
      </form>
    );
  }
}

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchVisible: false
    }
  }
  
  // toggle visibilty when run on the state
  showSearch() {
    this.setState({
      searchVisible: !this.state.searchVisible
    })
  }

  render() {
    // Classes to add to the <input /> element
    let searchInputClasses = ["searchInput"];

    // Update the class array if hte state is visible
    if (this.state.searchVisible) {
      searchInputClasses.push("active");
    }

    return (
      <div className="header">
        <div className="menuIcon">
          <div className="dashTop"></div>
          <div className="dashBottom"></div>
          <div className="circle"></div>
        </div>

        <span className="title">
          {this.props.title}
        </span>

        <SearchForm 
          searchVisible={this.state.searchVisible}
          onSubmit={this.props.onSubmit} />

        {/* Adding an onclick handler to call the showSearch button */}
        <div
          onClick={this.showSearch.bind(this)}
          className="fa fa-search searchIcon">
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  onSubmit: React.PropTypes.func,
  title: React.PropTypes.string
}

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

class ActivityItem extends Component {
  render() {
    const { activity } = this.props;

    return (
      <div className='item'>
        <div className={'avatar'}>
          <img
            alt='avatar'
            src={activity.user.avatar_url} />
        </div>

        <span>
          {moment(activity.created_at).fromNow()}
        </span>

        <p>{activity.user.display_login}</p>
        <div className={'right'}>
          {activity.payload.event}
        </div>
      </div>
    )
  }
}

ActivityItem.propTypes = {
  id: React.PropTypes.string,
  user: React.PropTypes.shape({
    id: React.PropTypes.number,
    login: React.PropTypes.string,
    display_login: React.PropTypes.string,
    url: React.PropTypes.string,
    avatar_url: React.PropTypes.string
  }),
  payload: React.PropTypes.shape({
    event: React.PropTypes.func
  }),
  public: React.PropTypes.bool,
  created_at: React.PropTypes.string
}

//class Footer extends React.Component {
//  render() {
//    return (
//      <div className='footer'>
//        {this.props.children}
//      </div>
//    )
//  }
//}

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
      .then(json => json.slice(0, 4))
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
