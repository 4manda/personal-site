import React, { Component } from 'react';
import moment from 'moment';

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

export default ActivityItem;
