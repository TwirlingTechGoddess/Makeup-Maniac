import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }
  }

  handleChange(event) {
    event.preventDefault()
    const value = event.target.value
    this.setState({
      value
    })
    this.props.filterProducts(this.state.value)
  }

  render() {

    return(
      <div>
        <form>
          <input type='search' 
                 placeholder='Search for brands or keywords' 
                 value={this.state.value} 
                 onChange={this.handleChange.bind(this)}/>
        </form>
      </div>
    )
  }



}

export default Search;