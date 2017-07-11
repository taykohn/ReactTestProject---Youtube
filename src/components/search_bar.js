// User types input into this component, which will make an api request and change the video list
// ES6 syntax - import {Component} pulls off component from react library as a variable called component
import React, { Component } from 'react';

// Functional component would look like:
//    const SearchBar = () => {
//      return <input />;
//    };

// Class-based component:
// Use when you need added functionality
// Must have a defined render method that returns JSX
class SearchBar extends Component {
  constructor(props) {
    super(props);
    // Define or initialize state in a class-based component
    // When the input is changed, this.state.term will be the new value of input
    this.state = { term: ''};
  }

  // this.state.term is okay to reference, but not to assign
  // Changing the value property - when component rerenders, the value property is set to this.state.term
  // onChange updates this.state.term when component rerenders
  render() {
    return (
      <div className="search-bar">
        <input
          value={this.state.term}
          onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  }

  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}

// export gives any file the ability to can get SearchBar using an import statement
// When imported, can create a new instance of the component with: new SearchBar
export default SearchBar;
