import React from 'react';

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

export default SearchForm;
