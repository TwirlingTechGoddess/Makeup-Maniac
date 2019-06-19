import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  handleChange() {
    
  }

  render() {

    return(
      <div>
        <form onChange={this.handleChange}>
          <input type='search' placeholder='Search for brands or keywords' />
        </form>
      </div>
    )
  }



}

export default Search;