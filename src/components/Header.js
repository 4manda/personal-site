import React, { Component } from 'react';
import SearchForm from './SearchForm';

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

export default Header;
